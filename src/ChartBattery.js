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
            
              const batteryData = data.map(row => (
				{time: timeConverter(row.TimeStamp), battery: row.data.battery}))
            
            console.log(batteryData)

			return (
				// <ResponsiveContainer width="95%" height={400}>
				<div>
					<h3>Battery</h3>
				<BarChart
					width={400}
					height={400}
					data={batteryData}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
					<XAxis dataKey="time"/>
					<YAxis dataKey="battery" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Bar dataKey="battery" fill="#81c784"/>
				</BarChart>
				</div>
				// </ResponsiveContainer>
			);
		}
	}
}
export default ChartBattery;