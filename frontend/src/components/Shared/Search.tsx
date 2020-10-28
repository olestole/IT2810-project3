import React, { useRef } from 'react';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setSearchText, updateFilterDisplay, updateViewMode } from 'store/action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      margin: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

const Search = () => {
  const classes = useStyles();
  let textInput = useRef<any>(null); // Think type is HTMLDivElement but does not work
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      dispatch(setSearchText(textInput.current.value));
      dispatch(updateViewMode({ field: 'initialSearch', value: true }));
      dispatch(updateFilterDisplay('searchMode'));

      textInput.current.value = '';
      /*Search function */
    }
  };

  return (
    <div id={'searchField'} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        id={'searchInputField'}
        placeholder="Produkt…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={(e) => handleKeyDown(e)}
        inputRef={textInput}
      />
    </div>
  );
};

export default Search;
