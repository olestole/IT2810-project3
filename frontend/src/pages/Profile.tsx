import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ReviewList } from 'components/Detail/ProductReview';
import { LoginCard } from 'components/Profile/';
import ProfileCard from 'components/Profile/ProfileCard';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { GET_PERSONAL_REVIEWS } from 'graphql/queries';
import { GetPersonalReviewsQuery } from 'graphql/__generated__/GetPersonalReviewsQuery';
// import { GetPersonalReviewsQuery } from 'graphql/__generated__/GetPersonalReviewsQuery';
import React from 'react';
import { IReview } from 'types/globalTypes';

const useStyles = makeStyles(() =>
  createStyles({
    reviewInfo: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

const Profile = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth0();
  const { loading, error, data } = useQuery<GetPersonalReviewsQuery>(GET_PERSONAL_REVIEWS, {
    variables: { personalReviewUserEmail: user?.email },
  });

  if (loading) return <LoadingIndicator />;

  return (
    <div className="loginPage">
      <ProfileCard>
        {
          <div>
            {user && (
              <div className={classes.reviewInfo}>
                <h3>Antall reviews: {data?.personalReviews.length}</h3>
                <h3>Gjenommsnittlig rating: {getAverageRating(data?.personalReviews as IReview[])}</h3>
              </div>
            )}
            <ReviewList reviews={data?.personalReviews as IReview[]} error={error} user={user} />
          </div>
        }
      </ProfileCard>
    </div>
  );
};

const getAverageRating = (reviews: IReview[]) => {
  return reviews && (reviews.reduce((prev, curr) => curr.rating + prev, 0) / reviews.length).toPrecision(3);
};

export default Profile;
