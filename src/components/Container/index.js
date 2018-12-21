import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

export const Container = ({ children }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

export default Container;