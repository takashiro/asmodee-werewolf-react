
import React from 'react';

import RoleIcon from '../RoleIcon';

class SkillButton extends React.Component {

	constructor(props) {
		super(props);

		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		if (this.props.onClick) {
			this.props.onClick(this.props.skill);
		}
	}

	handlePhaseChange() {
		if (this.props.onPhaseChange) {
			this.props.onPhaseChange(this.props.skill.role);
		}
	}

	render() {
		let skill = this.props.skill;
		return <div>
			<h5 onClick={this.handlePhaseChange}>
				<RoleIcon role={skill.role} />
				<span className="name">{skill.role.name}</span>
			</h5>
			<div className="content">
				{skill.clickable ? <button onClick={this.handleClick}>{skill.name}</button> : skill.name}
			</div>
		</div>;
	}

}

export default SkillButton;
