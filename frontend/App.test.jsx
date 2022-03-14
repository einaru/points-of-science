import "sentry-testkit/dist/jestMock";

import React from "react";
import renderer from "react-test-renderer";
import * as Sentry from "sentry-expo";
import sentryTestkit from "sentry-testkit";

import App from "./App";

const { sentryTransport } = sentryTestkit();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  transport: sentryTransport,
  enableInExpoDevelopment: true,
});

jest.useFakeTimers();

describe("<App />", () => {
  it("has 2 children", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
