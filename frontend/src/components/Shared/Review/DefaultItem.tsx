import { Card, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { IReview } from 'types/globalTypes';
import { customIcons } from '../../Detail/ProductReview/ProductRating';

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

interface IDefaultItem {
  title: string;
  description: string;
}

const DefaultItem: React.FC<IDefaultItem> = ({ title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.textInfo}>
        <h3 className={classes.header}>{title}</h3>
        <span>{description}</span>
      </div>
    </Card>
  );
};

export default DefaultItem;
