import React, { Component } from 'react';
import './App.css';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer
  } from "recharts";
  
class ChartBattery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null
		};
	}
	async componentDidMount() {
		try {
			// const response = await fetch('https://jo3lmalso6.execute-api.us-west-1.amazonaws.com/prod');
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
			let data_device_filter = data.filter(row => row.DeviceId == this.props.device)
			const data_filtered = data_device_filter.filter(row => (
				row.TimeStamp > this.props.timeLimit
			))
			
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
				return time;
			  }
            
              const batteryData = data_filtered.map(row => (
				{time: timeConverter(row.TimeStamp), battery: row.data.battery}))

			return (
				// <ResponsiveContainer width="95%" height={400}>
				<div style={{
					paddingBottom: '56%',
					position: 'relative'
				}}>
				<div style={{
					position: 'absolute',
					width: '90%',
					height: '90%'
				}}>
					<h3>Battery</h3>
					<ResponsiveContainer>
				<BarChart
					data={batteryData}
					margin={{ top: 5, right: 5, left: 5, bottom: 50 }}
					>
					<XAxis dataKey="time"/>
					<YAxis dataKey="battery" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Bar dataKey="battery" fill="#81c784"/>
				</BarChart>
				</ResponsiveContainer>
				</div>
				</div>
			);
		}
	}
}
export default ChartBattery;