import React, { Component } from 'react';
import './App.css';

class CurrentValues extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  device: null};
	}

	render() {
            return (
				<div>
                    <b>Device: </b>{this.props.device}
				</div>
			);
		}
	}

export default CurrentValues;