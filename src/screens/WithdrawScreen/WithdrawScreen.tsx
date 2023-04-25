import { Screen } from "../../components/Screen";
import { userWithdraw } from "@state/financial/asyncActions";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export const WithdrawScreen = () => {
  const dispatch = useAppDispatch();

  const availableBalance = useAppSelector(
    (state) => state.finicalSlice.userBalance
  );
  const maxWithdraw = useAppSelector((state) => state.finicalSlice.maxWithdraw);

  const handleWithdraw = async () => {
    if (!maxWithdraw) {
      return;
    }

    try {
      await dispatch(userWithdraw({ amount: maxWithdraw }));
      Alert.alert("Success", "Withdrawal successful.");
    } catch (error) {
      console.error("Error withdrawing:", error);
      Alert.alert("Error", "Withdrawal failed.");
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>On-Demand Salary</Text>
      <Text style={styles.subtitle}>
        Available Balance: {availableBalance} THB
      </Text>
      <Text style={styles.subtitle}>Max Withdraw: {maxWithdraw} THB</Text>
      <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <View style={styles.bankDetailsCard}>
        <Text style={styles.bankDetailsTitle}>Bank Details</Text>
        <Text>Account Name: John Doe</Text>
        <Text>Account Number: 1234567890</Text>
        <Text>Bank: Example Bank</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#374151",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bankDetailsCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FFF",
    width: "100%",
  },
  bankDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
  },
});
