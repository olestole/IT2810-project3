import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/types';
import ReviewModal from './ReviewModal';
import { ProductRating } from './ProductRating';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import { ReviewDescription, ReviewTitle } from './ProductInput';

import { toast } from 'react-toastify';
import { setModalOpen } from 'store/action';

const useStyles = makeStyles(() =>
  createStyles({
    headerLine: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 10,
      padding: 0,
    },
    button: {
      width: '100%',
      marginTop: 10,
    },
  }),
);

const ProductReview = () => {
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  return (
    <div>
      <ReviewModal>
        <div className={classes.headerLine}>
          <ReviewTitle reviewTitle={reviewTitle} setReviewTitle={setReviewTitle} />
          <ProductRating rating={rating} setRating={setRating} />
        </div>
        <ReviewDescription description={description} setDescription={setDescription} />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={async () => {
            toast.success('Anmeldelsen er registrert🦄');
            // setTimeout(() => {}, 700);
            // TODO: Send the request to the backend here
            dispatch(setModalOpen(false));
          }}
        >
          Lagre anmeldelse
        </Button>
      </ReviewModal>
    </div>
  );
};

export default ProductReview;
