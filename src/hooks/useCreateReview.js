import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ( review ) => {
        console.log("review?", review);
        return mutate({ variables: { review } });
    };

    return [createReview, result];
};

export default useCreateReview;