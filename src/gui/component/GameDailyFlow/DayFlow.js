
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import SkillLogList from './SkillLogList';

class DayFlow extends React.Component {

	constructor(props) {
		super(props);

		let room = props.room;

		this.state = {
			log: null,
			invisible: !room.atNight,
		};

		room.once('morning', () => this.setState({invisible: true}));

		this.handleDusk = this.handleDusk.bind(this);
	}

	handleDusk() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Day);
		room.trigger(GameEvent.Day);

		let log = <SkillLogList room={this.props.room} timing={GameEvent.Day} />;

		room.trigger(GameEvent.Dusk);
		room.trigger(GameEvent.Evening);

		this.setState({log: log});
	}

	render() {
		if (!this.state.invisible) {
			return null;
		}

		if (!this.state.log) {
			return <div className="day">
				<SkillButtonList room={this.props.room} timing={GameEvent.Day} />
				<div className="button-area">
					<button type="button" onClick={this.handleDusk}>天黑了</button>
				</div>
			</div>;
		} else {
			return <div className="day">
				{this.state.log}
			</div>;
		}
	}

}

export default DayFlow;
