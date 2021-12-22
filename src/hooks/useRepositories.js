import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = ( { selectedValue, debouncedKeyword, setSearchkeyword } ) => {
  let value = {};
  
  useEffect(()=> {
    setSearchkeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  switch (selectedValue) {
    case "Latest":
      value = {orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: `${debouncedKeyword}` };
      break;
    case "Highest":
      value = {orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword: `${debouncedKeyword}`};
      break;
    case "Lowest":
      value = {orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword: `${debouncedKeyword}`};
      break;
    default:
      value = {orderBy: "CREATED_AT", orderDirection: "ASC",searchKeyword: `${debouncedKeyword}`};
      break;

  }
  
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: value
  });

  if (result.loading) {
    return <Text >loading...</Text>;
  }
  return result.data;
};

export default useRepositories;