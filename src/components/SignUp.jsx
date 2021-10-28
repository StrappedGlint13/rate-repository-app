import React from 'react';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

import Text from './Text';
import { useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      marginVertical: 10,
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    button: {
      alignItems: theme.button.alignItems,
      justifyContent: theme.button.justifyContent,
      paddingVertical: theme.button.paddingVertical,
      paddingHorizontal: theme.button.paddingHorizontal,
      backgroundColor: theme.button.backgroundColor,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    textinput: {
        marginVertical: 10,
    }
  });

const SignInForm = ( { onSubmit } ) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput name="passwordConf" placeholder="Password confirmation" secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
          <Text color={'main'} fontWeight={'bold'}>Sign up</Text>
      </Pressable>
    </View>
    
  );
};

const initialValues = {
  username: '',
  password: '',
  passwordConf: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .test('len', 
    'Username is a required string with a length between 1 and 30', 
    val => !val || val.length > 0 && val.length < 31)
    ,
  password: yup
    .string()
    .required('Password is required')
    .test('len', 
    'Password is a required string with a length between 5 and 50', 
    val => !val || val.length > 4 && val.length < 51)
    ,
  passwordConf: yup.string()
    .oneOf([yup.ref('password'), 'Passwords dont match'])
    .required('Password confirm is required')
});

const SignUp = () => {
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const client = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }

    try {
        const {data} = await signIn({ username, password });
        await authStorage.setAccessToken(data.authorize.accessToken);
        client.resetStore();
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <Formik initialValues={initialValues} 
    onSubmit={onSubmit}
    validationSchema={validationSchema}>
      {({ handleSubmit }) => 
      <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};



export default SignUp;