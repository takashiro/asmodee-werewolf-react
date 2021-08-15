import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

interface ToastProps {
	message: string;
	container?: string;
}

class Toast extends React.Component<ToastProps, unknown> {
	static makeToast(message: string, container = 'overlay'): void {
		ReactDOM.render(
			<Toast message={message} />,
			document.getElementById(container),
		);
	}

	protected toast: React.RefObject<HTMLDivElement>;

	constructor(props: ToastProps) {
		super(props);

		this.toast = React.createRef();
	}

	componentDidMount(): void {
		setTimeout(() => {
			const toast = this.toast.current;
			if (!toast) {
				return;
			}
			toast.classList.add('in');
		}, 0);

		setTimeout(() => {
			const toast = this.toast.current;
			if (!toast) {
				return;
			}
			toast.classList.remove('in');
			toast.classList.add('out');
		}, 900);

		setTimeout(() => {
			const { container = 'overlay' } = this.props;
			const node = document.getElementById(container);
			if (!node) {
				return;
			}
			ReactDOM.unmountComponentAtNode(node);
		}, 1200);
	}

	render(): JSX.Element {
		const { message } = this.props;
		return (
			<div className="toast" ref={this.toast}>
				{message}
			</div>
		);
	}
}

export default Toast;
