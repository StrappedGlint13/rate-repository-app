import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from './../theme';
import { useHistory } from "react-router-native";
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({
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
  },
  button: {
    alignItems: theme.button.alignItems,
    justifyContent: theme.button.justifyContent,
    paddingVertical: theme.button.paddingVertical,
    paddingHorizontal: theme.button.paddingHorizontal,
    backgroundColor: theme.button.backgroundColor,
  },
});

const kFormatter = num => Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);

const RepositoryItem = ( { item, singleView } ) => {
  let history = useHistory();
  
  const pressHandler = () =>  {   
    history.push(`/${item.id}`);
  };

  const onSubmit = async ( url ) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
      <View>
      <Pressable onPress={pressHandler} >
        <View>
          <View style={theme.flexContainer} paddingVertical={2} >
            <View style={theme.flexContainer}
            paddingHorizontal={15}>
              <Image
                style={theme.tinyLogo}
                source={{ uri: `${item.ownerAvatarUrl}`}}
                on>
              </Image>
            </View>
            <View style={theme.flex_nextto}>
              <Text testID="name" style={styles.name}> {item.fullName} 
              </Text>
              <Text testID="description" style={styles.description} > {item.description} </Text>
            </View>
        </View>
        <View backgroundColor={theme.colors.white}>
        <Text testID="language" style={styles.language}> {item.language} </Text>
        </View>
        <Bottom stargazersCount={item.stargazersCount} 
        forksCount={item.forksCount} reviewCount={item.reviewCount} 
        ratingAverage={item.ratingAverage} />
        </View>
      </Pressable>
      {singleView ?  <Pressable onPress={() => onSubmit(item.url)} style={styles.button}>
          <Text color={'main'} fontWeight={'bold'}> Open in Github</Text>
      </Pressable> : null}
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
        <Text testID="stargazersCount" style={styles.bottomNumbers}> {kFormatter(stargazersCount)}</Text>
        <Text style={styles.bottomText}> Stars </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text testID="forksCount" style={styles.bottomNumbers}> {kFormatter(forksCount)}</Text>
        <Text style={styles.bottomText}> Forks </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text testID="reviewCount" style={styles.bottomNumbers}
        > {kFormatter(reviewCount)}</Text>
        <Text style={styles.bottomText}> Reviews </Text>
      </View>
      <View style={styles.flexBottoms} >
        <Text testID="ratingAverage" style={styles.bottomNumbers}> {ratingAverage}</Text>
        <Text style={styles.bottomText}> Rating </Text>
      </View>
    </View>
  );
};

export default RepositoryItem;