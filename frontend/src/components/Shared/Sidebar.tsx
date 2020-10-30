import {
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AttachMoney from '@material-ui/icons/AttachMoney';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import LocalDrink from '@material-ui/icons/LocalDrink';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter, filterVolumAndPrice } from 'store/action';
import { AppState, FilterOptions } from 'store/types';
import './sidebar.css';

const drawerWidth = 200;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    navList: {
      width: drawerWidth,
      [theme.breakpoints.down(650)]: {
        width: '100vw',
      },
    },
    menuItem: {
      width: drawerWidth,
      height: '100%',
      [theme.breakpoints.down(650)]: {
        width: '100vw',
      },
    },
    menuItemIcon: {
      color: 'var(--secondary)',
    },
    divider: {
      width: drawerWidth,
      [theme.breakpoints.down(650)]: {
        width: '100vw',
      },
    },
    formGroup: {
      width: drawerWidth,
      display: 'flex',
      alignItems: 'right',
      position: 'relative',
      [theme.breakpoints.down(650)]: {
        width: '100vw',
      },
    },
    sidebarContainer: {
      position: 'fixed',
      padding: 5,
      overflow: 'auto',
      maxHeight: 'calc(100vh - 120px)',
      height: '100%',
      [theme.breakpoints.down(650)]: {
        position: 'relative',
        width: '100vw',
      },
    },
  }),
);

// .sidebar {
//   position: fixed;
//   padding: 5px;
//   /* overflow-y: scroll; */
//   /* overflow: auto; */
//   height: 100%;
//   /* width: 100%; */
// }

// @media (max-width: 650px) {
//   .sidebar {
//     position: relative;
//   }
// }

const getPriceRange = (price: number) => {
  switch (price) {
    case 0: {
      return [0, 100];
    }
    case 100: {
      return [100, 150];
    }
    case 150: {
      return [150, 200];
    }
    case 200: {
      return [200, 300];
    }
    case 300: {
      return [300, 500];
    }
    case 500: {
      return [500, 750];
    }
    case 750: {
      return [750, 1000];
    }
    case 1000: {
      return [1000, 5000];
    }
    case 5000: {
      return [5000, 500000];
    }
    default: {
      return [0, 500000];
    }
  }
};

let Sidebar = () => {
  const classes = useStyles();
  const [volumRange, setVolumeRange] = React.useState<number[]>([0, 6]);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [openVolume, setOpenVolume] = React.useState<boolean>(false);
  const [openPrice, setOpenPrice] = React.useState<boolean>(false);
  let filterOptions: FilterOptions = useSelector((state: AppState) => state.filterOptions);
  const dispatch = useDispatch();

  let handleClick = (func: any, openValue: boolean) => {
    func(!openValue);
  };

  const changeVolumeRange = (event: any, newValue: number | number[]) => {
    dispatch(filterVolumAndPrice({ field: 'minVolum', value: (newValue as number[])[0] }));
    dispatch(filterVolumAndPrice({ field: 'maxVolum', value: (newValue as number[])[1] }));
  };

  const handleLocalVolumeChange = (event: any, newValue: number | number[]) => {
    setVolumeRange(newValue as number[]);
  };

  const handlePChange = (n: number) => {
    dispatch(filterVolumAndPrice({ field: 'minPrice', value: getPriceRange(n)[0] }));
    dispatch(filterVolumAndPrice({ field: 'maxPrice', value: getPriceRange(n)[1] }));
  };

  return (
    <div className={classes.sidebarContainer}>
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
          <Divider className={classes.divider} />
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              checked={filterOptions.kategorier.rodvin}
              control={<Checkbox color="primary" />}
              label={'Rødvin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'rodvin', value: !filterOptions.kategorier.rodvin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.hvitvin}
              control={<Checkbox color="primary" />}
              label={'Hvitvin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'hvitvin', value: !filterOptions.kategorier.hvitvin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.musserende_vin}
              control={<Checkbox color="primary" />}
              label={'Musserende Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'musserende_vin', value: !filterOptions.kategorier.musserende_vin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.sterk_vin}
              control={<Checkbox color="primary" />}
              label={'Sterk Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'sterk_vin', value: !filterOptions.kategorier.sterk_vin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.annen_vin}
              control={<Checkbox color="primary" />}
              label={'Annen Vin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'annen_vin', value: !filterOptions.kategorier.annen_vin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.ol}
              control={<Checkbox color="primary" />}
              label={'Øl'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'ol', value: !filterOptions.kategorier.ol }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.brennevin}
              control={<Checkbox color="primary" />}
              label={'Brennevin'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'brennevin', value: !filterOptions.kategorier.brennevin }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.alkoholfritt}
              control={<Checkbox color="primary" />}
              label={'Alkoholfritt'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'alkoholfritt', value: !filterOptions.kategorier.alkoholfritt }));
              }}
            />
            <FormControlLabel
              checked={filterOptions.kategorier.annet}
              control={<Checkbox color="primary" />}
              label={'Annet'}
              labelPlacement="start"
              onChange={() => {
                dispatch(filter({ field: 'annet', value: !filterOptions.kategorier.annet }));
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
          <Divider className={classes.divider} />
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
          <Divider className={classes.divider} />
          <FormGroup className={classes.formGroup}>
            <Typography id="price-slider" gutterBottom>
              Price range (kr)
            </Typography>
            <FormControl className={classes.formGroup}>
              <InputLabel id="customized-select-label"></InputLabel>
              <Select
                id="customized-select"
                variant="outlined"
                value={filterOptions.minPrice}
                onChange={(e) => handlePChange(e.target.value as number)}
                //input={<BootstrapInput />}
              >
                <MenuItem value={0}>Under 100 kr</MenuItem>
                <MenuItem value={100}>100 til 150 kr</MenuItem>
                <MenuItem value={150}>150 til 200 kr</MenuItem>
                <MenuItem value={200}>200 til 300 kr</MenuItem>
                <MenuItem value={300}>300 til 500 kr</MenuItem>
                <MenuItem value={500}>500 til 750 kr</MenuItem>
                <MenuItem value={750}>750 til 1000 kr</MenuItem>
                <MenuItem value={1000}>1000 til 5000 kr</MenuItem>
                <MenuItem value={5000}>Over 5000 kr</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
