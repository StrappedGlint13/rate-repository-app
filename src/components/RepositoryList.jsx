import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import FilterMenu from './FilterMenu';
import { useDebounce } from 'use-debounce';

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
  const [searchKeyword, setSearchkeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories({selectedValue, debouncedKeyword, setSearchkeyword});

  const onEndReach = () => {
    console.log('You have reached the end of the list');
  };
  
  return <RepositoryListContainer selectedValue={selectedValue} 
  setSelectedValue={ setSelectedValue} onEndReach={onEndReach} repositories={repositories} searchKeyword={searchKeyword}  setSearchkeyword={setSearchkeyword} />;
 
};

export const RepositoryListContainer = ({repositories, onEndReach, selectedValue, setSelectedValue, searchKeyword, setSearchkeyword}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList  
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={<FilterMenu selectedValue={selectedValue} searchKeyword={searchKeyword} 
      setSelectedValue={setSelectedValue} setSearchkeyword={setSearchkeyword}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;