
import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import RoleIcon from '../../../component/RoleIcon';
import RoleChange from '../../RoleChange';
import RoleLabel from '../../../component/RoleLabel';

interface RoleOptionProps {
	role: Role;
	selected: boolean;
	onChange?: (change: RoleChange) => void;
}

interface RoleOptionState {
	selected: boolean;
}

class RoleOption extends React.Component<RoleOptionProps, RoleOptionState> {
	constructor(props: RoleOptionProps) {
		super(props);
		this.state = {
			selected: props.selected,
		};
	}

	handleClick = (): void => {
		this.setState(prev => {
			let state = { selected: !prev.selected };
			if (this.props.onChange) {
				this.props.onChange({
					role: this.props.role,
					value: state.selected ? 1 : 0,
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
			<RoleLabel role={role} className="name" />
		</li>;
	}
}

export default RoleOption;
