import React, { useRef } from 'react';
import { Chip, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, updateViewMode } from 'store/action';
import { AppState } from 'store/types';

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
    searchAndChip: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  const searchText: string = useSelector((state: AppState) => state.searchText);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      dispatch(setSearchText(textInput.current.value));
      dispatch(updateViewMode({ field: 'initialLoad', value: true }));

      textInput.current.value = '';
      /*Search function */
    }
  };

  const handleDelete = () => {
    dispatch(setSearchText(''));
    dispatch(updateViewMode({ field: 'initialLoad', value: true }));
  };

  return (
    <div id={'searchField'} className={classes.searchAndChip}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon aria-label="searchIcon" />
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
      {searchText === '' ? null : <Chip label={searchText} onDelete={handleDelete} color="primary" role="chip"/>}
    </div>
  );
};

export default Search;
