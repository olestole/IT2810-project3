import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    rating: {
      border: (showError) => showError && '1px solid red',
      borderRadius: 5,
      flexGrow: 1,
      '& > * > * > *': {
        width: 50,
        height: 50,
        margin: 5,
      },
    },
    ratingContainer: {
      margin: 'auto',
    },
  }),
);

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface IRating {
  rating: number;
  setRating: (value: number) => void;
  inputError: boolean;
}

export const ProductRating: React.FC<IRating> = ({ rating, setRating, inputError }) => {
  const showError = () => inputError && rating == 0;
  const classes = useStyles(showError());

  return (
    <div className={classes.ratingContainer}>
      <Box component="fieldset" borderColor="transparent">
        <Rating
          className={classes.rating}
          name="customized-icons"
          defaultValue={2}
          value={rating}
          onChange={(e, value) => setRating(value!)}
          getLabelText={(value: number) => customIcons[value].label}
          IconContainerComponent={IconContainer}
          size="large"
        />
      </Box>
    </div>
  );
};
