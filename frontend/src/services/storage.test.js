// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Storage from "./storage";
//
// beforeEach(() => {
//  AsyncStorage.clear();
// });
//
// describe("Storage", () => {
//  it("sets values", async () => {
//    const key = "key";
//    const value = "value";
//    await Storage.setItem(key, value);
//    expect(AsyncStorage.setItem).toBeCalledWith(key, value);
//    const result = await Storage.getItem(key);
//    expect(AsyncStorage.getItem).toBeCalledWith(key);
//    expect(result).toEqual(value);
//  });
// });

import { NativeModulesProxy } from "expo-modules-core";
import * as Storage from "./storage";

describe("Storage", () => {
  it("sets values", async () => {
    const key = "key";
    const value = "value";
    const options = {};
    await Storage.setItem(key, value);
    expect(
      NativeModulesProxy.ExpoSecureStore.setValueWithKeyAsync
    ).toHaveBeenCalledTimes(1);
    expect(
      NativeModulesProxy.ExpoSecureStore.setValueWithKeyAsync
    ).toHaveBeenCalledWith(value, key, options);
  });
});
