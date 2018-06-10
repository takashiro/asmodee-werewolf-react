
import React from 'react';

import NightFlow from './NightFlow';
import DayFlow from './DayFlow';

import './index.scss';

class GameDailyFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			daylight: false,
		};

		this.handleDawn = this.handleDawn.bind(this);
	}

	handleDawn() {
		this.setState({daylight: true});
	}

	render() {
		return <div>
			<h4>第 {this.props.day} 天</h4>
			<NightFlow room={this.props.room} onDawn={this.handleDawn} />
			{this.state.daylight ? <DayFlow room={this.props.room} /> : null}
		</div>;
	}

}

export default GameDailyFlow;
