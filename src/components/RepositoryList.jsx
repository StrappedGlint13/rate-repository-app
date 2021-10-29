import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import FilterMenu from './FilterMenu';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
        
const renderItem = ({ item }) => (
    <RepositoryItem item={item} singleView={false}
     />
  );

const RepositoryList = () => {

  const [selectedValue, setSelectedValue] = useState(null);
  const {repositories } = useRepositories({selectedValue});

  
  return <RepositoryListContainer selectedValue={selectedValue} 
  setSelectedValue={ setSelectedValue} repositories={repositories} />;
 
};

export const RepositoryListContainer = ({repositories, selectedValue, setSelectedValue}) => {
  console.log('con');
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList  
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <FilterMenu selectedValue={selectedValue} 
      setSelectedValue={setSelectedValue}/>}
    />
  );
};

export default RepositoryList;