import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from './../theme';
import format from 'date-fns/format';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  name: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  review: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    marginHorizontal: "5%",
    color: theme.colors.language_back,
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 2,
    marginHorizontal: "5%",
  },
  circle: {
    fontWeight: theme.fontWeights.bold,
    backgroundColor: 'white',
    width: 45,
    height: 45,
    borderRadius: 50 / 2,
    borderColor: theme.colors.language_back,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  date: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.grey,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const item = {
    description: repository.description,
    forksCount: repository.forksCount,
    fullName: repository.fullName,
    language: repository.language,
    ratingAverage: repository.ratingAverage,
    reviewCount: repository.reviewCount,
    stargazersCount: repository.stargazersCount,
    ownerAvatarUrl: repository.ownerAvatarUrl,
    url: repository.url,
  };
  
  return (
    <RepositoryItem item={item} singleView={true} />
  );
};

const ReviewItem = ({ review }) => {
  let result = format(new Date(review.createdAt), "dd.MM.yyyy");
  
  return (
    <View style={theme.flex_nextto}>
      <View style={styles.rowContainer}>
        <View style={styles.circle}>
          <Text style={styles.review}>{review.rating}</Text>
        </View>
        <View style={theme.flex_nextto} marginHorizontal={"5%"}>
          <Text style={styles.name}>{review.user.username}</Text>
          <Text style={styles.date}>{result}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
    const { id }= useParams();

    const { data, loading, fetchMore } = useQuery(REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { first: 4, id: id }
    });

    const handleFetchMore = () => {
      const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        console.log("RETURN", canFetchMore);
        return;
      }
      console.log("HMM", canFetchMore);
      fetchMore({
        query: REPOSITORY,
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          variables: { first: 4, id: id },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const nextResult = {
            repository: {
              ...fetchMoreResult.repository,
                edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
              },
            };
          return nextResult;
        },
      });
    };
    
    const repository = data ? data.repository : undefined;
    console.log(repository);
    if (!repository) {
      return null;
    }

    const reviews = repository.reviews.edges.map((e) => e.node);

    const onEndReach = () => {
      handleFetchMore();
    };

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  };

export default SingleRepository;