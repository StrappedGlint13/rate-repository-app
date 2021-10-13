import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import theme from './../theme';

import { Link } from "react-router-native";
import SignIn from './SignIn';

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
  const handlePress = () => {
    console.log('click');
  };

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
    <Link to="/" component={Pressable} onPress={handlePress}>
        <Text style={styles.appbar} >
            Repositories 
        </Text>
    </Link>
    <Link to="/signin" component={Pressable}
     onPress={handlePress}>
        <Text style={styles.appbar} >
            Sign in 
        </Text>
    </Link>
    </View>
  );
  
};

export default AppBar;

/*
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
    <View style={[
      theme.box,
      {
        flexDirection: "row",
        flex: 1,
        backgroundColor: theme.colors.textPrimary,
        width: "auto",
      }
    ]}>
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

*/
