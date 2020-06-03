import React, { Component } from "react";

class RecentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  render() {
    function timeConverter(UNIX_timestamp) {
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
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      if (date.toString().length == 1) {
        date = "0" + date;
      }
      if (hour.toString().length == 1) {
        hour = "0" + hour;
      }
      if (min.toString().length == 1) {
        min = "0" + min;
      }
      if (sec.toString().length == 1) {
        sec = "0" + sec;
      }
      var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
    }

    if (this.props.data == null) {
      return <i>Last reading:</i>;
    } else {
      let data = this.props.data;
      const data_filtered = data.filter(
        (row) => row.DeviceId == this.props.device
      );

      if (this.props.device == null) {
        return <i>Last reading:</i>;
      } else {
        return (
          <i>
            Last reading:{" "}
            {timeConverter(data_filtered[data_filtered.length - 1].TimeStamp)}
          </i>
        );
      }
    }
  }
}
export default RecentTime;
