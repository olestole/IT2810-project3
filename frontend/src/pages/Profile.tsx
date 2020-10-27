import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { ReviewList } from 'components/Detail/ProductReview';
import { LoginCard } from 'components/Profile/';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { GET_PERSONAL_REVIEWS } from 'graphql/queries';
import { GetPersonalReviewsQuery } from 'graphql/__generated__/GetPersonalReviewsQuery';
import React from 'react';
import { IReview } from 'types/globalTypes';

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, error, data } = useQuery<GetPersonalReviewsQuery>(GET_PERSONAL_REVIEWS, {
    variables: { personalReviewUserEmail: user?.email },
  });

  if (user) {
    console.log(user);
  }

  if (loading) return <LoadingIndicator />;
  if (error) return <h1>ERROR</h1>;
  if (data) {
    console.log(data);
  }

  return (
    <div className="loginPage">
      <LoginCard />
      {user && <ReviewList reviews={data?.personalReviews as IReview[]} />}
    </div>
  );
};

export default Profile;
