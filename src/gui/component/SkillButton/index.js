
import React from 'react';

import RoleIcon from '../RoleIcon';

class SkillButton extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			clickable: this.props.skill.clickable,
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();

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
				{this.state.clickable ? <button onClick={this.handleClick}>{skill.name}</button> : skill.name}
			</div>
		</div>;
	}

}

export default SkillButton;
