
import React from 'react';
import ReactDOM from 'react-dom';

import Team from '../core/Team';
import Role from '../core/Role';

import Lobby from './Lobby';
import GodNote from './GodNote';

import RoleIcon from './component/RoleIcon';
import RoleViewer from './component/RoleViewer';
import Toast from './component/Toast';

function TeamTable(props) {
	let key = 0;
	let icons = props.roles.map(role => <li key={key++}>
		<RoleIcon role={role} />
		<span className="name">{role.name}</span>
	</li>);
	return <div className="box">
		<h3>{props.team.name}</h3>
		<ul className="role-list">{icons}</ul>
	</div>;
}

class Room extends React.Component {

	constructor(props) {
		super(props);
		this.config = props.config;

		this.teams = [];
		let roles = this.config.roles;
		let key = 0;
		Team.List.forEach(team => {
			if (team == Team.Unknown) {
				return;
			}

			let team_roles = roles.filter(role => role.team == team);
			if (team_roles.length > 0) {
				this.teams.push(<TeamTable
					key={key++}
					team={team}
					roles={team_roles}
				/>);
			}
		});

		let current_site_url = (() => {
			let match = location.href.match(/^\w+\:\/\/[^/]+\/(?:compat\/)?/i);
			if (match && match[0]) {
				return match[0];
			} else {
				return '';
			}
		})();
		this.share_url = current_site_url + '?room_id=' + this.config.id;

		this.copyShareLink = this.copyShareLink.bind(this);
		this.handleReturn = this.handleReturn.bind(this);
		this.openGodNote = this.openGodNote.bind(this);
	}

	copyShareLink(e) {
		e.preventDefault();

		let link_input = document.createElement('input');
		link_input.type = 'text';
		link_input.value = this.share_url;
		link_input.contentEditable = true;
		link_input.readonly = false;

		this.link_anchor.innerHTML = '';
		this.link_anchor.append(link_input);

		link_input.focus();
		link_input.select();
		let range = document.createRange();
		range.selectNodeContents(link_input);
		let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		link_input.setSelectionRange(0, link_input.value.length);
		let result = document.execCommand('copy');

		link_input.readonly = true;
		this.link_anchor.innerHTML = this.share_url;

		if (result) {
			Toast.makeToast('成功复制该链接。');
		} else {
			Toast.makeToast('复制失败。请手动长按该链接，然后分享给好友。');
		}
	}

	openGodNote(e) {
		e.preventDefault();
		ReactDOM.render(
			<GodNote config={this.config} />,
			document.getElementById('root')
		);
	}

	handleReturn(e) {
		e.preventDefault();
		ReactDOM.render(
			<Lobby />,
			document.getElementById('root')
		);
	}

	render() {
		let session = this.config.readSession();
		return <div>
			<div className="inline-message">房间号：{this.config.id}</div>
			<div className="role-table">{this.teams}</div>
			<RoleViewer config={this.config} />
			<div className="box share-link-area">
				<span className="label">邀请链接</span>
				<a href={this.share_url} onClick={this.copyShareLink} ref={a => {this.link_anchor = a;}}>{this.share_url}</a>
			</div>
			<div className="button-area">
				{(session.ownerKey ? <button onClick={this.openGodNote}>上帝助手</button> : null)}
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default Room;
