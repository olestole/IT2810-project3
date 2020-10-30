import { ApolloError } from '@apollo/client';
import { createStyles, List, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppState } from 'store/types';
import { IReview } from 'types/globalTypes';
import DefaultItem from './DefaultItem';
import ReviewItem from './ReviewItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // width: '500px',
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
      // position: 'relative',
      // overflow: 'auto',
      // maxHeight: '200px',
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
  const addedReview = useSelector((state: AppState) => state.addedReview);

  const renderReviews = () => {
    if (!user && location.pathname.substring(1) === 'profile') {
      return <DefaultItem title={'Not logged in'} description={'Log in to see your review stats'} />;
    } else if (error) {
      return <DefaultItem title={'Something wrong happened'} description={'Try to refresh the page'} />;
    } else if (reviews.length > 0 || addedReview) {
      if (addedReview) {
        return reviews.concat(addedReview).map((review: IReview | null, index: number) => {
          if (review !== null) {
            return <ReviewItem key={index} review={review} />;
          }
        });
      } else {
        return reviews.map((review: IReview | null, index: number) => {
          if (review !== null) {
            return <ReviewItem key={index} review={review} />;
          }
        });
      }
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
