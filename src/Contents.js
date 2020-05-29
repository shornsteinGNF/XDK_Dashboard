import React, {Component} from 'react';
import './App.css';
import ChartAcceleration from './ChartAcceleration'
import ChartBattery from './ChartBattery'
import CurrentBattery from './CurrentBattery'
import ChartHumidity from './ChartHumidity'
import ChartTemp from './ChartTemp'
import CurrentHumidity from './CurrentHumidity'
import CurrentTemp from './CurrentTemp'
import CurrentDevice from './CurrentDevice'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import RecentTime from './RecentTime'
import TimeFrameButtons from './TimeFrameButtons'
import { withStyles } from '@material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    padding: 10,
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color: 'Black'
  },
});


class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null};
}
  // const classes = useStyles();
  
  render () {
    const {classes} = this.props;
    return (
    <div className={classes.root}>
      <h2>Recent</h2><RecentTime device={this.props.device}/>
      <p></p>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CurrentDevice device={this.props.device}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CurrentTemp device={this.props.device}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CurrentHumidity device={this.props.device}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CurrentBattery device={this.props.device}/>
          </Paper>
        </Grid>
        </Grid>
        <br></br>
        <h2>Charts</h2>
        <TimeFrameButtons device={this.props.device}/>
        <p></p>
        <Grid container spacing={4}>
        {/* <Grid item xs={6}>
        <Paper className={classes.paper}>
            <ChartTemp />
        </Paper>
        </Grid> */}
        {/* <Grid item xs={6}>
        <Paper className={classes.paper}>
            <ChartHumidity />
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper}>
          <ChartAcceleration />
        </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper}>
            <ChartBattery />
        </Paper>
        </Grid> */}
        </Grid>
    </div>
  );
}
}

export default withStyles(styles)(Contents);
