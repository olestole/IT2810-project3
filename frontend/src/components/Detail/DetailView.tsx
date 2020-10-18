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
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#344d51',
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
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.product.Varetype}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.product.Varenavn}
          </Typography>
          <Typography color="textSecondary">{props.product.Land}</Typography>
        </div>

        <div className="static">
          <p>Volum: </p>
          <p>Pris: </p>
          <p>Farge:</p>
          <p>Lukt:</p>
          <p>Smak: </p>
        </div>

        <div className="dynamic">
          <p>{props.product.Volum} L</p>
          <p>{props.product.Pris},- NOK</p>
          <p>{props.product.Farge}</p>
          <p>{props.product.Lukt}</p>
          <p>{props.product.Smak}</p>
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
