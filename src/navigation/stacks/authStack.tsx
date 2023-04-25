import type { AuthStackParamList } from "../../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  PasscodeScreen,
  OTPVerificationScreen,
} from "@screens/index";
import React from "react";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="SignInScreen"
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="OTPScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="PassCodeScreen" component={PasscodeScreen} />
    </Stack.Navigator>
  );
};
