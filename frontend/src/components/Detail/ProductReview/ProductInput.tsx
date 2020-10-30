import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
  }),
);

interface IProductInput {
  description: string;
  setDescription: (value: string) => void;
  inputError: boolean;
}

export const ReviewDescription: React.FC<IProductInput> = ({ description, setDescription, inputError }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div id="reviewProductText">
        <TextField
          id="outlined-multiline-static"
          label="Beskrivelse av produktet"
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={inputError && !description}
        />
      </div>
    </form>
  );
};

interface IReviewTitle {
  reviewTitle: string;
  setReviewTitle: (value: string) => void;
  inputError: boolean;
}

export const ReviewTitle: React.FC<IReviewTitle> = ({ reviewTitle, setReviewTitle, inputError }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div id="reviewHeaderText">
        <TextField
          id="outlined-multiline-static"
          label="Tittel på anmeldelse"
          variant="outlined"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          error={inputError && !reviewTitle}
        />
      </div>
    </form>
  );
};
