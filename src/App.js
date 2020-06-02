import React from 'react';
import './App.css';
import ClippedDrawer from './ClippedDrawer'
import ClippedDrawer_old from './ClippedDrawer_old'
import ResponsiveDrawer from './ResponsiveDrawer'
import ResponsiveDrawer_orig from './ResponsiveDrawer_orig'
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
      <ResponsiveDrawer />
    </div>
  );
}

export default App;
