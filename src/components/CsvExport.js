import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class CsvExport extends Component {
    export = () => {
        const data_filtered = this.props.data.filter(
            (row) =>
              row.DeviceId === this.props.device &&
              row.TimeStamp > this.props.timeLimit
          );

          function dateConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1);
            var months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var day = a.getDate();
            if (day.toString().length === 1) {
              date = "0" + date;
            }
            var date =
              day + " " + month + " " + year;
            return date;
          }

          function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1);
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            if (hour.toString().length === 1) {
              hour = "0" + hour;
            }
            if (min.toString().length === 1) {
              min = "0" + min;
            }
            if (sec.toString().length === 1) {
              sec = "0" + sec;
            }
            var time =
              hour + ":" + min + ":" + sec;
            return time;
          }

        const arr = data_filtered.map((row) => ({
            Date: dateConverter(row.TimeStamp),
            Time: timeConverter(row.TimeStamp),
            temp: row.data.temp,
            humidity: row.data.humidity,
            accel_x: row.data.accel_x,
            accel_y: row.data.accel_y,
            accel_z: row.data.accel_z,
            battery: row.data.battery,
          }));

        var headers = ['Date','Time', 'Temperature (C)', "Humidity (%)", 'Acceleration_x (milli-g)', 'Acceleration_y (milli-g)', 'Acceleration_z (milli-g)', 'Battery (%)']
        var res = arr.map(function(item) {
            return Object.values(item);
          });

        res.unshift(headers);
          
        let csvContent = "data:text/csv;charset=utf-8," + res.map(e => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "xdk_data_"+Date.now()+".csv");
        document.body.appendChild(link); // Required for FF
        return link.click(); // This will download the data file named "my_data.csv".
    }
    
    render() {
        if (this.props.data === null) {
          return;
        } else {
          return (
            <div>
            <Button variant="contained" color="primary" size="small" onClick={this.export}>
              Export
            </Button>
          </div>
          );
        }
      }
}

export default CsvExport;