import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, FormControlLabel, FormGroup } from '@material-ui/core';

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import AttachMoney from '@material-ui/icons/AttachMoney'
import Label from '@material-ui/icons/Label'
import './sidebar.css'

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
  const [openCategory, setOpenCategory] = React.useState(false)
  const [rodvin, setRodvin] = React.useState<boolean>(false)
  const [hvitvin, setHvitvin] = React.useState<boolean>(false)


  function handleClick() {
    setOpenCategory(!openCategory)
  }

  return (
    <div className="sidebar">
      <List component="nav" className={classes.appMenu} disablePadding>
        <ListItem button className={classes.menuItem} onClick={handleClick}>
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
            value={rodvin}
            control={<Checkbox color="primary" />}
            label="Rødvin"
            labelPlacement="start"
            />
            <FormControlLabel 
            value={hvitvin}
            control={<Checkbox color="primary" />}
            label="Hvitvin"
            labelPlacement="start"
            />
          </FormGroup>
        </Collapse>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <Label />
          </ListItemIcon>
          <ListItemText primary="Merke" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Pris" />
        </ListItem>

    </List>
    </div>
  )
}

export default Sidebar