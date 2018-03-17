
import React from 'react';

import RoleIcon from './RoleIcon';

class PlayerIcon extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			seat: props.seat,
			role: props.role,
			alive: true,
			selected: false,
			purified: false, //TODO: 技能失效
			markers: new Set,
			tags: new Set,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	setAlive(alive) {
		this.setState({alive: alive});
	}

	isAlive() {
		return this.state.alive;
	}

	addMarker(marker) {
		this.setState(prev => {
			prev.markers.add(marker);
			return {markers: prev.markers};
		});
	}

	removeMarker(marker) {
		this.setState(prev => {
			prev.markers.delete(marker);
			return {markers: prev.markers};
		});
	}

	hasMarker(marker) {
		return this.state.markers.has(marker);
	}

	toggleMarker(marker) {
		if (this.hasMarker(marker)) {
			this.removeMarker(marker);
		} else {
			this.addMarker(marker);
		}
	}

	clearMarkers() {
		this.setState(prev => {
			prev.markers.clear();
			return {markers: prev.markers};
		});
	}

	addTag(marker) {
		this.setState(prev => {
			prev.tags.add(marker);
			return {tags: prev.tags};
		});
	}

	removeTag(marker) {
		this.setState(prev => {
			prev.tags.delete(marker);
			return {tags: prev.tags};
		});
	}

	hasTag(marker) {
		return this.state.tags.has(marker);
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

		let iconStyle = 'icon';
		if (!this.state.alive) {
			iconStyle += ' dead';
		}

		markers = markers.map((marker, i) => <li key={i}>{marker.name}</li>);
		return <li onClick={this.handleClick}>
			<div className="number">{this.state.seat}</div>
			<div className={iconStyle}><RoleIcon role={this.state.role} /></div>
			<ul className="marker">{markers}</ul>
		</li>;
	}

}

export default PlayerIcon;
