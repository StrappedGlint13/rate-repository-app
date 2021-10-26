import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import theme from './../theme';

import { Link } from "react-router-native";
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

import useAuthStorage from '../hooks/useAuthStorage';

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
  const { data } = useQuery(AUTHORIZED_USER);
  console.log(data);
  const authStorage = useAuthStorage();
  const client = useApolloClient(); 
  
  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  if (!data.authorizedUser) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollStyle}>
          <Link to="/signin" component={AppBarTab}
            tab={'Welcome! Sign in below :)'}>
          </Link>
        </ScrollView>
      </View>);
  }

  return (
    <View style={styles.container}>
      {console.log(data)}
      <ScrollView horizontal contentContainerStyle={styles.scrollStyle}>
        <Link to="/" component={AppBarTab}
          tab={'Repositories '}>
        </Link>
        <Link to="/signin" component={AppBarTab}
          tab={'Sign out '} onPress={signOut}>
        </Link>
      </ScrollView>
    </View>
  );
  
};

export default AppBar;
