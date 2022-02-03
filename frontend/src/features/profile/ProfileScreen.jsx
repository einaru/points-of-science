/* eslint-disable no-console */
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../auth/AuthProvider";
import { t } from "../i18n";
import { LoadingScreen } from "../../shared/components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const LOGOUT = gql`
  mutation signOut($refreshToken: String!) {
    signOut(refreshToken: $refreshToken) {
      type
      status
      message
    }
  }
`;

function ProfileScreen() {
  const navigation = useNavigation();

  const { user, logOutUser, refreshToken } = useContext(AuthContext);

  const initials = useMemo(() => {
    return user.username
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [user.username]);

  const [logOut, { data, loading, error }] = useMutation(LOGOUT);

  useEffect(() => {
    if (data) {
      console.debug(data.signOut.message);
      if (data.signOut.type === "success") {
        logOutUser();
      }
    }
  }, [data, logOutUser]);

  if (loading) {
    return <LoadingScreen message={t("Logging out…")} />;
  }

  if (error) {
    // TODO provide feedback to user on errors
    console.error(error);
  }

  return (
    <View>
      <View style={styles.avatarContainer}>
        <Avatar.Text size={96} label={initials} />
        <Text style={styles.title}>{user.username}</Text>
      </View>
      <List.Section>
        <List.Item
          title={t("Change password")}
          left={() => <List.Icon icon="key" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("ChangePassword")}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Item
          title={t("Dashboard")}
          left={() => <List.Icon icon="view-dashboard" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            console.debug("Pressed: Dashboard");
            navigation.navigate("Dashboard");
          }}
        />
        <List.Item
          title={t("Achievements")}
          left={() => <List.Icon icon="medal" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            console.debug("Pressed: Dashboard");
            navigation.navigate("Achievements");
          }}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Item
          title={t("Project info")}
          left={() => <List.Icon icon="information" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("ProjectInfo")}
        />
        <List.Item
          title={t("Log out")}
          left={() => <List.Icon icon="logout" />}
          onPress={() => {
            console.debug("Logging out");
            logOut({ variables: { refreshToken } });
          }}
        />
      </List.Section>
    </View>
  );
}

export default ProfileScreen;
