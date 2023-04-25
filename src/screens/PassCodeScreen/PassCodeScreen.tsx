import OTPInputView from "../../components/OTPINPUT";
import { Screen } from "../../components/Screen";
import { AuthStackScreenProps } from "../../types/navigation";
import { PasscodeMode } from "@common/enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, StyleSheet, Alert } from "react-native";

type PasscodeScreenParams = {
  mode: PasscodeMode;
};

export const PasscodeScreen = ({
  route,
  navigation,
}: AuthStackScreenProps<"PassCodeScreen">) => {
  const { mode } = route.params as PasscodeScreenParams;

  const handleOtpCompletion = async (otpValue: string) => {
    const storedPin = await AsyncStorage.getItem("userPin");

    if (mode === PasscodeMode.Set) {
      await AsyncStorage.setItem("userPin", otpValue);
      navigation.navigate("Main");
      return;
    }

    if (mode === PasscodeMode.SignIn && storedPin === otpValue) {
      navigation.navigate("Main");
      return;
    }

    Alert.alert("Invalid PIN", "Please enter a valid PIN.");
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>
        {mode === PasscodeMode.Set ? "Set" : "Enter"} PIN
      </Text>
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
