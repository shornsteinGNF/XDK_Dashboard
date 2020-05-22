import React from 'react';
import logo from './logo.svg';
import './App.css';
import Bar from './Bar'
import ClippedDrawer from './ClippedDrawer'
import ChartAcceleration from './ChartAcceleration'
import ChartHumidity from './ChartHumidity'
import ChartTemp from './ChartTemp'
import CurrentValues from './CurrentValues'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Contents from './Contents'
import {
	ResponsiveContainer
  } from "recharts";

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
      <ClippedDrawer/>
    </div>
  );
}

export default App;
