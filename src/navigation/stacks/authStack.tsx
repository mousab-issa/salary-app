import type { AuthStackParamList } from "../../types/navigation";
import { PasscodeMode } from "@common/enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  PasscodeScreen,
  OTPVerificationScreen,
} from "@screens/index";
import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const [initialRoute, setInitialRoute] = useState<
    "SignInScreen" | "PassCodeScreen"
  >("SignInScreen");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setInitialRoute("PassCodeScreen");
      } else {
        setInitialRoute("SignInScreen");
      }
    };

    checkToken();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="OTPScreen" component={OTPVerificationScreen} />
      <Stack.Screen
        name="PassCodeScreen"
        component={PasscodeScreen}
        initialParams={{ mode: PasscodeMode.SignIn }}
      />
    </Stack.Navigator>
  );
};
