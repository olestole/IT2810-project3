import { gql } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReviewMutation($addReviewReview: Review!) {
    addReview(review: $addReviewReview) {
      status
      description
      user
    }
  }
`;

export { ADD_REVIEW };
