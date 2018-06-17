
import React from 'react';

import Role from '../../../game/Role';

import './index.scss';

class RoleIcon extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let style = {};
		let role = this.props.role;
		if (role && role != Role.Unknown) {
			style.backgroundImage = `url(style/role/${role.key}.jpg)`;
		}
		return <div className="role" style={style}></div>;
	}
}

export default RoleIcon;
