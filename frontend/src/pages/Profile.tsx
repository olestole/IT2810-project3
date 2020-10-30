import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createStyles, makeStyles } from '@material-ui/core';
import { ReviewList } from 'components/Detail/ProductReview';
import ProfileCard from 'components/Profile/ProfileCard';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { GET_PERSONAL_REVIEWS } from 'graphql/queries';
import { GetPersonalReviewsQuery } from 'graphql/__generated__/GetPersonalReviewsQuery';
import React from 'react';
import { IReview } from 'types/globalTypes';

const useStyles = makeStyles((theme) =>
  createStyles({
    reviewInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 10,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        '& > *': {
          margin: 2,
        },
      },
    },
    reviewList: {
      width: '100%',
      height: '50vh',
      overflow: 'auto',
    },
    notLoggedIn: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    },
    notLoggedInImage: {
      minWidth: '250px',
      marginRight: '10%',
      flex: '1 1 50%',
    },
    logInText: {
      [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
      },
    },
    loginPage: {
      display: 'flex',
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const Profile = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const { loading, error, data } = useQuery<GetPersonalReviewsQuery>(GET_PERSONAL_REVIEWS, {
    variables: { personalReviewUserEmail: user ? user.email : 'none' },
  });

  if (loading) return <LoadingIndicator />;

  return (
    <div className={classes.loginPage}>
      <ProfileCard>
        {!user ? (
          <div className={classes.notLoggedIn}>
            <img className={classes.notLoggedInImage} src="authentication_picture.svg" />
            <div className={classes.logInText}>
              <h1>Ikke logget inn</h1>
              <p>Logg inn for å få tilgang til informasjon</p>
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.reviewInfo}>
              <h5>Antall anmeldelser: {data?.personalReviews.length}</h5>
              <h5>Antall produkter anmeldt: {uniqueProducts(data?.personalReviews as IReview[])}</h5>
              <h5>Gjenommsnittlig rating: {getAverageRating(data?.personalReviews as IReview[])}</h5>
            </div>
            <div className={classes.reviewList}>
              <ReviewList reviews={data?.personalReviews as IReview[]} error={error} user={user} />
            </div>
          </div>
        )}
      </ProfileCard>
    </div>
  );
};

const uniqueProducts = (reviews: IReview[]) => {
  // A utility function to get the amount of unique products reviewed
  const knownProducts: string[] = [];
  return reviews && reviews.length > 0
    ? reviews.filter((r: IReview) => {
        if (!knownProducts.includes(r.varenummer)) {
          knownProducts.push(r.varenummer);
          return r;
        }
      }).length
    : 0;
};

const getAverageRating = (reviews: IReview[]) => {
  // A utility function to ge the average rating of the reviews given
  return reviews && reviews.length > 0
    ? (reviews.reduce((prev, curr) => curr.rating + prev, 0) / reviews.length).toPrecision(3)
    : 0;
};

export default Profile;
