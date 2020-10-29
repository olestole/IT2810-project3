import { gql } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReviewMutation($addReviewReview: InputReview!) {
    addReview(review: $addReviewReview) {
      code
      title
      message
      user
      title
    }
  }
`;

export { ADD_REVIEW };
