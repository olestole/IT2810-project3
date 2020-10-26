import { useQuery } from '@apollo/client';
import { createStyles, List, makeStyles } from '@material-ui/core';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { GET_REVIEWS } from 'graphql/queries';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { IReview } from 'types/globalTypes';
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
      width: '100%',
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
  }),
);

const ReviewList = () => {
  const classes = useStyles();

  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { reviewsVarenummer: currentProduct?.Varenummer },
    fetchPolicy: 'network-only',
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <h1>ERROR</h1>;
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <List className={classes.root}>
        {data.reviews.map((review: IReview, index: number) => (
          <ReviewItem key={index} review={review} />
        ))}
      </List>
    </div>
  );
};

export default ReviewList;
