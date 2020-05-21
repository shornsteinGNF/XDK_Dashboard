import React from 'react';
import logo from './logo.svg';
import './App.css';
import Bar from './Bar'
import ChartHumidity from './ChartHumidity'
import ChartTemp from './ChartTemp'
import CurrentHumidity from './CurrentHumidity'
import CurrentTemp from './CurrentTemp'
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

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Bar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CurrentTemp />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CurrentHumidity />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ChartTemp />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ChartHumidity />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
