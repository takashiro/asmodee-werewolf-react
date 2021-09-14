
import React from 'react';

import NightFlow from './NightFlow';
import DayFlow from './DayFlow';

import './index.scss';

class GameDailyFlow extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<h4>第 {this.props.day} 天</h4>
			<NightFlow room={this.props.room} day={this.props.day} />
			<DayFlow room={this.props.room} day={this.props.day} />
		</div>;
	}

}

export default GameDailyFlow;
