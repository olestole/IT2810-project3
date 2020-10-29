import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@material-ui/core';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 30,
    height: '80%',
  },
  registerText: {
    borderBottom: '1px solid black',
  },
  registerContainer: {
    justifySelf: 'flex-end',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: '50px',
      width: '100%',
    },
  },
  flexColumn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  reviews: {
    maxWidth: '70%',
  },
  userInfo: {
    margin: 'auto',
  },
});

const ProfileCard: React.FC = ({ children }) => {
  const classes = useStyles();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const handleLogin = () => {
    // Save the current product to sessionStorage so that it can be retrieved after the callback
    sessionStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    loginWithRedirect({
      redirectUri: 'http://localhost:3000/callback',
    });
  };

  const handleLogout = () => {
    logout({
      returnTo: 'http://localhost:3000/callback',
    });
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.flexColumn}>
          {isAuthenticated && (
            <div className={classes.userInfo}>
              <img src={user.picture} alt={user.name} />
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
            </div>
          )}
          <div className={classes.reviews}>{children}</div>
        </div>
        {isAuthenticated ? (
          <div className={classes.buttonGroup}>
            <Button variant="contained" onClick={handleLogout}>
              Logg ut
            </Button>
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <Button variant="contained" onClick={handleLogin}>
              Logg inn
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
