import OTPInputView from "../../components/OTPINPUT";
import { Screen } from "../../components/Screen";
import { AppStackScreenProps } from "../../types/navigation";
import { USER_PIN_KEY } from "@common/constants";
import { PasscodeMode } from "@common/enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@state/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";

export const PasscodeScreen = ({
  navigation,
}: AppStackScreenProps<"PassCodeScreen">) => {
  const [mode, setMode] = useState(PasscodeMode.Set);
  const isSignedIn = useAppSelector((state) => state.authSlice.isSignedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkStoredPin = async () => {
      const storedPin = await AsyncStorage.getItem(USER_PIN_KEY);
      setMode(storedPin ? PasscodeMode.SignIn : PasscodeMode.Set);
    };
    checkStoredPin();
  }, []);

  const handleOtpCompletion = async (otpValue: string) => {
    const storedPin = await AsyncStorage.getItem(USER_PIN_KEY);

    if (mode === PasscodeMode.Set) {
      await AsyncStorage.setItem(USER_PIN_KEY, otpValue);
      navigation.navigate("Main");
      return;
    }

    if (mode === PasscodeMode.SignIn && storedPin === otpValue) {
      navigation.navigate("Main");
      return;
    }

    Alert.alert("Invalid PIN", "Please enter a valid PIN.");
  };

  useEffect(() => {
    if (isSignedIn) {
      navigation.navigate("Main");
    }
  }, [isSignedIn]);

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
