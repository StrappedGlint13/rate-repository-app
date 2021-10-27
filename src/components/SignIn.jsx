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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'space-between',
    height: 200,
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
});

const SignInForm = ( { onSubmit } ) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
          <Text color={'main'} fontWeight={'bold'}>Sign in</Text>
      </Pressable>
    </View>
    
  );
};

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn();
  const client = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;
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



export default SignIn;