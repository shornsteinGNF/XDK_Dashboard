import React from 'react';
import './App.css';
import ClippedDrawer from './ClippedDrawer'
import { makeStyles } from '@material-ui/core/styles'

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
