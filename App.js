import React from 'react';
import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
//import View from 'react-native';

const App = () => {
  return (
    <>
      <AppBar />
      <RepositoryList />
    </>
  );
};

export default App;