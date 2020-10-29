import { ApolloError, useQuery } from '@apollo/client';
import { createStyles, List, makeStyles } from '@material-ui/core';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { GET_PERSONAL_REVIEWS, GET_REVIEWS } from 'graphql/queries';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppState } from 'store/types';
import { IReview } from 'types/globalTypes';
import DefaultItem from './DefaultItem';
import ReviewItem from './ReviewItem';

// const data = {
//   reviews: [
//     {
//       description: 'Superfin',
//       rating: 1,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//     {
//       description: 'Superfin',
//       rating: 5,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//     {
//       description: 'Superfin',
//       rating: 5,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//     {
//       description: 'Superfin',
//       rating: 5,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//     {
//       description: 'Superfin',
//       rating: 5,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//     {
//       description:
//         'Sed laoreet libero purus, vitae maximus ligula fermentum consequat. Aenean eget ultrices diam. In hac habitasse platea dictumst. Proin accumsan mollis magna ac mattis. Fusce eu mi consectetur, cursus est vitae, aliquam urna. Donec ac turpis consequat, cursus velit ac, vestibulum nunc. Ut dui turpis, volutpat eget congue vel, vulputate eget neque. In vulputate lectus id pellentesque posuere. Duis quis fermentum odio. Vivamus ultrices magna eu justo mollis feugiat.',
//       rating: 3,
//       title: 'Elsker denne!',
//       userEmail: 'oleastole@gmail.com',
//       varenummer: '407',
//       __typename: 'OutputReview',
//     },
//   ],
// };

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // width: '500px',
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
      // position: 'relative',
      // overflow: 'auto',
      // maxHeight: 'stretch',
    },
  }),
);

interface IReviewList {
  reviews: IReview[];
  error?: ApolloError | null | undefined;
  user?: any;
}

const ReviewList: React.FC<IReviewList> = ({ reviews, error, user }) => {
  const classes = useStyles();
  const location = useLocation();

  const renderReviews = () => {
    if (!user && location.pathname.substring(1) === 'profile') {
      return <DefaultItem title={'Not logged in'} description={'Log in to see your review stats'} />;
    } else if (error) {
      return <DefaultItem title={'Something wrong happened'} description={'Try to refresh the page'} />;
    } else if (reviews.length > 0) {
      return reviews.map((review: IReview | null, index: number) => {
        if (review !== null) {
          return <ReviewItem key={index} review={review} />;
        }
      });
    } else if (reviews.length === 0) {
      return location.pathname.substring(1) === 'profile' ? (
        <DefaultItem title={'Ingen produktanmeldelser'} description={'Du har ikke anmeldt noen produkter enda'} />
      ) : (
        <DefaultItem
          title={'Ingen produktanmeldelser'}
          description={'Dette produktet har ikke blitt anmeldt enda - vær den første!'}
        />
      );
    }
  };

  return <List className={classes.root}>{renderReviews()}</List>;
};

export default ReviewList;
