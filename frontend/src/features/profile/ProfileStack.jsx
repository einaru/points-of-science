import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import ProfileScreen from "./ProfileScreen";
import ChangePassword from "./ChangePassword";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </View>
  );
}

export default ProfileStack;
