import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class CsvExport extends Component {
    export = () => {
        const data_filtered = this.props.data.filter(
            (row) =>
              row.DeviceId === this.props.device &&
              row.TimeStamp > this.props.timeLimit
          );

        const arr = data_filtered.map((row) => ({
            TimeStamp: row.TimeStamp,
            temp: row.data.temp,
            humidity: row.data.humidity,
            accel_x: row.data.accel_x,
            accel_y: row.data.accel_y,
            accel_z: row.data.accel_z,
            battery: row.data.battery,
          }));

        // var columns = ['TimeStamp', 'Temperature', "Humidity", 'Acceleration (x)', 'Acceleration (y)', 'Acceleration (z)', 'Battery']
        var res = arr.map(function(item) {
            return Object.values(item);
          });

        let csvContent = "data:text/csv;charset=utf-8," + res.map(e => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        return link.click(); // This will download the data file named "my_data.csv".
    }
    
    render() {
        if (this.props.data === null) {
            console.log(this.props.data)
          return;
        } else {
          return (
            <div>
            <Button style={{ display: "inline-block" }} variant="contained" color="primary" size="small" onClick={this.export}>
              Export
            </Button>
          </div>
          );
        }
      }

}

export default CsvExport;