import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from '@auth0/auth0-react';

import LoginFields from './LoginFields';
import RegistrationFields from './RegistrationFields';

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
});

export default function LoginCard() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [renderRegistration, setRenderRegistration] = useState(false);

  console.log(isAuthenticated && user);
  const getToken = async () => {
    if (isAuthenticated) {
      console.log(await getAccessTokenSilently());
    }
  };

  getToken();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
        {renderRegistration ? <RegistrationFields /> : <LoginFields />}
        {renderRegistration ? (
          <div className={classes.registerContainer}>
            <Typography>
              <span className={classes.registerText} onClick={() => setRenderRegistration(false)}>
                Tilbake
              </span>
            </Typography>
          </div>
        ) : (
          <div className={classes.registerContainer}>
            <Typography>
              Ikke medlem?{' '}
              <span className={classes.registerText} onClick={() => setRenderRegistration(true)}>
                Meld deg opp her
              </span>
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
