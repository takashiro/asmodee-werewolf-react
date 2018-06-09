
import React from 'react';

import GameEvent from '../../../game/GameEvent';
import ProactiveSkill from '../../../game/ProactiveSkill';

import RoleIcon from '../RoleIcon';

class PlayerIcon extends React.Component {

	constructor(props) {
		super(props);

		let player = props.player;

		this.state = {
			seat: player.seat,
			role: player.role,
			cards: [],
			alive: true,
			selected: false,
			markers: player.markers,
			tags: player.tags,
		};

		player.on('roleChanged', role => this.setState({role: role}));
		player.on('aliveChanged', alive => this.setState({alive: alive}));
		player.on('markerChanged', markers => this.setState({markers: markers}));
		player.on('tagChanged', tags => this.setState({tags: tags}));

		this.handleClick = this.handleClick.bind(this);
		this.handleSkill = this.handleSkill.bind(this);

		this.deathSkills = player.skills.filter(
			skill =>
			skill instanceof ProactiveSkill && skill.timing === GameEvent.Death
		);
	}

	handleClick() {
		let room = this.props.room;
		if (room) {
			room.selectTarget(this.props.player);
		}
	}

	handleSkill(e, confirm) {
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
		let markers = Array.from(this.state.tags);
		markers.push(...this.state.markers);

		let icon_style = 'icon';
		let actions = [];

		if (!this.state.alive) {
			icon_style += ' dead';
			if (!this.purified && this.deathSkills && this.deathSkills.length > 0) {
				for (let i = 0; i < this.deathSkills.length; i++) {
					let skill = this.deathSkills[i];
					actions.push(
						<button key={i} value={i} onClick={this.handleSkill}>
							{skill.name}
						</button>
					);
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
