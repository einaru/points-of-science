/* eslint-disable no-console */
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Divider, List, Snackbar, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import AuthContext from "../auth/AuthContext";
import { t } from "../i18n";
import { LoadingScreen } from "../../shared/components";
import PreferencesContext from "../preferences/PreferencesContext";
import LOGOUT from "./Profile.gql";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    margin: 16,
  },
});

function Profile() {
  const navigation = useNavigation();

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  const { preferDarkTheme, toggleTheme } = useContext(PreferencesContext);
  const { user, logOutUser, refreshToken } = useContext(AuthContext);

  const initials = useMemo(() => {
    return user.username
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [user.username]);

  const [logOut, { data, loading, client }] = useMutation(LOGOUT, {
    onError: (error) => {
      console.error("Error login out:", error.message);
    },
  });

  useEffect(() => {
    if (data?.signOut) {
      logOutUser();
    }
  }, [data, logOutUser]);

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
                console.debug("Logging out");
                logOut({ variables: { refreshToken } }).then(() => {
                  client.clearStore();
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
