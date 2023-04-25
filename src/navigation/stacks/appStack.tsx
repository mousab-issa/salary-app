import { AppStackParamList, AppTabsParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen, WithdrawScreen, SettingsScreen } from "@screens/index";
import React, { FC } from "react";

const Stack = createNativeStackNavigator<AppStackParamList>();
const MainTabs = createBottomTabNavigator<AppTabsParamList>();

const AppStackTabs: FC = () => {
  return (
    <MainTabs.Navigator initialRouteName="MainScreen">
      <MainTabs.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: "Main",
          tabBarIcon: () => <Ionicons name="home" />,
        }}
      />
      <MainTabs.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
        options={{
          tabBarLabel: "Withdraw",
          tabBarIcon: () => <Ionicons name="cash" />,
        }}
      />
      <MainTabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <Ionicons name="settings" />,
        }}
      />
    </MainTabs.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={AppStackTabs}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
