import "./src/i18n";
import { NAVIGATION_PERSISTENCE_KEY } from "@common/constants";
import { Common } from "@components/index";
import Config from "@config/index";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppNavigator, useNavigationPersistence } from "@navigation/index";
import { ErrorBoundary } from "@screens/ErrorScreen/ErrorBoundary";
import { setupReactotron } from "@services/reactotron";
import store from "@state/index";
import { customFontsToLoad } from "@theme/typography";
import "@utils/ignoreWarnings";
import * as storage from "@utils/storage";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

setupReactotron({
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  logInitialState: true,
  logSnapshots: false,
});

const prefix = Linking.createURL("/");

const config = {
  screens: {},
};

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  if (!isNavigationStateRestored || !areFontsLoaded) return null;

  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <Provider store={store}>
          <BottomSheetModalProvider>
            <Common>
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </Common>
          </BottomSheetModalProvider>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);
