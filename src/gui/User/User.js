'use strict';
import React, { Component } from 'react';
import Float from './Float';
import Login from './Login';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'guest'
		}
		this.onUpdatename = this.onUpdatename.bind(this);
	}
	onUpdatename(name) {
		this.setState({
			name: name
		})
	}

	render() {
		return (<div>
			<Float name={this.state.name}></Float>
			<Login onUpdatename={this.onUpdatename}></Login>
		</div>)
	}
}
