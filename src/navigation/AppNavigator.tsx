import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { AppStack, AuthStack } from "./stacks";
import { ACCESS_TOKEN_KEY } from "@common/constants";
import Config from "@config/index";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import * as storage from "@utils/storage";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const exitRoutes = Config.exitRoutes;

type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  // const isLoggedIn = useAppSelector((state) => state.authSlice.isSignedIn);
  const isLoggedIn = false;
  const isAuthLoading = useAppSelector((state) => state.authSlice.isLoading);

  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    try {
      const token = await storage.getSecureValue(ACCESS_TOKEN_KEY);
    } catch (e) {
      console.log(e, "Error refreshing token");
    } finally {
      setTimeout(() => {
        setAppIsReady(true);
      }, 1000);
    }
  };

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    if (appIsReady && !isAuthLoading) {
      hideSplashScreen();
    }
  }, [appIsReady, isAuthLoading]);

  useEffect(() => {
    checkAuth();
  }, []);

  const colorScheme = useColorScheme();
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {isLoggedIn && <AppStack />}
      {!isLoggedIn && <AuthStack />}
    </NavigationContainer>
  );
};
