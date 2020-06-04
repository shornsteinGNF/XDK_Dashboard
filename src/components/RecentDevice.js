import React, { Component } from "react";

class RecentDevice extends Component {
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
          <b>Device: </b>None selected
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

export default RecentDevice;
