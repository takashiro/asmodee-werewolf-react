
import React from 'react';
import ReactDOM from 'react-dom';

import Lobby from './gui/Lobby';

import './common.scss';

ReactDOM.render(
	<Lobby autoEnter="true" />,
	document.getElementById('root')
);
