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
			const tempData = data.map(row => ({time: row.TimeStamp, temp: row.data.temp}))
			console.log(tempData)
			return (
				<div>
				<LineChart
					width={400}
					height={400}
					data={tempData}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
					<XAxis dataKey="time" />
					<YAxis dataKey="temp" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="temp" stroke="#ff7300" yAxisId={0} />
				</LineChart>
				</div>
			);
		}
	}
}
export default ChartTemp;