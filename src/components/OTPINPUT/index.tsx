import { codeToArray } from "./codeToArray";
import { isAutoFillSupported } from "./device";
import styles from "./styles";
import * as Clipboard from "expo-clipboard";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  I18nManager,
  EmitterSubscription,
  KeyboardTypeOptions,
} from "react-native";

interface OTPInputViewProps {
  pinCount: number;
  autoFocusOnLoad?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardAppearance?: "default" | "light" | "dark" | undefined;
  keyboardType?: KeyboardTypeOptions;
  clearInputs?: boolean;
  placeholderCharacter?: string;
  selectionColor?: string;
  style?: any;
  codeInputFieldStyle?: any;
  codeInputHighlightStyle?: any;
  placeholderTextColor?: string;
  code?: string;
  onCodeChanged?: (code: string) => void;
  onCodeFilled?: (code: string) => void;
}

const OTPInputView: React.FC<OTPInputViewProps> = (props) => {
  const defaultProps: OTPInputViewProps = {
    pinCount: 6,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    editable: true,
    keyboardAppearance: "default",
    keyboardType: "number-pad",
    clearInputs: false,
    placeholderCharacter: "",
    selectionColor: "#000",
  };

  const {
    pinCount,
    autoFocusOnLoad,
    secureTextEntry,
    editable,
    keyboardType,
    selectionColor,
    keyboardAppearance,
    style,
    codeInputFieldStyle,
    codeInputHighlightStyle,
    placeholderCharacter,
    placeholderTextColor,
    code,
  } = { ...defaultProps, ...props };

  const fields = useRef<Array<TextInput | null>>([]);

  const keyboardDidHideListener = useRef<EmitterSubscription | null>(null);
  const timer = useRef<NodeJS.Timeout | number | null>(null);
  const hasCheckedClipBoard = useRef<boolean>(false);
  const clipBoardCode = useRef<string>("");
  const prevCode = useRef<string | undefined>(props.code);

  const [digits, setDigits] = useState<Array<string>>(
    codeToArray(props.code || "")
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(
    autoFocusOnLoad ? 0 : -1
  );

  useEffect(() => {
    setDigits(codeToArray(props.code || ""));
  }, [props.code]);

  useEffect(() => {
    copyCodeFromClipBoardOnAndroid();
    bringUpKeyBoardIfNeeded();
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      keyboardDidHideListener.current?.remove();
    };
  }, []);

  const copyCodeFromClipBoardOnAndroid = useCallback(() => {
    if (Platform.OS === "android") {
      checkPinCodeFromClipBoard();
      timer.current = setInterval(checkPinCodeFromClipBoard, 400);
    }
  }, []);

  const bringUpKeyBoardIfNeeded = useCallback(() => {
    const digits = getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex);
    }
  }, [autoFocusOnLoad, pinCount]);

  const getDigits = useCallback(() => {
    return code === undefined ? digits : code.split("");
  }, [digits, props.code]);

  const handleKeyboardDidHide = useCallback(() => {
    blurAllFields();
  }, []);

  const notifyCodeChanged = useCallback(() => {
    const code = digits.join("");
    const { onCodeChanged } = props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  }, [digits, props]);

  const pullDataFromSms = useCallback(() => {
    const code = digits.join("");
    const { onCodeFilled } = props;
    onCodeFilled && onCodeFilled(code);
  }, [digits, props]);

  const checkPinCodeFromClipBoard = useCallback(() => {
    const { pinCount, onCodeFilled } = props;
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    Clipboard.getStringAsync()
      .then((code: string) => {
        if (
          hasCheckedClipBoard.current &&
          regexp.test(code) &&
          clipBoardCode.current !== code
        ) {
          setDigits(code.split(""));
          blurAllFields();
          notifyCodeChanged();
          onCodeFilled && onCodeFilled(code);
        }
        clipBoardCode.current = code;
        hasCheckedClipBoard.current = true;
      })
      .catch(() => {});
  }, [props, notifyCodeChanged]);

  const handleChangeText = useCallback(
    (index: number, text: string) => {
      const { onCodeFilled, pinCount } = props;
      const digits = getDigits();
      let newDigits = digits.slice();
      const oldTextLength = newDigits[index] ? newDigits[index].length : 0;
      const newTextLength = text.length;

      if (newTextLength - oldTextLength === pinCount) {
        newDigits = text.split("").slice(oldTextLength, newTextLength);
        setDigits(newDigits);
        notifyCodeChanged();
      } else {
        if (text.length === 0) {
          if (newDigits.length > 0) {
            newDigits = newDigits.slice(0, newDigits.length - 1);
          }
        } else {
          text.split("").forEach((value: string) => {
            if (index < pinCount) {
              newDigits[index] = value;
              index += 1;
            }
          });
          index -= 1;
        }
        setDigits(newDigits);
        notifyCodeChanged();
      }

      let result = newDigits.join("");
      if (result.length >= pinCount) {
        onCodeFilled && onCodeFilled(result);
        focusField(pinCount - 1);
        blurAllFields();
      } else {
        if (text.length > 0 && index < pinCount - 1) {
          focusField(index + 1);
        }
      }
    },
    [getDigits, notifyCodeChanged, props]
  );

  const handleKeyPressTextInput = useCallback(
    (index: number, key: string) => {
      const digits = getDigits();
      if (key === "Backspace") {
        if (!digits[index] && index > 0) {
          handleChangeText(index - 1, "");
          focusField(index - 1);
        }
      }
    },
    [getDigits, handleChangeText]
  );

  const focusField = useCallback(
    (index: number) => {
      if (index < fields.current.length) {
        fields.current?.[index]?.focus();
        setSelectedIndex(index);
      }
    },
    [fields]
  );

  const blurAllFields = useCallback(() => {
    fields.current.forEach((field) => field?.blur());
    setSelectedIndex(-1);
  }, []);

  const clearAllFields = useCallback(() => {
    const { clearInputs, code } = props;
    if (clearInputs && code === "") {
      setDigits([]);
      setSelectedIndex(0);
    }
  }, [props]);

  const renderOneInputField = useCallback(
    (_: any, index: number) => {
      const { defaultTextFieldStyle } = styles;
      const isSelected = selectedIndex === index;
      return (
        <View pointerEvents="none" key={index + "view"} testID="inputSlotView">
          <TextInput
            testID="textInput"
            underlineColorAndroid="rgba(0,0,0,0)"
            style={
              isSelected
                ? [
                    defaultTextFieldStyle,
                    codeInputFieldStyle,
                    codeInputHighlightStyle,
                  ]
                : [defaultTextFieldStyle, codeInputFieldStyle]
            }
            ref={(ref) => {
              fields.current[index] = ref;
            }}
            onChangeText={(text) => {
              handleChangeText(index, text);
            }}
            onKeyPress={({ nativeEvent: { key } }) => {
              handleKeyPressTextInput(index, key);
            }}
            value={!props.clearInputs ? digits[index] : ""}
            keyboardAppearance={keyboardAppearance}
            keyboardType={keyboardType}
            textContentType={isAutoFillSupported ? "oneTimeCode" : "none"}
            key={index}
            selectionColor={selectionColor}
            secureTextEntry={secureTextEntry}
            editable={editable}
            placeholder={placeholderCharacter}
            placeholderTextColor={
              placeholderTextColor || defaultTextFieldStyle.color
            }
          />
        </View>
      );
    },
    [
      selectedIndex,
      codeInputFieldStyle,
      codeInputHighlightStyle,
      handleChangeText,
      handleKeyPressTextInput,
      props,
      digits,
    ]
  );
  const renderTextFields = useCallback(() => {
    return Array.from({ length: pinCount }, renderOneInputField);
  }, [pinCount, renderOneInputField]);

  useEffect(() => {
    copyCodeFromClipBoardOnAndroid();
    bringUpKeyBoardIfNeeded();
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      keyboardDidHideListener.remove();
    };
  }, [
    copyCodeFromClipBoardOnAndroid,
    bringUpKeyBoardIfNeeded,
    handleKeyboardDidHide,
  ]);

  useEffect(() => {
    if (code !== prevCode.current) {
      setDigits(codeToArray(code));
    }
    prevCode.current = code;
  }, [props]);

  const { clearInputs } = props;

  return (
    <View testID="OTPInputView" style={style}>
      <TouchableWithoutFeedback
        style={{ width: "100%", height: "100%" }}
        onPress={() => {
          if (!clearInputs) {
            const filledPinCount = digits.filter(
              (digit) => digit !== null && digit !== undefined
            ).length;
            focusField(Math.min(filledPinCount, pinCount - 1));
          } else {
            clearAllFields();
            focusField(0);
          }
        }}
      >
        <View
          style={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {renderTextFields()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default OTPInputView;
