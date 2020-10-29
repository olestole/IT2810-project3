import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputFields: {
      flexGrow: 1,
      width: '100%',
      paddingBottom: 50,
    },
    passwordFields: {
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

export default function RegistrationFields() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redoPassword, setRedoPassword] = useState('');

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleRedoPasswordChange = (e: any) => {
    e.preventDefault();
    setRedoPassword(e.target.value);
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const showPasswordError = () => password !== '' && password.length! < 8;
  const showPasswordRedoError = () => password !== null && redoPassword !== null && password !== redoPassword;

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
      <FormControl className={classes.passwordFields}>
        <InputLabel htmlFor="input-with-icon-adornment">Nytt passord</InputLabel>
        <Input
          error={showPasswordError()}
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
      </FormControl>
      <FormControl className={classes.passwordFields}>
        <InputLabel htmlFor="input-with-icon-adornment">Gjenta passord</InputLabel>
        <Input
          error={showPasswordRedoError()}
          type="password"
          value={redoPassword}
          onChange={handleRedoPasswordChange}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <LockOpenOutlinedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={classes.buttonGroup}>
        <Button variant="contained">Registrer bruker</Button>
      </div>
    </div>
  );
}
