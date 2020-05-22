import React from 'react';
import './App.css';
import ChartAcceleration from './ChartAcceleration'
import ChartBattery from './ChartBattery'
import ChartHumidity from './ChartHumidity'
import ChartTemp from './ChartTemp'
import CurrentValues from './CurrentValues'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

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

function Contents() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <CurrentValues />
          </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
            <ChartBattery />
        </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
            <ChartTemp />
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
            <ChartHumidity />
          </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
          <ChartAcceleration />
        </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Contents;
