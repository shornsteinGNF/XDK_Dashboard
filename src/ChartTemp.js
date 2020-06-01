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

class ChartTemp extends Component {
	constructor(props) {
		super(props);
	}

	timeConverter(UNIX_timestamp){
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

	render() {
		if (this.props.data === null) {
			return;
		} else {
			const data_filtered = this.props.data.filter(row => (
				row.DeviceId === this.props.device &&
				row.TimeStamp > this.props.timeLimit
				));
	
			const data_timeConverted = Object.keys(data_filtered).map(key => (
				{TimeStamp: this.timeConverter(data_filtered[key].TimeStamp), temp:data_filtered[key].data.temp}
			))
			
			return (
				<div style={{
					paddingBottom: '56%', /* 16:9 */
					position: 'relative'
				}}>
				<div style={{
					position: 'absolute',
					width: '90%',
					height: '90%'
				}}>
					
					<h3>Temperature</h3>
					<ResponsiveContainer>
				<LineChart
					data={data_timeConverted}
					margin={{ top: 5, right: 5, left: 5, bottom: 50 }}
					>
					<XAxis dataKey="TimeStamp" />
					{/* <YAxis dataKey="temp" label='degrees Celsius' /> */}
					<YAxis dataKey="temp" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="temp" stroke="#ff7300" yAxisId={0} />
				</LineChart>
				</ResponsiveContainer>
				</div>
				</div>
			);
		}
	}
}
export default ChartTemp;