import React, { Component } from 'react';
import './App.css';
import {
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
	ComposedChart,
	Area,
	Bar
  } from "recharts";
  
class ChartTemp extends Component {
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
				{time: row.TimeStamp, accel_x: row.data.accel_x, accel_y: row.data.accel_y, accel_z: row.data.accel_z, accel_mag: row.data.accel_mag}))

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

			const test = Object.keys(xdkData).map(key => (
				{time: timeConverter(xdkData[key].time), accel_x:xdkData[key].accel_x, accel_y:xdkData[key].accel_y, accel_z:xdkData[key].accel_z, accel_mag:xdkData[key].accel_mag}
			))

			return (
				<div>
				<LineChart
					width={400}
					height={400}
					data={test}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
					<XAxis dataKey="time" xAxisId={0}/>
					<YAxis/>
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="accel_x" stroke="#00e676"/>
					<Line type="monotone" dataKey="accel_y" stroke="#9c27b0"/>
					<Line type="monotone" dataKey="accel_z" stroke="#ffeb3b"/>
					<Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
				</LineChart>
				</div>
			);
		}
	}
}
export default ChartTemp;