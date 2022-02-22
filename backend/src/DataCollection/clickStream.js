export default class ClickStream {
  constructor(userID, sessionToken) {
    this.id = null;
    this.userID = userID;
    this.sessionToken = sessionToken;
    this.deviceInfo = {};
    this.clicks = [];
  }

  static fromData(data) {
    const cls = new ClickStream();
    cls.id = data.id || null;
    cls.userID = data.userID || null;
    cls.sessionToken = data.sessionToken || null;
    cls.deviceInfo = data.deviceInfo || {};
    if (data.clicks) {
      data.clicks.forEach((event) => {
        cls.addClickEvent(event);
      });
    }
    return cls;
  }

  addDeviceInfo(deviceInfo) {
    this.deviceInfo = deviceInfo;
  }

  addClickEvent(event) {
    this.clicks.push(event);
  }
}
