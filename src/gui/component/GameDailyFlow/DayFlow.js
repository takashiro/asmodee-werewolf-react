
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import SkillLogList from './SkillLogList';

class DayFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			interactive: true,
		};

		this.handleDusk = this.handleDusk.bind(this);
	}

	handleDusk() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Day);
		room.trigger(GameEvent.Day);
		room.trigger(GameEvent.Dusk);
		this.setState({interactive: false}, () => {
			room.trigger(GameEvent.Evening);
		});
	}

	render() {
		if (this.state.interactive) {
			return <div className="day">
				<SkillButtonList room={this.props.room} timing={GameEvent.Day} />
				<div className="button-area">
					<button type="button" onClick={this.handleDusk}>天黑了</button>
				</div>
			</div>;
		} else {
			return <div className="day">
				<SkillLogList room={this.props.room} timing={GameEvent.Day} />
			</div>;
		}
	}

}

export default DayFlow;
