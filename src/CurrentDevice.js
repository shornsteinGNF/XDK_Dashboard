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

	render() {
            return (
				<div>
                    <b>Device: </b>7C-EC-79-D3-68-C3
				</div>
			);
		}
	}

export default CurrentValues;