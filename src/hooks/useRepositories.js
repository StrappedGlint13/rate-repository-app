import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = ( { selectedValue } ) => {
  let value = {};

  switch (selectedValue) {
    case "Latest":
      value = {orderBy: "CREATED_AT", orderDirection: "DESC"};
      break;
    case "Highest":
      value = {orderBy: "RATING_AVERAGE", orderDirection: "DESC"};
      break;
    case "Lowest":
      value = {orderBy: "RATING_AVERAGE", orderDirection: "ASC"};
      break;
    default:
      value = {orderBy: "CREATED_AT", orderDirection: "ASC"};
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