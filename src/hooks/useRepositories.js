import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( { selectedValue, debouncedKeyword, setSearchkeyword } ) => {
  let value = {};
  
  useEffect(()=> {
    setSearchkeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  switch (selectedValue) {
    case "Latest":
      value = {first: 5, orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: `${debouncedKeyword}` };
      break;
    case "Highest":
      value = {first: 5, orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword: `${debouncedKeyword}`};
      break;
    case "Lowest":
      value = {first: 5, orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword: `${debouncedKeyword}`};
      break;
    default:
      value = {first: 10, orderBy: "CREATED_AT", orderDirection: "ASC",searchKeyword: `${debouncedKeyword}`};
      break;

  }
  
  const { data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: value
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return { 
    repositories: data ?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;