import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";
import { useHistory } from "react-router-native";
import { useEffect } from "react";

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    let history = useHistory();

    useEffect(() => {
        if (result.data) {
           history.push('/');
        }
      });

    const signIn = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };

    return [signIn, result];
};

export default useSignIn;