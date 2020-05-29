import React, { useState, useEffect, Component } from 'react';
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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    zIndex: 2000
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
  //   padding: theme.spacing(3),
    padding: 10
  },
  title: {
    flexGrow: 1,
  },
});

class ClippedDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      device: null};
}

  async componentDidMount() {
    try {
      let response = await fetch(
        'https://hx63ml0hmc.execute-api.us-west-1.amazonaws.com/dev')
      let responseJson = await response.json();
      let items = responseJson.body.Items;
      let DeviceIds = items.map(row => (
        row.DeviceId
      ));
      let uniqueDeviceIds = Array.from(new Set(DeviceIds));
			this.setState(
				{
					data: uniqueDeviceIds,
				},
				function() {}
			);
		} catch (error) {
			console.error(error);
		}
  }
  
render() {
  const {classes} = this.props;
    if (this.state.data == null) {
      return(<div>loading...</div>)
      // return (
      //   <div className={classes.root}>
      //     <CssBaseline />
      //     <AppBar position="fixed" className={classes.appBar}>
      //       <Toolbar>
      //         <Typography variant="h6" noWrap className={classes.title}>
      //           XDK Dashboard
      //         </Typography>
      //         <Button color="inherit" variant="outlined" onClick={() => { window.location.reload(); }}><RefreshIcon/></Button>
      //       </Toolbar>
      //     </AppBar>
      //     <Drawer
      //       className={classes.drawer}
      //       variant="permanent"
      //       classes={{
      //         paper: classes.drawerPaper,
      //       }}
      //     >
      //       <Toolbar />
      //       <div className={classes.drawerContainer}>
      //       </div>
      //     </Drawer>
      //     <main className={classes.content}>
      //       <Toolbar />
      //       <Contents/>
      //     </main>
        // </div>
      // );
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
        {this.state.data.map((text, index) => (
          <ListItem button onClick={() => this.setState({device: text})}   key={text}>
            <ListItemIcon>{index % 2 === 0 ? <MemoryIcon /> : <MemoryIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Contents device={this.state.device}/>
          </main>
        </div>
      );
    }
  }
}

// ClippedDrawer.PropTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ClippedDrawer);