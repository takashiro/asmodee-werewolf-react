
import React from 'react';

import Role from '../../../game/Role';
import RoleIcon from '../RoleIcon';

class RoleOption extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: !!props.selected
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prev => {
			let state = { selected: !prev.selected };
			if (this.props.onChange) {
				this.props.onChange({
					role: this.props.role,
					selected: state.selected
				});
			}
			return state;
		});
	}

	render() {
		let role = this.props.role;
		let className = this.state.selected ? 'selected' : '';
		return <li className={className} onClick={this.handleClick}>
			<RoleIcon role={role} />
			<span className="name">{role.name}</span>
		</li>;
	}
}

export default RoleOption;
