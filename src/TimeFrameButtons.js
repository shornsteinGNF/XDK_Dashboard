import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';

const dayInMs = 86400000;

function timeLimitDay(){
        var currTimestamp = Date.now();
        var oneDay = currTimestamp - dayInMs;
        console.log(oneDay)
        return timeLimit
}

function timeLimitWeek(){
        var currTimestamp = Date.now();
        var oneWeek = currTimestamp - 7*dayInMs;
        console.log(oneWeek)
        return timeLimit
}

function timeLimitMonth(){
        var currTimestamp = Date.now();
        var oneMonth = currTimestamp - 30*dayInMs;
        return timeLimit
}

class TimeFrameButtons extends Component {
	render() {
        return(
                <div><Button onClick={() => { timeLimitDay(); }}>1 day</Button>
                <Button onClick={() => { timeLimitWeek(); }}>1 week</Button>
                <Button onClick={() => { timeLimitMonth(); }}>1 month</Button></div>
        )
		}
	}

export default TimeFrameButtons;