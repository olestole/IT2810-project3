import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import RememberLogin from './RememberLogin';

import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputFields: {
      flexGrow: 1,
      width: '100%',
      paddingBottom: 50,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        marginTop: '50px',
        width: '100%',
      },
    },
  }),
);

export default function LoginFields() {
  const classes = useStyles();
  const { logout, loginWithRedirect } = useAuth0();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  return (
    <div>
      <FormControl className={classes.inputFields}>
        <InputLabel htmlFor="input-with-icon-adornment">Brukernavn</InputLabel>
        <Input
          value={username}
          onChange={handleInputChange}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleOutlinedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.inputFields}>
        <InputLabel htmlFor="input-with-icon-adornment">Passord</InputLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <LockOpenOutlinedIcon />
            </InputAdornment>
          }
        />
        <RememberLogin />
      </FormControl>
      <div className={classes.buttonGroup}>
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Logg inn
        </Button>
      </div>
      <div className={classes.buttonGroup}>
        <Button variant="contained" onClick={() => logout({ returnTo: window.location.origin })}>
          Logg ut
        </Button>
      </div>
    </div>
  );
}
