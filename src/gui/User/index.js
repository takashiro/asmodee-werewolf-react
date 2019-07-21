'use strict';
import React, { Component } from 'react';
import Float from './Float';
import Login from './Login';
import './index.scss';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'guest'
		}
		this.onUpdateName = this.onUpdateName.bind(this);
	}
	onUpdateName(name) {
		this.setState({
			name: name
		})
	}

	render() {
		return (<div className='UserArea'>
			<Float name={this.state.name}></Float>
			<Login onUpdateName={this.onUpdateName}></Login>
		</div>)
	}
}
