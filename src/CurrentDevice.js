import React, { Component } from "react";
import "./App.css";

class CurrentValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
    };
  }

  render() {
    if (this.props.device === null) {
      return (
        <div>
          <b>Device: </b>Select a device
        </div>
      );
    } else {
      return (
        <div>
          <b>Device: </b>
          {this.props.device}
        </div>
      );
    }
  }
}

export default CurrentValues;
