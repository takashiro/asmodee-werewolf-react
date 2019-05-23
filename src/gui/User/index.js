
'use strict';
import React from 'react';
import { $client, net } from '../../net/Client';

class User extends React.Component {

	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}
	/**
	 * 
	 * @param {event} e Click event.
	 */
	login(e) {
		e.preventDefault();
		if (e.target.length < 2) {
			alert("please type id and name");
			return;
		}
		let id = e.target[0].value;
		let name = e.target[1].value;
		$client.post(net.Users, { id, name })
			.then(

			).catch((error) => {
				alert(error);
			});
	}

	render() {
		return <div>
			<div>
				<form onSubmit={this.login}>
					<input type="text" id="id"></input>
					<input type="text" id="name"></input>
					<input type="submit"></input>
				</form>
			</div>
		</div>;
	}

}

export default User;
