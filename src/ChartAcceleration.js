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
	ResponsiveContainer
  } from "recharts";
  
class ChartAcceleration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null
		};
	}

	render() {
		if (this.props.data == null) {
			return <div>Loading...</div>;
		} else {
			let data = this.props.data;
			const data_filtered = data.filter(row => row.DeviceId == this.props.device)
			const xdkData = data_filtered.map(row => (
				{time: row.TimeStamp, accel_x: row.data.accel_x, accel_y: row.data.accel_y, accel_z: row.data.accel_z, accel_mag: row.data.accel_mag}))

			const xdkData_filtered = xdkData.filter(row => (
				row.time > this.props.timeLimit
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

			const test = Object.keys(xdkData_filtered).map(key => (
				{time: timeConverter(xdkData_filtered[key].time), accel_x:xdkData_filtered[key].accel_x, accel_y:xdkData[key].accel_y, accel_z:xdkData[key].accel_z, accel_mag:xdkData[key].accel_mag}
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
					<h3>Acceleration</h3>
					<ResponsiveContainer>
				<LineChart
					data={test}
					margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
					>
					<XAxis dataKey="time" xAxisId={0}/>
					<YAxis/>
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="accel_x" stroke="#00e676"/>
					<Line type="monotone" dataKey="accel_y" stroke="#9c27b0"/>
					<Line type="monotone" dataKey="accel_z" stroke="#ffeb3b"/>
					<Legend width={100} wrapperStyle={{ top: -50, right: -15, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '10px' }} />
				</LineChart>
				</ResponsiveContainer>
				</div>
				</div>
			);
		}
	}
}
export default ChartAcceleration;