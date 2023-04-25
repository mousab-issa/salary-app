import OTPInputView from "../../components/OTPINPUT";
import { Screen } from "../../components/Screen";
import { AuthStackScreenProps } from "../../types/navigation";
import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

type PasscodeScreenParams = {
  mode: "set" | "sign-in";
};

export const PasscodeScreen = ({
  route,
  navigation,
}: AuthStackScreenProps<"PassCodeScreen">) => {
  const [otp, setOTP] = useState("");
  const { mode } = route.params as PasscodeScreenParams;

  const handleOtpCompletion = (otpValue: string) => {
    if (mode === "set") {
      // Handle setting PIN
    } else if (mode === "sign-in") {
      // Handle signing in with PIN
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>{mode === "set" ? "Set" : "Enter"} PIN</Text>
      <OTPInputView
        style={styles.otpInput}
        pinCount={4}
        onCodeFilled={handleOtpCompletion}
        keyboardType="numeric"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpInput: {
    width: "80%",
    height: 60,
  },
});
