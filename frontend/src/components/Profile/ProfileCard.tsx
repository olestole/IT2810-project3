import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@material-ui/core';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
      height: '100%',
      overflow: 'auto',
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
        background: 'var(--primary)',
        color: '#fff',
        width: '100%',
      },
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    reviews: {
      alignSelf: 'center',
      marginBottom: 20,
      maxWidth: '100%',
      flex: '1 1 500px',
      '& > *': {
        overflow: 'hidden',
        [theme.breakpoints.down(990)]: {
          height: '40vh',
        },
      },
    },
    userInfo: {
      margin: 'auto',
      textAlign: 'center',
      flex: '1 1 200px',
    },
  }),
);

const ProfileCard: React.FC = ({ children }) => {
  const classes = useStyles();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = () => {
    // Save the current product to sessionStorage so that it can be retrieved after the callback
    sessionStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    sessionStorage.setItem('loggedIn', JSON.stringify(true));
    loginWithRedirect({
      redirectUri: 'http://localhost:3000/callback',
    });
  };

  const handleLogout = () => {
    // Always return to the profile-page after logout
    sessionStorage.setItem('currentProduct', JSON.stringify(null));
    sessionStorage.setItem('loggedIn', JSON.stringify(false));
    logout({
      returnTo: 'http://localhost:3000/callback',
    });
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.grid}>
          {isAuthenticated && (
            <div className={classes.userInfo}>
              <img src={user.picture} alt={user.name} />
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
            </div>
          )}
          <div className={classes.reviews}>{children}</div>
        </div>
        {
          <div className={classes.buttonGroup}>
            {isAuthenticated ? (
              <Button variant="contained" onClick={handleLogout} id="logOutButton">
                Logg ut
              </Button>
            ) : (
              <Button id="loginButton" variant="contained" onClick={handleLogin}>
                Logg inn
              </Button>
            )}
          </div>
        }
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
