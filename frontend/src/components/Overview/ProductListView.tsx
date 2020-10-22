import React, {useEffect, useState} from 'react';
import { useQuery, InMemoryCache } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AppState, FilterOptions, Kategorier } from 'store/types';
import { useSelector } from 'react-redux';
import { GET_START_PRODUCTS, SEARCH_PRODUCTS, FILTER_PRODUCTS } from 'components/Overview/seachQueries'

let brennevin = ["Akevitt", "Vodka", "Druebrennevin", "Whisky", "Genever", "Gin", "Bitter", "Fruktbrennevin", "Brennevin, annet", "Rom", "Sake", "Brennevin, nøytralt < 37,5 %", "Likør"]
let annet = ["Spesial", "Mjød", "Sider"]
let alkoholfritt = ["Alkoholfri musserende drikk", "Alkoholfri most", "Alkoholfri leskedrikk", "Alkoholfri vin", "Alkoholfritt øl", "Alkoholfritt, øvrig"]
let ol = ["Klosterstil", "Red/amber", "Scotch ale", "Porter & stout", "Saison farmhouse ale", "Hveteøl", "Pale ale", "Mørk lager", "Lys lager" , "Brown ale", "India pale ale", "Lys ale", "Surøl"]
let annen_vin = [ "Aromatisert vin", "Perlende vin, rosé", "Rosévin", "Perlende vin, rød", "Perlende vin, hvit", "Barley wine", "Fruktvin", "Madeira"]
let sterk_vin = ["Sherry", "Portvin", "Vermut", "Sterkvin, annen"]
let musserende_vin = ["Champagne, brut", "Musserende vin, rosé", "Champagne, rosé", "Champagne extra brut", "Champagne, sec", "Champagne, annen"]

interface HeaderData {
  Varetype: string;
  Volum: string;
  Pris: string;
  Varenavn: string;
  Varenummer: string;
  Produsent: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof HeaderData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'Varenavn', numeric: false, label: 'Varenavn' },
  { id: 'Varetype', numeric: true, label: 'Varetype' },
  { id: 'Volum', numeric: true, label: 'Volum' },
  { id: 'Pris', numeric: true, label: 'Pris' },
  { id: 'Produsent', numeric: true, label: 'Produsent' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HeaderData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof HeaderData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const getProductType = (product: string) => {
  switch(product) {
    case 'rodvin': { 
      return ['Rødvin'] 
   } 
   case 'hvitvin': { 
      return ['Hvitvin']
   } 
  case 'musserende_vin': { 
    return musserende_vin
  } 
  case 'sterk_vin': { 
    return sterk_vin
  } 
  case 'annen_vin': { 
    return annen_vin
  } 
  case 'ol': { 
    return ol
  } 
  case 'brennevin': {
    return brennevin;
  }
  case 'alkoholfritt': { 
    return alkoholfritt
  } 
  case 'annet': { 
    return annet
  } 
  default: { 
    return ["Rødvin", "Hvitvin"].concat(musserende_vin, sterk_vin, annen_vin, ol, brennevin, alkoholfritt, annet);
   } 
  }
}

const ProductListView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  const [staticMode, setStaticMode] = useState<Boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof HeaderData>('Varenavn');
  const { data, loading, error, fetchMore } =  useQuery(GET_START_PRODUCTS, { variables: { index: 0}});
  const searchText: string = useSelector((state: AppState) => state.searchText);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);


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
    let filteredArray: string[] = []
    console.log("FilterArray: ", filteredArray)
    Object.keys(filterOptions.kategorier).map((key, index) => {
      if(filterOptions.kategorier[key]) {
        filteredArray = filteredArray.concat(getProductType(key))
      }
    });
    filteredArray = filteredArray.length == 0 ? getProductType(""): filteredArray;
    console.log("CORRECT: ", filteredArray)
    return filteredArray;
  }
  
  let searchData = (searchText: string) => {
    fetchMore({
      query: SEARCH_PRODUCTS,
      variables: {
        matchedString: searchText
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          startProducts: [...fetchMoreResult.searchProducts]
        });
      }
    });
    setStaticMode(true);
  }

  let loadMore = () => {
    /*
    fetchMore basically allows you to do a new GraphQL query and merge the result into the original result.
    */
    fetchMore({
      variables: {
        index: data.startProducts.length
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          startProducts: [...prev.startProducts, ...fetchMoreResult.startProducts]
        });
      }
    })
  }

  let filterData = (filterArray: string[]) => {
    fetchMore({
      query: FILTER_PRODUCTS,
      variables: {
        typer: filterArray,
        prisgt: filterOptions.minPrice, 
        prisls: filterOptions.maxPrice, 
        volumgt: filterOptions.minVolum, 
        volumls: filterOptions.maxVolum,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          startProducts: [...fetchMoreResult.filterProducts]
        });
      }
    });
    setStaticMode(true);
  }

  const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
      return;
    setIsFetching(true);
	};
  
  useEffect(() => {
		if (!isFetching || staticMode) return;
    loadMore();
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    if (searchText == "") {
      return ;
    }
    else {
      searchData(searchText)
    }
  }, [searchText]);

  useEffect(() => {
    console.log("CHANGING")
    if (filterOptions.filterMode === false) {
      return ;
    }
    else {
      let filterList = filterGlobalToArray();
      console.log(filterOptions)
      filterData(filterList)
    }
  }, [filterOptions])
  
  if (loading) return <p>Loading ...</p>;
  
  if (data && data.startProducts) {
    console.log("D: ", data.startProducts);
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
              {stableSort(data.startProducts, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.Varenummer} onClick={() => handleProductClick(row.Varenummer)}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {row.Varenavn}
                      </TableCell>
                      <TableCell align="right">{row.Varetype}</TableCell>
                      <TableCell align="right">{row.Volum}</TableCell>
                      <TableCell align="right">{row.Pris}</TableCell>
                      <TableCell align="right">{row.Produsent}</TableCell>
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
