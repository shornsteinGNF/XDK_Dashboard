import React, { Component } from 'react';
import './App.css';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';

class CurrentBattery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null
		};
	}
	async componentDidMount() {
		try {
			const response = await fetch('https://mt53r15ong.execute-api.us-west-1.amazonaws.com/prod');
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
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			let { dataSource } = this.state;
			let items = dataSource.body.Items
			let data = items.map(a => a);
			console.log(items);
			console.log(data)
			const batteryData = data.map(row => ({time: row.TimeStamp, battery: row.data.battery}))
			
			return (
				<div>
                    {/* <BatteryFullIcon/> */}
					<b>Battery: </b>{batteryData[batteryData.length-1].battery}%
				</div>
			);
		}
	}
}
export default CurrentBattery;