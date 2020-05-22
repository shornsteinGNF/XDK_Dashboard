import React, { Component } from 'react';
import './App.css';
import OpacityIcon from '@material-ui/icons/Opacity';

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
			const xdkData = data.map(row => ({time: row.TimeStamp, temp: row.data.temp, humidity: row.data.humidity}))
			console.log(xdkData)
			return (
				<div>
                    {/* <OpacityIcon/> */}
					<b>Humidity: </b> {xdkData[xdkData.length-1].humidity}%
				</div>
			);
		}
	}
}
export default CurrentHumidity;