import classes from '*.module.css';
import { Card, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { IReview } from 'types/globalTypes';

import { customIcons } from './ProductRating';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: 7,
      padding: 10,

      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textInfo: {
      margin: 0,
      padding: 0,
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      margin: 0,
      marginBottom: 5,
      padding: 0,
    },
    icon: {
      color: 'gold',
      margin: 0,
      '& > *': {
        width: 30,
        height: 30,
      },
    },
    ratingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0,
    },
  }),
);

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.ratingContainer}>
        <span className={classes.icon}>{customIcons[review.rating].icon}</span>
        <span>{`${review.rating}/5`}</span>
      </div>
      <div className={classes.textInfo}>
        <h3 className={classes.header}>{review.title}</h3>
        <span>{review.description}</span>
      </div>
    </Card>
  );
};

// const RatingIcon = ({rating}: number) => {

// }

export default ReviewItem;
