import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

interface ToastProps {
	children: React.ReactNode;
	container?: string;
}

export default function Toast({
	children,
	container = 'overlay',
}: ToastProps): JSX.Element {
	const toast = React.useRef<HTMLDivElement>(null);

	useEffect((): void => {
		setTimeout(() => {
			const t = toast.current;
			if (!t) {
				return;
			}
			t.classList.add('in');
		}, 0);

		setTimeout(() => {
			const t = toast.current;
			if (!t) {
				return;
			}
			t.classList.remove('in');
			t.classList.add('out');
		}, 900);

		setTimeout(() => {
			const node = document.getElementById(container);
			if (!node) {
				return;
			}
			ReactDOM.unmountComponentAtNode(node);
		}, 1200);
	});

	return (
		<div className="toast" ref={toast}>
			{children}
		</div>
	);
}

export function makeToast(message: React.ReactNode, container = 'overlay'): void {
	ReactDOM.render(
		<Toast>{message}</Toast>,
		document.getElementById(container),
	);
}
