import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import theme from './../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    fontSize: theme.appbar.fontSizes,
    paddingVertical: theme.appbar.paddingVertical,
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold
  },
  box: {
    width: 50,
    height: 100,
  },
});

const AppBar = () => {
  return (
    <View style={[
      styles.box,
      {
        flexDirection: "column",
        flex: 1,
        backgroundColor: theme.colors.textPrimary,
        width: "auto",
      }
    ]}>
      <Pressable  onPress={() => {
        }} >
        <Text style={styles.appbar}>
              Repositories 
        </Text>
      </Pressable>
      {}
    </View>
  );
  
};

export default AppBar;
