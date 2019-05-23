
import React from 'react';
import ReactDOM from 'react-dom';

import Lobby from './gui/Lobby';
import User from './gui/User';
import './common.scss';

ReactDOM.render(
	<User></User>,
	document.getElementById('user')
);
ReactDOM.render(
	<Lobby autoEnter="true" />,
	document.getElementById('root')
);
