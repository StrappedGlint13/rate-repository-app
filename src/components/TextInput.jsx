import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textbox: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 100,
        padding: 10,
    }
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.textbox];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;