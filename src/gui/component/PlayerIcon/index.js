
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import RoleIcon from '../RoleIcon';

class PlayerIcon extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			seat: props.seat,
			role: props.role,
			cards: [],
			alive: true,
			selected: false,
			markers: new Set,
			tags: new Set,
		};
		this.markers = new Set;
		this.tags = new Set;
		this.purified = false;
		this.alive = true;
		this.deathDay = 0;
		this.deathReason = null;
		this.handleClick = this.handleClick.bind(this);
		this.handleSkill = this.handleSkill.bind(this);

		this.deathSkills = props.skills && props.skills.get(GameEvent.Death);
	}

	get cards() {
		return this.state.cards;
	}

	get role() {
		return this.state.role;
	}

	setAlive(alive) {
		this.alive = alive;
		this.setState({alive: alive});
	}

	isAlive() {
		return this.alive;
	}

	addMarker(marker) {
		this.markers.add(marker);
		this.setState(prev => {
			prev.markers.add(marker);
			return {markers: prev.markers};
		});
	}

	removeMarker(marker) {
		this.markers.delete(marker);
		this.setState(prev => {
			prev.markers.delete(marker);
			return {markers: prev.markers};
		});
	}

	hasMarker(marker) {
		return this.markers.has(marker);
	}

	toggleMarker(marker) {
		if (this.hasMarker(marker)) {
			this.removeMarker(marker);
		} else {
			this.addMarker(marker);
		}
	}

	clearMarkers() {
		this.markers.clear();
		this.setState(prev => {
			prev.markers.clear();
			return {markers: prev.markers};
		});
	}

	addTag(marker) {
		this.tags.add(marker);
		this.setState(prev => {
			prev.tags.add(marker);
			return {tags: prev.tags};
		});
	}

	removeTag(marker) {
		this.tags.delete(marker);
		this.setState(prev => {
			prev.tags.delete(marker);
			return {tags: prev.tags};
		});
	}

	hasTag(marker) {
		return this.tags.has(marker);
	}

	handleClick() {
		if (this.props.onClick) {
			this.props.onClick(this);
		}
	}

	handleSkill(e) {
		e.preventDefault();

		if (this.props.onSkill) {
			let button = e.target;
			let skill = this.deathSkills[button.value];
			if (skill) {
				skill.owner = this;
				this.props.onSkill(skill);
			}
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

		let icon_style = 'icon';
		let actions = [];

		if (!this.state.alive) {
			icon_style += ' dead';
			if (!this.purified && this.deathSkills && this.deathSkills.length > 0) {
				for (let i = 0; i < this.deathSkills.length; i++) {
					let skill = this.deathSkills[i];
					if (skill.role != this.state.role) {
						continue;
					}
					actions.push(<button key={i} value={i} onClick={this.handleSkill}>{skill.name}</button>);
				}
			}
		}

		markers = markers.map((marker, i) => <li key={i}>{marker.name}</li>);
		return <li onClick={this.handleClick}>
			<div className="number">{this.state.seat}</div>
			<div className={icon_style}><RoleIcon role={this.state.role} /></div>
			<ul className="marker">{markers}</ul>
			<div className="button-area">{actions}</div>
		</li>;
	}

}

export default PlayerIcon;
