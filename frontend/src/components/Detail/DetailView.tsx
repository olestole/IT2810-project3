import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme, withTheme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import './detail.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      background: '#002025',
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
  }),
);

const baseURL = 'https://bilder.vinmonopolet.no/cache/800x800-0/';

const DetailView = (props: any) => {
  const history = useHistory();
  const classes = useStyles();
  const url = baseURL + props.product.Varenummer + '-1.jpg';

  console.log(props.product);

  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <div className="container">
      <div className="image">
        <img src={url}></img>
      </div>

      <div className="info">
        <div className="headline">
          <Typography className={classes.titleVaretype} color="textSecondary" gutterBottom>
            {props.product.Varetype}
          </Typography>
          <Typography className={classes.titleVarenavn} variant="h5" component="h2">
            {props.product.Varenavn}
          </Typography>
          <Typography color="textSecondary">{props.product.Land}</Typography>
        </div>

        <div className="text">
          <p>
            Volum: <span>{props.product.Volum} L</span>
          </p>
          <p>
            Pris: <span>{props.product.Pris},- NOK</span>
          </p>
          <p>
            Farge: <span>{props.product.Farge}</span>
          </p>
          <p>
            Lukt: <span>{props.product.Lukt}</span>
          </p>
          <p>
            Smak: <span>{props.product.Smak}</span>
          </p>
          <p>
            Produsent: <span>{props.product.Produsent}</span>
          </p>
        </div>

        <div className="back">
          <Button
            variant="contained"
            onClick={handleBackClick}
            className={classes.button}
            startIcon={<ArrowBackIcon />}
          >
            Tilbake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
