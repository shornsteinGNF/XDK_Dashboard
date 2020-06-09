import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ChartAcceleration from "./ChartAcceleration";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ChartLine from "./ChartLine";
import CsvExport from './CsvExport';

const dayInMs = 86400000;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const classes = useStyles;

class TimeFrameButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLimit: Date.now() - dayInMs,
      device: null,
    };
  }

  timeLimitDay = () => {
    var currTimestamp = Date.now();
    var time = currTimestamp - dayInMs;
    this.setState({ timeLimit: time });
  };

  timeLimitWeek = () => {
    var currTimestamp = Date.now();
    var time = currTimestamp - 7 * dayInMs;
    this.setState({ timeLimit: time });
  };

  timeLimitMonth = () => {
    var currTimestamp = Date.now();
    var time = currTimestamp - 30 * dayInMs;
    this.setState({ timeLimit: time });
  };

  render() {
    return (
      <div className={classes.root}>
        <Button
          style={{ marginInlineEnd: "10px", backgroundColor: "White" }}
          variant="outlined"
          size="small"
          onClick={this.timeLimitDay}
        >
          1 day
        </Button>
        <Button
          style={{ marginInlineEnd: "10px", backgroundColor: "White" }}
          variant="outlined"
          size="small"
          onClick={this.timeLimitWeek}
        >
          1 week
        </Button>
        <Button
          style={{ marginInlineEnd: "10px", backgroundColor: "White" }}
          variant="outlined"
          size="small"
          onClick={this.timeLimitMonth}
        >
          1 month
        </Button>
        <CsvExport
          data={this.props.data}
          timeLimit={this.state.timeLimit}
          device={this.props.device}/>
        <p></p>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} style={{ maxHeight: "270px" }}>
              <ChartLine
                title="Temperature"
                yKey="data.temp"
                lineColor="#ff9800"
                data={this.props.data}
                timeLimit={this.state.timeLimit}
                device={this.props.device}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} style={{ maxHeight: "270px" }}>
              <ChartLine
                title="Humidity"
                yKey="data.humidity"
                lineColor="#2196f3"
                data={this.props.data}
                timeLimit={this.state.timeLimit}
                device={this.props.device}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} style={{ maxHeight: "270px" }}>
              <ChartAcceleration
                title="Acceleration"
                yKey="temp"
                data={this.props.data}
                timeLimit={this.state.timeLimit}
                device={this.props.device}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} style={{ maxHeight: "270px" }}>
              <ChartLine
                title="Battery"
                yKey="data.battery"
                lineColor="#4caf50"
                data={this.props.data}
                timeLimit={this.state.timeLimit}
                device={this.props.device}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TimeFrameButtons;
