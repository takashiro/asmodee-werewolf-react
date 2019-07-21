
'use strict';
import React from 'react';
import { $client, net } from '../../net/Client';
import './Login.scss';
class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: 'guest',
		}
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
			.then(() => {
				this.setState({ status: 'login' });
				this.props.onUpdateName(name);
			}
			).catch((error) => {
				alert(error);
			});
	}

	render() {
		return (<div className={this.state.status}>
			<div>
				<form onSubmit={this.login}>
					<input className='loginId' type="text" id="id"></input>
					<input className='loginName' type="text" id="name"></input>
					<button className='loginButton' type="submit"></button>
				</form>
			</div>
		</div >);
	}

}

export default Login;
