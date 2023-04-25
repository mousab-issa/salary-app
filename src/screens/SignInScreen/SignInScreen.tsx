import { Screen } from "../../components/Screen";
import { AuthStackScreenProps } from "../../types/navigation";
import { signIn } from "@state/auth/asyncActions";
import { useAppDispatch } from "@state/hooks";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export const SignInScreen = ({
  navigation,
}: AuthStackScreenProps<"SignInScreen">) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignIn = async () => {
    try {
      await dispatch(signIn({ phone: phoneNumber }));
      navigation.navigate("OTPScreen");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    paddingHorizontal: 20,
  },
  input: {
    width: 200,
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#3A8DFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
