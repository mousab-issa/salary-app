import OTPInputView from "../../components/OTPINPUT";
import { Screen } from "../../components/Screen";
import { AuthStackScreenProps } from "../../types/navigation";
import { ACCESS_TOKEN_KEY, USER_PIN_KEY } from "@common/constants";
import { PasscodeMode } from "@common/enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@state/auth/authSlice";
import { useAppDispatch } from "@state/hooks";
import * as storage from "@utils/storage";
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
  const dispatch = useAppDispatch();

  const handleOtpCompletion = async (otpValue: string) => {
    const storedPin = await AsyncStorage.getItem(USER_PIN_KEY);

    if (mode === PasscodeMode.Set) {
      await AsyncStorage.setItem(USER_PIN_KEY, otpValue);
      dispatch(login());
      return;
    }

    if (mode === PasscodeMode.SignIn && storedPin === otpValue) {
      dispatch(login());

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
