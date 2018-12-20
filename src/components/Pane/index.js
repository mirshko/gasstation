import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const Pane = ({ children, flex, alignItems, justifyContent, style }) => (
  <View
    style={{
      ...style,
      flex: flex,
      alignItems: alignItems,
      justifyContent: justifyContent
    }}
  >
    {children}
  </View>
);

Pane.defaultProps = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
};

Pane.propTypes = {
  style: PropTypes.object,
  flex: PropTypes.number,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string
};

export default Pane;