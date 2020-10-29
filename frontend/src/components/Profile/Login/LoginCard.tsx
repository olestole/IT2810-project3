import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from '@auth0/auth0-react';

import LoginFields from './LoginFields';
import RegistrationFields from './RegistrationFields';
import { Button } from '@material-ui/core';
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';

const useStyles = makeStyles({
  root: {
    width: '40%',
    height: '80%',
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
});

export default function LoginCard() {
  const classes = useStyles();
  const currentProduct = useSelector((state: AppState) => state.currentProduct);
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [renderRegistration, setRenderRegistration] = useState(false);

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
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
          </div>
        )}
        {/* {renderRegistration ? <RegistrationFields /> : <LoginFields />} */}
        {isAuthenticated ? (
          <div className={classes.buttonGroup}>
            <Button variant="contained" onClick={handleLogout}>
              Logg ut
            </Button>
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <Button id="loginButton" variant="contained" onClick={handleLogin}>
              Logg inn
            </Button>
          </div>
        )}
        {renderRegistration ? (
          <BackButton classes={classes} setRenderRegistration={setRenderRegistration} />
        ) : (
          <SignUp classes={classes} setRenderRegistration={setRenderRegistration} />
        )}
      </CardContent>
    </Card>
  );
}

interface ILoginFields {
  classes: any;
  setRenderRegistration: (value: boolean) => void;
}

const BackButton: React.FC<ILoginFields> = ({ classes, setRenderRegistration }) => (
  <div className={classes.registerContainer}>
    <Typography>
      <span className={classes.registerText} onClick={() => setRenderRegistration(false)}>
        Tilbake
      </span>
    </Typography>
  </div>
);

const SignUp: React.FC<ILoginFields> = ({ classes, setRenderRegistration }) => (
  <div className={classes.registerContainer}>
    <Typography>
      Ikke medlem?{' '}
      <span className={classes.registerText} onClick={() => setRenderRegistration(true)}>
        Meld deg opp her
      </span>
    </Typography>
  </div>
);
