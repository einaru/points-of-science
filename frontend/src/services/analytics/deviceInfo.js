import * as Device from "expo-device";

function getDeviceInfo() {
  const props = [
    "isDevice",
    "brand",
    "manufacturer",
    "modelName",
    "osName",
    "osVersion",
    "osBuildId",
  ];
  return props.reduce((obj, value) => {
    return {
      ...obj,
      [value]: Device[value],
    };
  }, {});
}

const deviceInfo = getDeviceInfo();

export default deviceInfo;
