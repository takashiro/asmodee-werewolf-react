
import React from 'react';

class SkillLogList extends React.Component {

	constructor(props) {
		super(props);

		let room = props.room;
		let timing = props.timing;
		let skills = room.proactiveSkills.get(timing);
		this.state = {
			skills: skills ? skills.filter(skill => skill.isAvailable(room)) : [],
		};
	}

	render() {
		let room = this.props.room;
		let logs = [];
		let skills = this.state.skills;
		for (let i = 0; i < skills.length; i++) {
			let skill = skills[i];
			let targets = room.players.filter(player => player.hasMarker(skill.marker));
			if (targets.length > 0) {
				logs.push(<li key={i}>
					{skill.marker.name + ' ' + targets.map(target => target.seat).join(',')}
				</li>);
			}
		}

		return <ol className="log">{logs}</ol>;
	}

}

export default SkillLogList;
