import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '90%',
      margin: 20,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        marginTop: '50px',
        width: '80%',
      },
    },
  }),
);

export default function LoginFields() {
  const classes = useStyles();
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
      <FormControl className={classes.root}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
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
      <FormControl className={classes.root}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
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
      </FormControl>
      <div className={classes.buttonGroup}>
        <Button variant="contained">Logg inn</Button>
      </div>
    </div>
  );
}
