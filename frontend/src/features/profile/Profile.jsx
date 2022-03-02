/* eslint-disable no-console */
import { useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Divider, List, Snackbar, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import AuthContext from "../../services/auth/AuthContext";
import { t } from "../i18n";
import { LoadingScreen } from "../../shared/components";
import PreferencesContext from "../../services/preferences/PreferencesContext";
import LOGOUT from "./Profile.gql";
import styles from "./Profile.style";
import AnalyticsContext from "../../services/analytics/AnalyticsContext";
import { PermissionName } from "../../shared/permission";

function Profile() {
  const navigation = useNavigation();
  const route = useRoute();

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const { preferDarkTheme, toggleTheme } = useContext(PreferencesContext);
  const { user, logOutUser, refreshToken } = useContext(AuthContext);
  const { logClickEvent } = useContext(AnalyticsContext);

  const initials = useMemo(() => {
    return user.username
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [user.username]);

  const permissionLabel = useMemo(() => {
    return `${user.permission}:${PermissionName[user.permission]}`;
  }, [user.permission]);

  const [logOut, { loading, client }] = useMutation(LOGOUT, {
    onError: (error) => {
      console.debug("Error login out:", error.message);
    },
  });

  if (loading) {
    return <LoadingScreen message={t("Logging out…")} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={96} label={initials} />
        </View>
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
                title={permissionLabel}
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
                <Switch value={preferDarkTheme} onValueChange={toggleTheme} />
              )}
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
