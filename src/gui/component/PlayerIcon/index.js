
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
			confirm: false,
			deathSkill: player.skills.find(
				skill =>
				skill instanceof ProactiveSkill && skill.timing === GameEvent.Death
			),
		};

		player.on('roleChanged', role => this.setState({role: role}));
		player.on('aliveChanged', alive => this.setState({alive: alive}));
		player.on('markerChanged', markers => this.setState({markers: markers}));
		player.on('tagChanged', tags => this.setState({tags: tags}));
		player.on('selected', selected => this.setState({confirm: selected}));
		player.on('skillInvoked', skill => {
			if (skill === this.state.deathSkill) {
				this.setState({deathSkill: null});
			}
		});

		this.handleClick = this.handleClick.bind(this);
		this.handleSkill = this.handleSkill.bind(this);
	}

	handleClick() {
		let room = this.props.room;
		if (room) {
			room.selectPlayer(this.props.player);
		}
	}

	handleSkill(e) {
		e.preventDefault();

		let skill = this.state.deathSkill;
		if (!skill) {
			return;
		}

		let room = this.props.room;
		room.activateSkill(skill);
	}

	render() {
		let player = this.props.player;
		let markers = Array.from(this.state.tags);
		markers.push(...this.state.markers);

		let icon_style = 'icon';
		let avatar_button = null;

		if (!this.state.alive) {
			icon_style += ' dead';
			if (!player.purified && this.state.deathSkill) {
				let skill = this.state.deathSkill;
				avatar_button = <button onClick={this.handleSkill}>{skill.name}</button>;
			}
		} else if (this.state.confirm) {
			avatar_button = <button type="button">确认</button>;
		}

		markers = markers.map((marker, i) => <li key={i}>{marker.name}</li>);
		return <li onClick={this.handleClick}>
			<div className="number">{this.state.seat}</div>
			<div className={icon_style}><RoleIcon role={this.state.role} /></div>
			<ul className="marker">{markers}</ul>
			<div className="button-area">{avatar_button}</div>
		</li>;
	}

}

export default PlayerIcon;
