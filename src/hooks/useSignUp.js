import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/queries";

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGNUP);

    const signIn = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };

    return [signIn, result];
};

export default useSignUp;