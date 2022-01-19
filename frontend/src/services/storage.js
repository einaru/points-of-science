import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key) {
  return AsyncStorage.getItem(key);
}

export async function setItem(key, value) {
  await AsyncStorage.setItem(key, value);
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}
