import {
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ViewAgenda } from '@material-ui/icons';
import AttachMoney from '@material-ui/icons/AttachMoney';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import LocalDrink from '@material-ui/icons/LocalDrink';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter, filterVolumAndPrice, setFilterMode, updateFilterDisplay, updateViewMode } from 'store/action';
import { AppState, FilterOptions } from 'store/types';
import './sidebar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#D95459',
    },
    formGroup: {
      width: drawerWidth,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'auto',
      position: 'relative',
    },
  }),
);

let Sidebar = () => {
  const classes = useStyles();
  const [volumRange, setVolumeRange] = React.useState<number[]>([0, 6]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 50000]);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [openVolume, setOpenVolume] = React.useState<boolean>(false);
  const [openPrice, setOpenPrice] = React.useState<boolean>(false);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const dispatch = useDispatch();

  /*
  Not working with changing value, only changes the first time

  const createCheckOption = (label: string, type: string) => {
    return(
      <FormControlLabel 
              control={<Checkbox color="primary" />}
              label={label}
              labelPlacement="start"
              onChange={() => {dispatch(filter({field: type, value: !filterOptions.kategorier.type}))}}
              />
    )
  };
  */

  let setFilteringMode = () => {
    dispatch(updateFilterDisplay('filterMode'));
    dispatch(updateViewMode({ field: 'initialFilter', value: true }));
  };

  let handleClick = (func: any, openValue: boolean) => {
    func(!openValue);
  };

  const changePriceRange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setFilteringMode();
    dispatch(filterVolumAndPrice({ field: 'minPrice', value: (newValue as number[])[0] }));
    dispatch(filterVolumAndPrice({ field: 'maxPrice', value: (newValue as number[])[1] }));
  };

  const handleLocalPriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const changeVolumeRange = (event: any, newValue: number | number[]) => {
    setFilteringMode();
    dispatch(filterVolumAndPrice({ field: 'minVolum', value: (newValue as number[])[0] }));
    dispatch(filterVolumAndPrice({ field: 'maxVolum', value: (newValue as number[])[1] }));
  };

  const handleLocalVolumeChange = (event: any, newValue: number | number[]) => {
    setVolumeRange(newValue as number[]);
  };

  return (
    <div className="sidebar">
      <List component="nav" className={classes.appMenu} disablePadding>
        <ListItem
          id={'kategoriId'}
          button
          className={classes.menuItem}
          onClick={() => handleClick(setOpenCategory, openCategory)}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="Kategori" />
          {openCategory ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <Divider />
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              checked={filterOptions.kategorier.rodvin}
              control={<Checkbox color="primary" />}
              label={'Rødvin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'rodvin', value: !filterOptions.kategorier.rodvin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.hvitvin}
              control={<Checkbox color="primary" />}
              label={'Hvitvin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'hvitvin', value: !filterOptions.kategorier.hvitvin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.musserende_vin}
              control={<Checkbox color="primary" />}
              label={'Musserende Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'musserende_vin', value: !filterOptions.kategorier.musserende_vin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.sterk_vin}
              control={<Checkbox color="primary" />}
              label={'Sterk Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'sterk_vin', value: !filterOptions.kategorier.sterk_vin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.annen_vin}
              control={<Checkbox color="primary" />}
              label={'Annen Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'annen_vin', value: !filterOptions.kategorier.annen_vin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.ol}
              control={<Checkbox color="primary" />}
              label={'Øl'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'ol', value: !filterOptions.kategorier.ol }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.brennevin}
              control={<Checkbox color="primary" />}
              label={'Brennevin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'brennevin', value: !filterOptions.kategorier.brennevin }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.alkoholfritt}
              control={<Checkbox color="primary" />}
              label={'Alkoholfritt'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'alkoholfritt', value: !filterOptions.kategorier.alkoholfritt }));
                setFilteringMode();
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.annet}
              control={<Checkbox color="primary" />}
              label={'Annet'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'annet', value: !filterOptions.kategorier.annet }));
                setFilteringMode();
              }}
            />
          </FormGroup>
        </Collapse>

        <ListItem button className={classes.menuItem} onClick={() => handleClick(setOpenVolume, openVolume)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <LocalDrink />
          </ListItemIcon>
          <ListItemText primary="Volum" />
          {openVolume ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={openVolume} timeout="auto" unmountOnExit>
          <Divider />
          <FormGroup className={classes.formGroup}>
            <Typography id="range-slider" gutterBottom>
              Volume (L)
            </Typography>
            <Slider
              min={0}
              max={6}
              step={0.1}
              value={volumRange}
              onChange={handleLocalVolumeChange}
              onChangeCommitted={changeVolumeRange}
              valueLabelDisplay="auto"
            />
          </FormGroup>
        </Collapse>

        <ListItem button className={classes.menuItem} onClick={() => handleClick(setOpenPrice, openPrice)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Pris" />
          {openPrice ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={openPrice} timeout="auto" unmountOnExit>
          <Divider />
          <FormGroup className={classes.formGroup}>
            <Typography id="price-slider" gutterBottom>
              Price range (kr)
            </Typography>
            <Slider
              min={0}
              max={50000}
              step={50}
              value={priceRange}
              onChange={handleLocalPriceChange}
              onChangeCommitted={changePriceRange}
              valueLabelDisplay="auto"
            />
          </FormGroup>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
