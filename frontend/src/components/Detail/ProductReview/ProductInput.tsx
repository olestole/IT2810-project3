import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
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
}

export const ReviewDescription: React.FC<IProductInput> = ({ description, setDescription }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Beskrivelse av produktet"
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
};

interface IReviewTitle {
  reviewTitle: string;
  setReviewTitle: (value: string) => void;
}

export const ReviewTitle: React.FC<IReviewTitle> = ({ reviewTitle, setReviewTitle }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Tittel på anmeldelse"
          variant="outlined"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
        />
      </div>
    </form>
  );
};
