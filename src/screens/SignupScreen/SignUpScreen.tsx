import { AuthStackScreenProps } from "../../types/navigation";
import { AuthScreenHeader } from "../SignInScreen";
import {
  Button,
  Icon,
  Screen,
  Text,
  TextDivider,
  TextField,
  TextFieldAccessoryProps,
} from "@components/index";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { register } from "@state/auth/asyncActions";
import { useAppDispatch, useAppSelector } from "@state/hooks";
import { colors, spacing } from "@theme/index";
import React, { FC, useMemo, useRef, useState } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";

interface SignUpScreenProps extends AuthStackScreenProps<"SignUpScreen"> {}

export const SignUpScreen: FC<SignUpScreenProps> = (_props) => {
  const navigation = _props.navigation;

  const authPasswordInput = useRef<any>(null);
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setAuthPassword] = useState("");

  const dispatch = useAppDispatch();
  const authLoading = useAppSelector((state) => state.authSlice.isLoading);
  const authError = useAppSelector((state) => state.authSlice.isError);

  const signUp = () => {
    dispatch(register({ email, password, firstName, lastName: "" }));
  };

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        );
      },
    [isAuthPasswordHidden]
  );

  const onLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <Screen preset="auto" safeAreaEdges={["top"]}>
      <AuthScreenHeader />
      <Text
        testID="sign-up-heading"
        tx="signUpScreen.signUp"
        preset="heading"
        weight="medium"
        size="lg"
        style={$signUp}
      />

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <TextField
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        label="First Name"
        placeholder="First name"
      />

      <TextField
        ref={authPasswordInput}
        value={password}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
        onSubmitEditing={signUp}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        loading={authLoading}
        tx="signUpScreen.tapToSignUp"
        style={$tapButton}
        preset="reversed"
        onPress={signUp}
      />
      {authError && (
        <Text
          preset="heading"
          style={{ color: "red" }}
          weight={"bold"}
          size={"sm"}
        >
          Error{" "}
        </Text>
      )}

      <TextDivider text="OR" />
      <View style={$authProviders}>
        <View style={$authProvider}>
          <FontAwesome name="apple" size={24} color="white" />
        </View>
        <View style={$authProvider}>
          <FontAwesome5 name="google" size={24} color="white" />
        </View>
        <View style={$authProvider}>
          <FontAwesome name="facebook" size={24} color="white" />
        </View>
      </View>

      <Pressable style={$loginLink} onPress={onLogin}>
        <Text
          preset={"bold"}
          weight={"light"}
          size={"sm"}
          style={{ marginHorizontal: 5 }}
        >
          Already have an account?
        </Text>
        <Text preset={"default"} weight={"bold"} size={"sm"}>
          Log in
        </Text>
      </Pressable>
    </Screen>
  );
};

const $signUp: TextStyle = {
  marginBottom: spacing.extraLarge,
};

const $textField: ViewStyle = {
  marginBottom: spacing.large,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.medium,
};

const $authProviders: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: spacing.large,
};

const $authProvider: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: colors.palette.grey200,
  marginHorizontal: spacing.small,
  justifyContent: "center",
  alignItems: "center",
};

const $loginLink: TextStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  textDecorationLine: "underline",
  color: colors.palette.neutral600,
  marginTop: spacing.small,
};
