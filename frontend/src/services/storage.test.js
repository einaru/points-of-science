import { NativeModulesProxy } from "expo-modules-core";
import * as Storage from "./storage";

describe("Native storage", () => {
  it("stores a value", async () => {
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

  it("retrieves a value", async () => {
    NativeModulesProxy.ExpoSecureStore.getValueWithKeyAsync.mockImplementation(
      () => "value"
    );
    const key = "key";
    const value = "value";
    const options = {};
    await Storage.setItem(key, value);
    const result = await Storage.getItem(key);
    expect(
      NativeModulesProxy.ExpoSecureStore.getValueWithKeyAsync
    ).toHaveBeenCalledWith(key, options);
    expect(result).toBe(value);
  });

  it("removes a value", async () => {
    const key = "key";
    const options = {};
    await Storage.removeItem(key);
    expect(
      NativeModulesProxy.ExpoSecureStore.deleteValueWithKeyAsync
    ).toHaveBeenCalledWith(key, options);
  });
});
