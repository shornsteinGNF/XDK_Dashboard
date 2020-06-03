import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MemoryIcon from "@material-ui/icons/Memory";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Contents from "./Contents";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerContainer: {
    overflow: "auto",
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  title: {
    flexGrow: 1,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    data: null,
    device: null,
    ids: null,
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };

  async componentDidMount() {
    try {
      let response = await fetch(
        "https://hx63ml0hmc.execute-api.us-west-1.amazonaws.com/dev"
      );
      let responseJson = await response.json();
      let items = responseJson.body.Items;
      let DeviceIds = items.map((row) => row.DeviceId);
      let uniqueDeviceIds = Array.from(new Set(DeviceIds));
      this.setState(
        {
          data: items,
          ids: uniqueDeviceIds,
        },
        function () {}
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { classes, theme } = this.props;
    if (this.state.data == null) {
      return <div>loading...</div>;
    } else {
      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <h3 style={{ paddingLeft: "20px" }}>Devices</h3>
          <List>
            {this.state.ids.map((text) => (
              <ListItem
                button
                onClick={() =>
                  this.setState({ mobileOpen: false, device: text })
                }
                key={text}
              >
                <ListItemIcon>
                  <MemoryIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </div>
      );

      return (
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                XDK Dashboard
              </Typography>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  this.componentDidMount();
                }}
              >
                <RefreshIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <Hidden smUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Contents data={this.state.data} device={this.state.device} />
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
