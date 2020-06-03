import React, { Component } from "react";

class CurrentValue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data === null) {
      return <div>Loading...</div>;
    } else {
      if (this.props.device === null) {
        return <b>{this.props.title}:</b>;
      } else {
        const data_filtered = this.props.data.filter(
          (row) => row.DeviceId === this.props.device
        );
        return (
          <div>
            <b>{this.props.title}: </b>
            {
              data_filtered[data_filtered.length - 1]["data"][
                this.props.variable
              ]
            }
            {this.props.units}
          </div>
        );
      }
    }
  }
}
export default CurrentValue;
