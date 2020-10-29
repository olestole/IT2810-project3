import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

export interface HeaderData {
  Varetype: string;
  Volum: number;
  Pris: number;
  Varenavn: string;
  Varenummer: string;
  Produsent: string;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {},
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
    produsent: {
      [theme.breakpoints.down(960)]: {
        display: 'none',
      },
    },
    pris: {
      [theme.breakpoints.down(750)]: {
        display: 'none',
      },
    },
    volum: {
      [theme.breakpoints.down(500)]: {
        display: 'none',
      },
    },
  }),
);

interface HeadCell {
  id: keyof HeaderData;
  label: string;
  numeric: boolean;
  classes: string;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HeaderData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof HeaderData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const headCells: HeadCell[] = [
    { id: 'Varenavn', numeric: false, label: 'Varenavn', classes: classes.table },
    { id: 'Varetype', numeric: false, label: 'Varetype', classes: classes.table },
    { id: 'Volum', numeric: true, label: 'Volum', classes: classes.volum },
    { id: 'Pris', numeric: true, label: 'Pris', classes: classes.pris },
    { id: 'Produsent', numeric: false, label: 'Produsent', classes: classes.produsent },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.classes}
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
