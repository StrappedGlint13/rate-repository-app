import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GITHUB_ACCESS } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
    const { id }= useParams();
    const result = useQuery(GITHUB_ACCESS, {
      variables: { id: id}
    });
    console.log('loading...');
    if (result.loading || result === undefined) {
      return <Text>loading...</Text>;
    }
  
    const data = result.data.repository;

    if (data) {
      const item = {
        description: data.description,
        forksCount: data.forksCount,
        fullName: data.fullName,
        language: data.language,
        ratingAverage: data.ratingAverage,
        reviewCount: data.reviewCount,
        stargazersCount: data.stargazersCount,
        ownerAvatarUrl: data.ownerAvatarUrl,
        url: data.url,
      };
      return (
        <RepositoryItem item={item} singleView={true} />
      );  
    }
  
    return null;
  };

export default SingleRepository;