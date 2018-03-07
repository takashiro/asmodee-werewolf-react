
import React from 'react';

import Role from '../../core/Role';

class RoleIcon extends React.Component {

	constructor(props) {
		super(props);

		this.role = Role.fromNum(props.role);
	}

	render() {
		let key = this.role.key.toLowerCase();
		let style = {
			backgroundImage: `url(style/role/${key}.jpg)`
		};
		return <div className="role" style={style}></div>;
	}
}

export default RoleIcon;
