import React, { Component } from 'react';
import './App.css';
import {
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Line,
	ResponsiveContainer
  } from "recharts";
  
class ChartHumidity extends Component {
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
			const xdkData = data.map(row => (
				{time: row.TimeStamp, temp: row.data.temp, humidity: row.data.humidity}))
			
			const xdkData_filtered = xdkData.filter(row => row.time > this.props.timeLimit)

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

			const test = Object.keys(xdkData_filtered).map(key => (
				{time: timeConverter(xdkData_filtered[key].time), humidity:xdkData_filtered[key].humidity}
			))

			return (
				<div style={{
					paddingBottom: '56%',
					position: 'relative'
				}}>
				<div style={{
					position: 'absolute',
					width: '90%',
					height: '90%'
				}}>
					<h3>Humidity</h3>
					<ResponsiveContainer>
				<LineChart
					data={test}
					margin={{ top: 5, right: 5, left: 5, bottom: 50 }}
					>
					<XAxis dataKey="time"/>
					<YAxis dataKey="humidity" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="humidity" stroke="#6200EE" yAxisId={0} />
				</LineChart>
				</ResponsiveContainer>
				</div>
				</div>
			);
		}
	}
}
export default ChartHumidity;