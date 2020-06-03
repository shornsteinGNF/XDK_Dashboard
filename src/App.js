import React from "react";
import "./App.css";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";

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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ResponsiveDrawer />
    </div>
  );
}

export default App;
