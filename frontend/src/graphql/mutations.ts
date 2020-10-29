import { gql } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReviewMutation($addReviewReview: InputReview!) {
    addReview(review: $addReviewReview) {
      code
      success
      message
      rating
      description
      varenummer
      title
      userEmail
    }
  }
`;

export { ADD_REVIEW };
