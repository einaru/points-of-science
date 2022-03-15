import { useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Avatar, Divider, List, Snackbar, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticsContext from "~services/analytics/AnalyticsContext";
import AuthContext from "~services/auth/AuthContext";
import PreferencesContext from "~services/preferences/PreferencesContext";
import Sentry from "~services/sentry";
import { getColorsFromString } from "~shared/colors";
import { LoadingScreen } from "~shared/components";
import { t } from "~shared/i18n";

import LOGOUT from "./Profile.gql";
import styles from "./Profile.style";

const WINDOW_WIDTH = Dimensions.get("window").width;

function Profile() {
  const navigation = useNavigation();
  const route = useRoute();

  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);
  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const { preferDarkTheme, toggleTheme } = React.useContext(PreferencesContext);
  const { user, logOutUser, refreshToken } = React.useContext(AuthContext);
  const { logClickEvent } = React.useContext(AnalyticsContext);

  const initials = React.useMemo(() => {
    return user.username
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [user.username]);

  const [logOut, { loading, client }] = useMutation(LOGOUT, {
    onError: (error) => {
      Sentry.captureException(error);
    },
  });

  const renderAvatar = () => {
    const { bgColor, fgColor } = getColorsFromString(user.id, 0.9);
    return (
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={WINDOW_WIDTH / 3}
          label={initials}
          color={fgColor.string()}
          style={[styles.avatar, { backgroundColor: bgColor.string() }]}
        />
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen message={t("Logging out…")} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderAvatar()}
        <View style={styles.container}>
          <List.Section>
            <List.Item
              title={user.username}
              description={t("Username")}
              left={() => <List.Icon icon="account" />}
              right={() => <List.Icon icon="content-copy" />}
              onPress={() => {
                Clipboard.setString(user.username);
                showSnackbar(true);
              }}
            />
            {__DEV__ && (
              <List.Item
                title={user.permission}
                description={t("Permission level")}
                left={() => <List.Icon icon="security" />}
              />
            )}
          </List.Section>
          <Divider />
          <List.Section>
            <List.Item
              title={t("Prefer dark theme")}
              left={() => <List.Icon icon="theme-light-dark" />}
              right={() => (
                <Switch
                  style={{ alignSelf: "center" }}
                  value={preferDarkTheme}
                  onValueChange={toggleTheme}
                />
              )}
              onPress={toggleTheme}
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Item
              title={t("Change password")}
              left={() => <List.Icon icon="key" />}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => navigation.navigate("profile:change-password")}
            />
            <List.Item
              title={t("Project info")}
              left={() => <List.Icon icon="information" />}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => navigation.navigate("profile:project-info")}
            />
            <List.Item
              title={t("Attributions")}
              left={() => <List.Icon icon="copyright" />}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => navigation.navigate("profile:attributions")}
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Item
              title={t("Log out")}
              left={() => <List.Icon icon="logout" />}
              onPress={() => {
                logClickEvent(route, "User logging out");
                logOut({ variables: { refreshToken } }).finally(() => {
                  client.clearStore();
                  logOutUser();
                });
              }}
            />
          </List.Section>
        </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnackbar}
        duration={5000}
        onDismiss={hideSnackbar}
      >
        {t("Username copied to clipboard")}
      </Snackbar>
    </SafeAreaView>
  );
}

export default Profile;
