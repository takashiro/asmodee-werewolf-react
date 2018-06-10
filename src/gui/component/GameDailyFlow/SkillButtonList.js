
import React from 'react';

import RoleIcon from '../RoleIcon';
import SkillButton from '../SkillButton';

class SkillButtonList extends React.Component {

	constructor(props) {
		super(props);

		let room = props.room;
		let timing = props.timing;
		let skills = room.proactiveSkills.get(timing);
		this.state = {
			skills: skills ? skills.filter(skill => skill.isAvailable(room)) : [],
		};
	}

	handleFocus(e) {
		let current = e.currentTarget;
		let parent = current.parentElement;
		for (let sibling of parent.children) {
			sibling.classList.remove('current');
		}
		current.classList.add('current');
	}

	render() {
		return <ol className="action">{
			this.state.skills.map((skill, key) => (
				<li key={key} onClick={this.handleFocus}>
					<SkillButton
						room={this.props.room}
						skill={skill}
					/>
				</li>
			))
		}</ol>;
	}

}

export default SkillButtonList;
