import { Screen } from "../../components/Screen";
import { USER_PIN_KEY } from "@common/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOut } from "@state/auth/asyncActions";
import { useAppDispatch } from "@state/hooks";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleReset = async () => {
    await AsyncStorage.removeItem(USER_PIN_KEY);
    Alert.alert("The pin is resetted");
  };

  const settingsOptions = [
    {
      id: 1,
      text: "Reset PIN",
      onPress: handleReset,
    },
    { id: 2, text: "Logout", onPress: handleLogout },
  ];

  return (
    <Screen style={styles.container}>
      {settingsOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={option.onPress}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#F0F2F5",
  },
  option: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A8DFF",
  },
});
