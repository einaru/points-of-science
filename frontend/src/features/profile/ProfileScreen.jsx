/* eslint-disable no-console */
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../services/auth/AuthProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
});

function ProfileScreen() {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);

  const initials = useMemo(() => {
    return user.username
      .split(" ")
      .map((word) => word[0])
      .join("");
  }, [user.username]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: "12px" }}>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={96} label={initials} />
          <Text style={styles.title}>{user.username}</Text>
        </View>
        <List.Section>
          <List.Item
            title="Dashboard"
            left={() => <List.Icon icon="view-dashboard" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {
              console.debug("Pressed: Dashboard");
              navigation.navigate("Dashboard");
            }}
          />
          <List.Item
            title="Achievements"
            left={() => <List.Icon icon="medal" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {
              console.debug("Pressed: Dashboard");
              navigation.navigate("Achievements");
            }}
          />
        </List.Section>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
