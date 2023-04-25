import { Screen } from "../../components/Screen";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const WithdrawScreen = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdraw = () => {
    // Handle withdrawal logic
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Withdraw</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setWithdrawAmount}
        value={withdrawAmount}
        placeholder="Withdraw Amount"
      />
      <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
