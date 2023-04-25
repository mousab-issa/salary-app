import { useTheme } from "@react-navigation/native";
import { colors } from "@theme/colors";
import * as React from "react";
import { View as DefaultView, ViewProps } from "react-native";

export const ThemeView = (props: ViewProps) => {
  const theme = useTheme();
  const { style, children, ...otherProps } = props;
  const backgroundColor = theme.dark ? "transparent" : "transparent";

  return (
    <DefaultView style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </DefaultView>
  );
};
