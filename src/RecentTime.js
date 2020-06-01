import React, { Component } from 'react';
import './App.css';
class RecentTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null
		};
	}
	async componentDidMount() {
		try {
			const response = await fetch('https://hx63ml0hmc.execute-api.us-west-1.amazonaws.com/dev');
			let responseJson = await response.json();
			this.setState(
				{
					isLoading: false,
					dataSource: responseJson
				},
				function() {}
			);
		} catch (error) {
			console.error(error);
		}
    }

	render() {

        function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp*1);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            // var time = toString(time)
            return time;
          }

		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			let { dataSource } = this.state;
			let items = dataSource.body.Items
			// const data = items.map(row => ({time: row.TimeStamp, temp: row.data.temp, humidity: row.data.humidity, battery: row.data.battery}))
            const data_filtered = items.filter(row => row.DeviceId == this.props.device)

			if (this.props.device == null) {
			return (
				// <div>
                    <i>Last reading:</i>
				// </div>
			);
			}
			else {
				return (
					// <div>
						<i>Last reading: {timeConverter(data_filtered[data_filtered.length-1].TimeStamp)}</i>
					// </div>
				);
			}
		}
	}
}
export default RecentTime;