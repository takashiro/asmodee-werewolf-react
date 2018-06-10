
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import SkillLogList from './SkillLogList';

class NightFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			interactive: true,
		};

		this.handleDawn = this.handleDawn.bind(this);
	}

	handleDawn() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Night);
		room.trigger(GameEvent.Night);
		room.trigger(GameEvent.Dawn);
		this.setState({interactive: false}, () => {
			room.trigger(GameEvent.Morning);
		});
	}

	render() {
		if (this.state.interactive) {
			return <div className="night">
				<SkillButtonList room={this.props.room} timing={GameEvent.Night} />
				<div className="button-area">
					<button type="button" onClick={this.handleDawn}>天亮了</button>
				</div>
			</div>;
		} else {
			return <div className="night">
				<SkillLogList room={this.props.room} timing={GameEvent.Night} />
			</div>;
		}
	}

}

export default NightFlow;
