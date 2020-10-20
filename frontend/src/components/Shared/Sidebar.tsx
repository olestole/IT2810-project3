import { Checkbox, Collapse, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemIcon, ListItemText, Slider, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AttachMoney from '@material-ui/icons/AttachMoney';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import LocalDrink from '@material-ui/icons/LocalDrink';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'store/action';
import { AppState, FilterOptions } from 'store/types';
import './sidebar.css';

const drawerWidth = 240

const useStyles = makeStyles(theme =>
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
      alignItems: 'center',
      position: 'relative',
    }
  }),
)

let Sidebar = () => {
  const classes = useStyles()
  const [volumRange, setVolumeRange] = React.useState<number[]>([0,6])
  const [priceRange, setPriceRange] = React.useState<number[]>([0,50000])
  const [openCategory, setOpenCategory] = React.useState<boolean>(false)
  const [openVolume, setOpenVolume] = React.useState<boolean>(false)
  const [openPrice, setOpenPrice] = React.useState<boolean>(false)
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const dispatch = useDispatch();

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

  let handleClick = (func: any, openValue: boolean) => {
    func(!openValue)
  }

  const changePriceRange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const changeVolumeRange = (event: any, newValue: number | number[]) => {
    setVolumeRange(newValue as number[]);
  };

  return (
    <div className="sidebar">
      <List component="nav" className={classes.appMenu} disablePadding>
        <ListItem button className={classes.menuItem} onClick={() => handleClick(setOpenCategory, openCategory)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="Kategori" />
          {openCategory ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <Divider />
          <FormGroup className={classes.formGroup}>
            {createCheckOption("Rødvin", "rodvin")}
            {createCheckOption("Hvitvin", "hvitvin")}
            {createCheckOption("Musserende vin", "musserende_vin")}
            {createCheckOption("Portvin", "portvin")}
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
              onChange={changeVolumeRange}
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
              onChange={changePriceRange}
              valueLabelDisplay="auto"
            />
          </FormGroup>
        </Collapse>

    </List>
    </div>
  )
}

export default Sidebar

/*
Akevitt
Portvin
Vodka
Druebrennevin
Whisky
Lik√∏r
Genever
Gin
Bitter
Fruktbrennevin
Vermut
Aromatisert vin
Brennevin, annet
Sherry
Rødvin
Hvitvin
Perlende vin, rosé
Rosévin
Champagne, brut
Musserende vin, rosé
Champagne, rosé
Musserende vin
Perlende vin, rød
Porter & stout
Perlende vin, hvit
Spesial
Saison farmhouse ale
Barley wine
Hveteøl
Pale ale
Mørk lager
Rom
Sterkvin, annen
Fruktvin
Sider
Lys lager
Brown ale
Alkoholfri musserende drikk
Champagne extra brut
India pale ale
Lys ale
Klosterstil
Sake
Surøl
Champagne, sec
Madeira
Alkoholfri most
Red/amber
Alkoholfri leskedrikk
Mjød
Brennevin, nøytralt < 37,5 %
Champagne, annen
Scotch ale
Alkoholfri vin
Alkoholfritt øl
Alkoholfritt, øvrig
*/