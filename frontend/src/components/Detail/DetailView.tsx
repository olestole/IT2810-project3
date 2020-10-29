import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAddedReview, setCurrentProduct, setModalOpen } from 'store/action';
import { useAuth0 } from '@auth0/auth0-react';
import { IReview, Product } from 'types/globalTypes';
import { AppState } from 'store/types';

import './detail.css';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { ReviewList } from 'components/Shared';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from 'graphql/queries';
import { GetReviewsQuery } from 'graphql/__generated__/GetReviewsQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      background: 'var(--primary)',
      color: '#DCF2EB',
      size: 'small',
    },
    titleVaretype: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    titleVarenavn: {
      color: '#344d51',
      fontWeight: 'bold',
    },
    reviewList: {
      maxHeight: '35vh',
      overflow: 'auto',
    },
  }),
);

const baseURL = 'https://bilder.vinmonopolet.no/cache/800x800-0/';

const DetailView = () => {
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const [loadingImage, setLoadingImage] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  const { data, loading, error } = useQuery<GetReviewsQuery>(GET_REVIEWS, {
    variables: { reviewsVarenummer: currentProduct?.Varenummer },
    fetchPolicy: 'network-only',
  });

  if (!currentProduct) return <LoadingIndicator />;
  const url = baseURL + currentProduct.Varenummer + '-1.jpg';

  const handleBackClick = () => {
    dispatch(setCurrentProduct(null));
    dispatch(setAddedReview(null));
    history.push('/');
  };

  return loading ? (
    <LoadingIndicator />
  ) : (
    <div className="detailcontainer">
      <div className="image">
        <img src={url} onLoad={() => setLoadingImage(false)} />
      </div>

      <div className="info">
        <div className="headline">
          <Typography className={classes.titleVaretype} color="textSecondary" gutterBottom>
            {currentProduct.Varetype}
          </Typography>
          <Typography className={classes.titleVarenavn} variant="h5" component="h2">
            {currentProduct.Varenavn}
          </Typography>
          <Typography color="textSecondary">{currentProduct.Land}</Typography>
        </div>

        <ProductInfo currentProduct={currentProduct} />

        <div className="back">
          <Button
            variant="contained"
            onClick={handleBackClick}
            className={classes.button}
            startIcon={<ArrowBackIcon />}
          >
            Tilbake
          </Button>
          {isAuthenticated ? (
            <Button
              id="reviewProductButton"
              variant="contained"
              onClick={() => dispatch(setModalOpen(true))}
              className={classes.button}
              // startIcon={<ArrowBackIcon />}
            >
              Anmeld produkt
            </Button>
          ) : (
            <Button
              id="loginForReviewButton"
              variant="contained"
              onClick={() => history.push('/profile')}
              className={classes.button}
            >
              Logg inn for å anmelde produkt
            </Button>
          )}
        </div>
        <div className={classes.reviewList}>
          {loading ? <LoadingIndicator /> : <ReviewList reviews={data ? (data.reviews as IReview[]) : []} />}
        </div>
      </div>
    </div>
  );
};

interface IProductInfo {
  currentProduct: Product;
}

const ProductInfo = ({ currentProduct }: IProductInfo) => {
  return (
    <div className="text">
      <p>
        Volum: <span>{currentProduct.Volum} L</span>
      </p>
      <p>
        Pris: <span>{currentProduct.Pris},- NOK</span>
      </p>
      <p>
        Farge: <span>{currentProduct.Farge}</span>
      </p>
      <p>
        Lukt: <span>{currentProduct.Lukt}</span>
      </p>
      <p>
        Smak: <span>{currentProduct.Smak}</span>
      </p>
      <p>
        Produsent: <span>{currentProduct.Produsent}</span>
      </p>
    </div>
  );
};
export default DetailView;
