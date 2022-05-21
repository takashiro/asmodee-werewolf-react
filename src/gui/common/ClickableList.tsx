import React from 'react';

import Clickable from './Clickable';
import isKeyModified from '../../util/isKeyModified';

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
	onTrigger: (e: React.SyntheticEvent<HTMLElement>) => void;
	children?: React.ReactNode;
}

export default function ClickableList({
	children,
	onKeyDown,
	...otherProps
}: ListProps): JSX.Element {
	const ul = React.useRef<HTMLUListElement>(null);

	function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>): void {
		if (isKeyModified(e)) {
			return;
		}

		const li = e.target as HTMLLIElement;
		if (e.key === 'ArrowUp') {
			const prev = li.previousElementSibling as HTMLElement;
			prev?.focus();
		} else if (e.key === 'ArrowDown') {
			const next = li.nextElementSibling as HTMLElement;
			next?.focus();
		}

		onKeyDown?.(e);
	}

	React.useEffect(() => {
		const first = ul.current?.firstElementChild as HTMLElement;
		if (first && 'focus' in first) {
			first.focus();
		}
	});

	return (
		<Clickable
			component="ul"
			{...otherProps}
			ref={ul}
			tabIndex={undefined}
			onKeyDown={handleKeyDown}
		>
			{children}
		</Clickable>
	);
}
