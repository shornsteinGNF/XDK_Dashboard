import React, { Component } from 'react';
import './App.css';

class CurrentHumidity extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.data == null) {
			return <div>Loading...</div>;
		} else {
			if (this.props.device == null) {
				return (<b>Humidity:</b>);
			}
			else {
				const data_filtered = this.props.data.filter(row => row.DeviceId == this.props.device)
				return (
					<div>
						<b>Humidity: </b>{data_filtered[data_filtered.length-1].data.humidity}%
					</div>
				);
			}
		}
	}
}
export default CurrentHumidity;