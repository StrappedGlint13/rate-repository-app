import React from 'react';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { View, StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import  SingleRepository  from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Switch>   
            <Route path="/signin" exact>          
              <SignIn />        
            </Route>
            <Route path="/signup" exact>          
              <SignUp />        
            </Route>
            <Route path="/review" exact>          
              <CreateReview />        
            </Route> 
            <Route path="/:id">          
              <SingleRepository />        
            </Route>
            <Route path="/" exact>          
              <RepositoryList />        
            </Route>        
            <Redirect to="/" />
        </Switch>
    </View> 
  );
};
//<Redirect to="/" />    
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
  },
});

export default Main;