import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import theme from './../theme';

import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  },
  textStyle: {
    color: theme.appbar.white,
    fontSize: theme.appbar.fontSize,
    fontWeight: theme.fontWeights.bold,
    marginHorizontal: 12,
  },
  scrollStyle: {
    
    flexGrow: 0,
  }
});

 const AppBarTab = ({ tab, onPress }) => {
  return (
    <Pressable onPress={onPress}> 
        <Text style={styles.textStyle} >
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
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollStyle}>
        <Link to="/" component={AppBarTab}
          tab={'Repositories '} onPress={handlePress}>
        </Link>
        <Link to="/signin" component={AppBarTab}
          tab={'Sign in '} onPress={handlePress}>
        </Link>
      </ScrollView>
    </View>
  );
  
};

export default AppBar;
