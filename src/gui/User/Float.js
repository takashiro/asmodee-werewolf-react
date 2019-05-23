
'use strict';
import React from 'react';

class Float extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (<div className='float'>
			<div>
				<div>{this.props.name}</div>
			</div>
		</div >);
	}

}

export default Float;
