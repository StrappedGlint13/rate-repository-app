import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import theme from './../theme';

import { Link } from "react-router-native";

const styles = StyleSheet.create({
  appbar: {
    fontSize: theme.appbar.fontSizes,
    paddingVertical: theme.appbar.paddingVertical,
    marginHorizontal: theme.appbar.marginHorizontal,
    color: theme.appbar.white,
    fontWeight: theme.fontWeights.bold,
  },
  boxstyle: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: theme.colors.textPrimary,
    width: "auto",
  }
});

 const AppBarTab = ({ tab, onPress }) => {
  return (
    <Pressable onPress={onPress}> 
        <Text style={styles.appbar} >
              {tab} 
        </Text>
      </Pressable>
  );
};

const AppBar = () => {
  const handlePress = () => {
    console.log('test');
  };

  return (
    <View style={styles.boxstyle}>
    <Link to="/" component={AppBarTab}
    tab={'Repositories'} onPress={handlePress}>
      </Link>
    <Link to="/signin" component={AppBarTab}
    tab={'Sign in'} onPress={handlePress}>
      </Link>
    </View>
  );
  
};

export default AppBar;
