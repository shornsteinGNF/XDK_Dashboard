import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import RecentDevice from "./RecentDevice";
import RecentTime from "./RecentTime";
import RecentValue from "./RecentValue";
import TimeFrameButtons from "./TimeFrameButtons";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    textAlign: "center",
  },
});

class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2 style={{ marginBottom: "10px" }}>Recent</h2>
        <RecentTime data={this.props.data} device={this.props.device} />
        <p></p>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <RecentDevice device={this.props.device} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <RecentValue
                title="Temperature"
                variable="temp"
                units="&#176;C"
                data={this.props.data}
                device={this.props.device}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <RecentValue
                title="Humidity"
                variable="humidity"
                units="%"
                data={this.props.data}
                device={this.props.device}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <RecentValue
                title="Battery"
                variable="battery"
                data={this.props.data}
                device={this.props.device}
              />
            </Paper>
          </Grid>
        </Grid>
        <h2 style={{ marginBottom: "10px" }}>Charts</h2>
        <TimeFrameButtons data={this.props.data} device={this.props.device} />
      </div>
    );
  }
}

export default withStyles(styles)(Contents);
