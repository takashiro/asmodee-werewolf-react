
import React from 'react';

import RoleIcon from './RoleIcon';

class PlayerIcon extends React.Component {

	constructor(props) {
		super(props);
		this.state = props.player;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.props.onClick) {
			this.props.onClick(this);
		}
	}

	render() {
		let markers = [];
		this.state.tags.forEach(value => {
			markers.push(value);
		});
		this.state.markers.forEach(value => {
			markers.push(value);
		});

		markers = markers.map((marker, i) => <li key={i}>{marker}</li>);
		return <li onClick={this.handleClick}>
			<div className="number">{this.state.seat}</div>
			<div className="icon"><RoleIcon role={this.state.role} /></div>
			<ul className="marker">{markers}</ul>
		</li>;
	}

}

export default PlayerIcon;
