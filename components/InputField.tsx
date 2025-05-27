import React from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";

import { InputFieldProps } from "../types/type";

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  secureTextEntry,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, containerStyle as ViewStyle]}>
          <Text style={[styles.label, labelStyle as TextStyle]}>{label}</Text>
          <View style={styles.inputContainer}>
            {icon && (
              <Image
                source={icon}
                style={[styles.icon, iconStyle as ImageStyle]}
                resizeMode="contain"
              />
            )}
            <TextInput
              style={[styles.input, inputStyle as TextStyle]}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#1F2937",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: "#6B7280",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#1F2937",
  },
});

export default InputField;
