import React from 'react';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';

import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router';

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

const CreateReviewForm = ( { onSubmit } ) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textinput} name="ownerName" placeholder="Repository owner name"/>
      <FormikTextInput style={styles.textinput} name="repositoryName" placeholder="Repository name"/>
      <FormikTextInput style={styles.textinput} name="rating" placeholder="Rating between 0 and 100"/>
      <FormikTextInput style={styles.textinput} name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
          <Text color={'main'} fontWeight={'bold'}>Create a review</Text>
      </Pressable>
    </View>
    
  );
};

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository owner name is required'),
  ownerName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0)
    .max(100)
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const review = { ...values, rating: parseInt(values.rating) };
    
    try {
      const {data} = await createReview(review);
      history.push(`/${data.createReview.repositoryId}`);
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} 
    onSubmit={onSubmit}
    validationSchema={validationSchema}>
      {({ handleSubmit }) => 
      <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};



export default CreateReview;