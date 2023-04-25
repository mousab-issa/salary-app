import OTPInputView from "../../components/OTPINPUT";
import { Screen } from "../../components/Screen";
import { AuthStackScreenProps } from "../../types/navigation";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const OTPVerificationScreen = ({
  navigation,
}: AuthStackScreenProps<"OTPScreen">) => {
  const handleOTPVerification = (code: string) => {
    navigation.navigate("PassCodeScreen", { mode: "set" });
  };

  return (
    <Screen safeAreaEdges={["top"]}>
      <Text>OTPVerificationScreen</Text>

      <OTPInputView
        pinCount={4}
        onCodeFilled={handleOTPVerification}
        editable={true}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});
