import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
  
    const signIn = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };

    return [signIn, result];
};

export default useSignIn;