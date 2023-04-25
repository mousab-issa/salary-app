import { Button, Screen, Text } from "../../components";
import { colors, spacing } from "../../theme";
import React, { ErrorInfo } from "react";
import { ScrollView, TextStyle, View, ViewStyle } from "react-native";

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Text
          style={$heading}
          preset="subheading"
          tx="errorScreen.title"
          weight={"bold"}
          size={"xxl"}
        />
        <Text
          tx="errorScreen.friendlySubtitle"
          preset={"bold"}
          weight={"bold"}
          size={"xxl"}
        />
      </View>

      <ScrollView
        style={$errorSection}
        contentContainerStyle={$errorSectionContentContainer}
      >
        <Text
          style={$errorContent}
          weight="bold"
          text={`${props.error}`.trim()}
          preset={"bold"}
          size={"xxl"}
        />
        <Text
          selectable
          style={$errorBacktrace}
          text={`${props.errorInfo.componentStack}`.trim()}
          preset={"bold"}
          weight={"bold"}
          size={"xxl"}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={$resetButton}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
  flex: 1,
};

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
};

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.medium,
};

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.medium,
  borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
};

const $errorContent: TextStyle = {
  color: colors.error,
};

const $errorBacktrace: TextStyle = {
  marginTop: spacing.medium,
  color: colors.textDim,
};

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.huge,
};
