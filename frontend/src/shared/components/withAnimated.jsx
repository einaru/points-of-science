/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */

import React from "react";
import { Animated } from "react-native";

/**
 * Workaround solution for app crashing when toggling dark theme.
 *
 * The crash happens when `NavigationBar.setBackgroundColorAsync() is called,
 * and for example the Card component from react-native-paper is used.
 *
 * ## Usage
 * ```js
 * const AnimatedComponent = withAnimated(SomeComponent);
 * ```
 *
 * Ref: https://stackoverflow.com/a/60595982
 */
function withAnimated(Component) {
  const displayName = Component.displayName || Component.name || "Component";

  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`;

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...this.props} />;
    }
  }
  return Animated.createAnimatedComponent(WithAnimated);
}

export default withAnimated;
