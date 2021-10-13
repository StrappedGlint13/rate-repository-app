import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import theme from './../theme';

const styles = StyleSheet.create({
  appbar: {
    fontSize: theme.appbar.fontSizes,
    paddingVertical: theme.appbar.paddingVertical,
    marginHorizontal: theme.appbar.marginHorizontal,
    color: theme.appbar.white,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBar = () => {
  return (
    <View style={[
      theme.box,
      {
        flexDirection: "row",
        flex: 1,
        backgroundColor: theme.colors.textPrimary,
        width: "auto",
      }
    ]}>
      <Pressable  onPress={() => {
        }} >
        <Text style={styles.appbar} >
              Repositories 
        </Text>
      </Pressable>
      {}
    </View>
  );
  
};

export default AppBar;
