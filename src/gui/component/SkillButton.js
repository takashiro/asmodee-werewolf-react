
import React from 'react';

import RoleIcon from './RoleIcon';

class SkillButton extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		if (this.props.onClick) {
			this.props.onClick();
		}
	}

	render() {
		let skill = this.props.skill;
		return <div>
			<h5>
				<RoleIcon role={skill.role} />
				<span className="name">{skill.role.name}</span>
			</h5>
			<div className="content">
				<button type="button" onClick={this.handleClick}>{skill.name}</button>
			</div>
		</div>;
	}

}

export default SkillButton;
