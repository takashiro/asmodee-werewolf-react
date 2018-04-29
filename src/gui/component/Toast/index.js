
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class Toast extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.toast.classList.add('in');
		}, 0);

		setTimeout(() => {
			this.toast.classList.remove('in');
			this.toast.classList.add('out');
		}, 900);

		setTimeout(() => {
			ReactDOM.unmountComponentAtNode(document.getElementById('overlay'));
		}, 1200);
	}

	render() {
		return <div className="toast" ref={toast => { this.toast = toast; }}>
			{this.props.message}
		</div>;
	}

}

Toast.makeToast = message => {
	ReactDOM.render(
		<Toast message={message} />,
		document.getElementById('overlay')
	);
};

export default Toast;
