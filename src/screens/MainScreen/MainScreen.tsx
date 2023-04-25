import { Screen } from "../../components/Screen";
import { Avatar } from "@components/*";
import {
  getUserProfile,
  getUserTransactions,
} from "@state/financial/asyncActions";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import React, { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const financialState = useAppSelector((state) => state.finicalSlice);
  const isLoading = financialState.isLoading;

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserTransactions());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Screen style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3A8DFF" />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Avatar
        image={{ uri: "https://picsum.photos/200/300" }}
        style={styles.avatar}
        size={20}
      />
      resizeMode="cover"
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {financialState.userProfile?.firstname}
        </Text>
        <Text style={styles.balanceText}>${financialState.userBalance}</Text>
      </View>
      <Text style={styles.transactionsTitle}>Transactions</Text>
      <FlatList
        data={financialState.userTransactions?.transactions}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.date}</Text>
            <Text style={styles.transactionAmount}>${item.amount}</Text>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 10,
    right: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#F0F2F5",
  },
  header: {
    backgroundColor: "#3A8DFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balanceText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    color: "#333",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#3A8DFF",
    fontWeight: "bold",
  },
});
