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
class CurrentValues extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: null
		};
	}
	async componentDidMount() {
		try {
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

		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			let { dataSource } = this.state;
			let items = dataSource.body.Items
			const data = items.map(row => ({time: row.TimeStamp, temp: row.data.temp, humidity: row.data.humidity, battery: row.data.battery}))
            
            return (
				<div>
                    <h1>Current</h1>
                    <i>(as of {timeConverter(data[data.length-1].time)})</i>
                <p>Temperature: {data[data.length-1].temp}</p>
                <p>Humidity: {data[data.length-1].humidity}</p>    
                <p>Battery: {data[data.length-1].battery}</p>
                    
                    
				</div>
			);
		}
	}
}
export default CurrentValues;