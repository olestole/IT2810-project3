import React, { useEffect, useState, ClassAttributes } from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AppState, FilterOptions, ViewMode } from 'store/types';
import { useDispatch, useSelector } from 'react-redux';
import { GET_START_PRODUCTS, SEARCH_PRODUCTS, FILTER_PRODUCTS } from 'components/Overview/seachQueries';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

import { getProductType } from './ProductList/productTypes';
import {
  EnhancedTableHead,
  getComparator,
  HeaderData,
  Order,
  stableSort,
  useStyles,
} from './ProductList/EnhancedTableHead';
import { updateViewMode } from 'store/action';

const ProductListView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  const [staticMode, setStaticMode] = useState<Boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof HeaderData>('Varenavn');
  const { data, loading, error, fetchMore } = useQuery(GET_START_PRODUCTS, { variables: { index: 0 } });
  const searchText: string = useSelector((state: AppState) => state.searchText);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  let viewMode: ViewMode = useSelector((state: AppState) => state.viewMode);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleProductClick = (productId: string) => {
    history.push(`/${productId}`);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof HeaderData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filterGlobalToArray = () => {
    let filteredArray: string[] = [];
    Object.keys(filterOptions.kategorier).map((key, index) => {
      if (filterOptions.kategorier[key]) {
        filteredArray = filteredArray.concat(getProductType(key));
      }
    });
    filteredArray = filteredArray.length == 0 ? getProductType('') : filteredArray;
    return filteredArray;
  };

  let loadMore = () => {
    /*
    fetchMore basically allows you to do a new GraphQL query and merge the result into the original result.
    */
    if (viewMode.initialLoad) {
      dispatch(updateViewMode({ field: 'initialLoad', value: false }));
      fetchMore({
        variables: {
          index: 0,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...fetchMoreResult.startProducts],
          });
        },
      });
    } else {
      fetchMore({
        variables: {
          index: data.startProducts.length,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...prev.startProducts, ...fetchMoreResult.startProducts],
          });
        },
      });
    }
  };

  let searchData = (searchText: string) => {
    if (viewMode.initialSearch) {
      dispatch(updateViewMode({ field: 'initialSearch', value: false }));
      fetchMore({
        query: SEARCH_PRODUCTS,
        variables: {
          matchedString: searchText,
          searchIndex: 0,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...fetchMoreResult.searchProducts],
          });
        },
      });
    } else {
      fetchMore({
        query: SEARCH_PRODUCTS,
        variables: {
          matchedString: searchText,
          searchIndex: data.startProducts.length,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...prev.startProducts, ...fetchMoreResult.searchProducts],
          });
        },
      });
    }
  };

  let filterData = (filterArray: string[]) => {
    if (viewMode.initialFilter) {
      dispatch(updateViewMode({ field: 'initialFilter', value: false }));
      fetchMore({
        query: FILTER_PRODUCTS,
        variables: {
          filterIndex: 0,
          typer: filterArray,
          prisgt: filterOptions.minPrice,
          prisls: filterOptions.maxPrice,
          volumgt: filterOptions.minVolum,
          volumls: filterOptions.maxVolum,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...fetchMoreResult.filterProducts],
          });
        },
      });
    } else {
      fetchMore({
        query: FILTER_PRODUCTS,
        variables: {
          filterIndex: data.startProducts.length,
          typer: filterArray,
          prisgt: filterOptions.minPrice,
          prisls: filterOptions.maxPrice,
          volumgt: filterOptions.minVolum,
          volumls: filterOptions.maxVolum,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            startProducts: [...prev.startProducts, ...fetchMoreResult.filterProducts],
          });
        },
      });
    }
  };

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
      isFetching ||
      history.location.pathname !== '/'
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching || staticMode) return;
    if (viewMode.filterDisplay == 'startMode') {
      loadMore();
    } else if (viewMode.filterDisplay == 'searchMode') {
      searchData(searchText);
    } else if (viewMode.filterDisplay == 'filterMode' && !viewMode.initialFilter) {
      let filterList = filterGlobalToArray();
      filterData(filterList);
    }
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    if (searchText == '') {
      return;
    }
    searchData(searchText);
  }, [searchText]);

  useEffect(() => {
    if (viewMode.filterDisplay !== 'filterMode') {
      return;
    }
    let filterList = filterGlobalToArray();
    filterData(filterList);
  }, [filterOptions]);

  useEffect(() => {
    if (!viewMode.initialLoad) {
      return;
    }
    loadMore();
  }, [viewMode.initialLoad]);

  if (loading) return <LoadingIndicator />;
  if (error) return <h1>ERROR</h1>;

  if (data && data.startProducts) {
    console.log('D: ', data.startProducts);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.startProducts.length}
            />
            <TableBody>
              {stableSort(data.startProducts, getComparator(order, orderBy)).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={row.Varenummer} onClick={() => handleProductClick(row.Varenummer)}>
                    <TableCell component="th" id={labelId} padding="default" align="left">
                      {row.Varenavn}
                    </TableCell>
                    <TableCell align="right">{row.Varetype}</TableCell>
                    <TableCell align="right" className={classes.volum}>
                      {row.Volum}
                    </TableCell>
                    <TableCell align="right" className={classes.pris}>
                      {row.Pris}
                    </TableCell>
                    <TableCell align="right" className={classes.produsent}>
                      {row.Produsent}{' '}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ProductListView;
