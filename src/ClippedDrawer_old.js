import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Contents from './Contents'
import MemoryIcon from '@material-ui/icons/Memory';
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

function ClippedDrawer() {
  const classes = useStyles();
  const [data, dataSet] = useState(null);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        'https://hx63ml0hmc.execute-api.us-west-1.amazonaws.com/dev')
      let responseJson = await response.json();
      let test = responseJson
      let items = responseJson.body.Items;
      // let items =  data.body.Items;
      let DeviceIds = items.map(row => (
        row.DeviceId
      ));
      let uniqueDeviceIds = Array.from(new Set(DeviceIds));
      // dataSet(responseJson)
      dataSet(uniqueDeviceIds)
    }

    fetchMyAPI()
  }, []);

  // console.log(data)
  
  let list = 0

    if (data == null) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap className={classes.title}>
                XDK Dashboard
              </Typography>
              <Button color="inherit" variant="outlined" onClick={() => { window.location.reload(); }}><RefreshIcon/></Button>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Contents/>
          </main>
        </div>
      );
    }
    else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap className={classes.title}>
                XDK Dashboard
              </Typography>
              <Button color="inherit" variant="outlined" onClick={() => { window.location.reload(); }}><RefreshIcon/></Button>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
            <List>
        {data.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <MemoryIcon /> : <MemoryIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
              
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Contents/>
          </main>
        </div>
      );


    }

}

export default ClippedDrawer