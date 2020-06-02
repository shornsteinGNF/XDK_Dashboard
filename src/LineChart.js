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

class Chart extends Component {
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
				{TimeStamp: this.timeConverter(data_filtered[key].TimeStamp), data:data_filtered[key].data}
			))

			return (
				<div style={{
					paddingBottom: '56%',
					position: 'relative'
				}}>
				<div style={{
					position: 'absolute',
					width: '90%',
					height: '90%',
					maxHeight: '300px',
				}}>
					<h3>{this.props.title}</h3>
					<ResponsiveContainer>
				<LineChart
					data={data_timeConverted}
					margin={{ top: 5, right: 5, left: 5, bottom: 50 }}
					>
					<XAxis dataKey="TimeStamp" />
					<YAxis dataKey={this.props.yKey} />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey={this.props.yKey} stroke={this.props.lineColor} yAxisId={0} />
				</LineChart>
				</ResponsiveContainer>
				</div>
				</div>
			);
		}
	}
}
export default Chart;