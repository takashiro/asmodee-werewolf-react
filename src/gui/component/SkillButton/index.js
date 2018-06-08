
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
		if (this.props.onClick) {
			let confirm = this.state.confirm;
			this.setState({ confirm: !confirm });
			setTimeout(this.props.onClick, 0, this.props.skill, confirm);
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
				{skill.clickable ? <button onClick={this.handleClick}>{this.state.confirm ? '确认' : skill.name}</button> : skill.name}
			</div>
		</div>;
	}

}

export default SkillButton;
