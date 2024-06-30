import React, { useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';

import './index.scss';

interface ToastProps {
	children: React.ReactNode;
	root: Root;
}

export default function Toast({
	children,
	root,
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
			root.unmount();
		}, 1200);
	});

	return (
		<div className="toast" role="alert" ref={toast}>
			{children}
		</div>
	);
}

export function makeToast(message: React.ReactNode, container = 'overlay'): void {
	const root = createRoot(document.getElementById(container)!);
	root.render(<Toast root={root}>{message}</Toast>);
}
