import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/types';
import ReviewModal from './ReviewModal';
import { ProductRating } from './ProductRating';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import { ReviewDescription, ReviewTitle } from './ProductInput';
import { toast } from 'react-toastify';
import { setAddedReview, setModalOpen } from 'store/action';
import { ADD_REVIEW } from 'graphql/mutations';
import { useMutation } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { InputReview } from '../../../../__generated__/globalTypes';
import { AddReviewMutation } from 'graphql/__generated__/AddReviewMutation';

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
      backgroundColor: 'var(--primary)',
    },
  }),
);

const ProductReview = () => {
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addReview] = useMutation<AddReviewMutation>(ADD_REVIEW);
  const { user } = useAuth0();

  const [inputError, setInputError] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  const submitReview = async () => {
    const review = {
      userEmail: user.email,
      varenummer: currentProduct!.Varenummer,
      title: reviewTitle,
      description: description,
      rating: rating,
    } as InputReview;

    await addReview({
      variables: { addReviewReview: review },
    });

    // Don't wait for the data from useMutation when we already have it locally
    dispatch(setAddedReview(review));
  };

  const handleSubmitReview = async () => {
    // If any of the fields haven't been filled out
    if (!currentProduct) {
      toast.error(`Produktet ser ikke ut til å ha lastet korrekt, forsøk pånytt`);
      return;
    }
    if (!(rating >= 1 && rating <= 5 && description !== '' && reviewTitle !== '')) {
      toast.error(`Husk å fylle ut alle feltene 👮🏽‍♀`);
      setInputError(true);
    } else {
      await submitReview();
      toast.success('Anmeldelsen er registrert🦄');
      dispatch(setModalOpen(false));

      setRating(0);
      setDescription('');
      setReviewTitle('');
      setInputError(false);
    }
  };

  return (
    <div>
      <ReviewModal>
        <div className={classes.headerLine}>
          <ReviewTitle reviewTitle={reviewTitle} setReviewTitle={setReviewTitle} inputError={inputError} />
          <ProductRating rating={rating} setRating={setRating} inputError={inputError} />
        </div>
        <ReviewDescription description={description} setDescription={setDescription} inputError={inputError} />
        <Button
          id="saveReviewButton"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmitReview}
        >
          Lagre anmeldelse
        </Button>
      </ReviewModal>
    </div>
  );
};

export default ProductReview;
