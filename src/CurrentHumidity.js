import React, { Component } from 'react';
import './App.css';

class CurrentHumidity extends Component {
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
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			let { dataSource } = this.state;
			let items = dataSource.body.Items
			let data = items.map(a => a);
			const humidityData_filtered = data.filter(row => row.DeviceId == this.props.device
				)
			
			if (this.props.device == null) {
			return (
				<div>
                    {/* <BatteryFullIcon/> */}
					<b>Humidity: </b>
				</div>
			);
			}
			else {
				return (
					<div>
						{/* <BatteryFullIcon/> */}
						<b>Humidity: </b>{humidityData_filtered[humidityData_filtered.length-1].data.humidity}%
					</div>
				);
			}
		}
	}
}
export default CurrentHumidity;