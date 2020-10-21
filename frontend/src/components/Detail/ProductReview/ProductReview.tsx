import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import ReviewModal from './ReviewModal';
import { ProductRating } from './ProductRating';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import { ProductInput } from './ProductInput';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      margin: 20,
    },
  }),
);

const ProductReview = () => {
  const currentProduct = useSelector((state: AppState) => state.currentProduct);

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  return (
    <div>
      <ReviewModal>
        <h1>{currentProduct!.Varenavn}</h1>
        <ProductRating rating={rating} setRating={setRating} />
        <ProductInput description={description} setDescription={setDescription} />
        <Button variant="contained" color="primary">
          Lagre anmeldelse
        </Button>
      </ReviewModal>
    </div>
  );
};

export default ProductReview;
