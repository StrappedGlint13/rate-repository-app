import React from 'react';
import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
import { View, StyleSheet } from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
       <AppBar />
        <RepositoryList />
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
  },
});

export default App;