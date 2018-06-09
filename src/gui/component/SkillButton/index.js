
import React from 'react';

import RoleIcon from '../RoleIcon';

class SkillButton extends React.Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.state = {
			confirm: false
		};
	}

	handleClick(e) {
		e.preventDefault();

		let confirm = this.state.confirm;
		if (!this.props.skill.delayed) {
			this.setState({ confirm: !confirm });
		}

		let room = this.props.room;
		let skill = this.props.skill;
		room.activateSkill(skill);
	}

	render() {
		let skill = this.props.skill;
		return <div className="skill-button">
			<h5>
				<RoleIcon role={skill.role} />
				<span className="name">{skill.role.name}</span>
			</h5>
			<div className="content">
				{skill.clickable ? <button onClick={this.handleClick}>{this.state.confirm ? '确认' : skill.name}</button> : skill.name}
			</div>
		</div>;
	}

}

export default SkillButton;
