import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import theme from './../theme';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
  },
  flex_nextto: {
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    paddingVertical: 2,
    flex: 1,
  },
  flexBottoms: {
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  name: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold
  },
  language: {
    color: theme.colors.white,
    backgroundColor: theme.colors.language_back,
    alignSelf: 'flex-start',
    marginHorizontal: "20%",
    fontSize: theme.fontSizes.body,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.grey,
    textAlign: 'left',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    justifyContent: 'space-around',
  },
  bottomText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.grey
  },
  bottomNumbers: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold
  }
});
const kFormatter = num => Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);

const RepositoryItem = ( { item } ) => {
    return (
      <View style={styles.flex_nextto}>
        <View style={styles.flexContainer} paddingVertical={2} >
          <View style={styles.flexContainer}
          paddingHorizontal={15}>
            <Image
              style={theme.tinyLogo}
              source={{ uri: `${item.ownerAvatarUrl}`}}>
            </Image>
          </View>
          <View style={styles.flex_nextto}>
              <Text style={styles.name}> {item.fullName} </Text>
              <Text style={styles.description} > {item.description} </Text>
          </View>
      </View>
      <Text style={styles.language}> 
      {item.language} </Text>
      <Bottom stargazersCount={item.stargazersCount} 
      forksCount={item.forksCount} reviewCount={item.reviewCount} 
      ratingAverage={item.ratingAverage} />
      </View>
    );
};

const Bottom = ( { 
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage } ) => {

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.flexBottoms}  >
        <Text style={styles.bottomNumbers}> {kFormatter(stargazersCount)}</Text>
        <Text style={styles.bottomText}> Stars </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text style={styles.bottomNumbers}> {kFormatter(forksCount)}</Text>
        <Text style={styles.bottomText}> Forks </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text style={styles.bottomNumbers}
        > {kFormatter(reviewCount)}</Text>
        <Text style={styles.bottomText}> Reviews </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text style={styles.bottomNumbers}> {ratingAverage}</Text>
        <Text style={styles.bottomText}> Rating </Text>
      </View>
    </View>
  );
};

export default RepositoryItem;