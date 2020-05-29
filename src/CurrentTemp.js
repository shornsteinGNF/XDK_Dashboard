import React, { Component } from 'react';
import './App.css';

class CurrentTemp extends Component {
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
			const tempData_filtered = data.filter(row => row.DeviceId == this.props.device
				)
			if (this.props.device == null) {
			return (
				<div>
                  {/* <AcUnitIcon/>  */}
				  <b>Temperature: </b> 
				  
				</div>
			);
		}
			else {
				return (
				<div>
				{/* <AcUnitIcon/>  */}
				<b>Temperature: </b> 
				{tempData_filtered[tempData_filtered.length-1].data.temp}&#176;C
			  </div>
				);
			}
		}
	}
}
export default CurrentTemp;