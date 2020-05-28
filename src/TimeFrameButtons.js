import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import ChartTemp from './ChartTemp';
import ChartHumidity from './ChartHumidity';
import ChartAcceleration from './ChartAcceleration';
import ChartBattery from './ChartBattery';

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'


const dayInMs = 86400000;

const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));

const classes = useStyles;

class TimeFrameButtons extends Component {

        constructor(props) {
                super(props);
                this.state = {timeLimit: 0};
        }

         timeLimitDay = () => {
                var currTimestamp = Date.now();
                var time = currTimestamp - dayInMs;
                this.setState({ timeLimit: time });
        }
        
         timeLimitWeek = () => {
                var currTimestamp = Date.now();
                var time = currTimestamp - 7*dayInMs;
                this.setState({ timeLimit: time });
        }
        
         timeLimitMonth = () => {
                var currTimestamp = Date.now();
                var timeLimit = currTimestamp - 30*dayInMs;
                this.setState({ timeLimit: timeLimit });
        }

	render() {
        return(
                <div className={classes.root}>
                <Button variant="outlined" size="small" onClick={ this.timeLimitDay }>1 day</Button>
                <Button variant="outlined" size="small" onClick={ this.timeLimitWeek }>1 week</Button>
                <Button variant="outlined" size="small" onClick={ this.timeLimitMonth }>1 month</Button>
                <p></p>
                <Grid container spacing={4}>
                <Grid item xs={6}>
                <Paper className={classes.paper}>       
                        <ChartTemp timeLimit = {this.state.timeLimit}/>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
                        <ChartHumidity timeLimit = {this.state.timeLimit}/>
                        </Paper>
                        </Grid>
                        <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <ChartAcceleration timeLimit = {this.state.timeLimit}/>
                        </Paper>
                        </Grid>
                        <Grid item xs={6}>
                <Paper className={classes.paper}>
                        <ChartBattery timeLimit = {this.state.timeLimit}/>
                        </Paper>
                        </Grid>
                </Grid>
                </div>
        )
		}
	}

export default TimeFrameButtons;

{/* <Grid container spacing={4}>
<Grid item xs={3}>
  <Paper className={classes.paper}>
    <CurrentDevice />
  </Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>
    <CurrentTemp />
  </Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>
    <CurrentHumidity/>
  </Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>
    <CurrentBattery/>
  </Paper>
</Grid>
</Grid>
<br></br>
<h2>Charts</h2>
<TimeFrameButtons/>
<p></p>
<Grid container spacing={4}> */}
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
// </Grid>