import React from 'react';

import isKeyModified from '../../util/isKeyModified';

interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
	onTrigger: (e: React.SyntheticEvent<HTMLElement>) => void;
	component?: React.ElementType;
	disabled?: boolean;
}

export default function Clickable(props: ClickableProps): JSX.Element {
	const {
		component: Component = 'button',
		tabIndex = 0,
		onTrigger,
		onClick,
		onKeyDown,
		disabled,
		children,
		...otherProps
	} = props;

	function handleClick(e: React.MouseEvent<HTMLElement>): void {
		onTrigger(e);
		onClick?.(e);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
		if (!isKeyModified(e) && (e.key === 'Space' || e.key === 'Enter')) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}

	return (
		<Component
			{...otherProps}
			tabIndex={tabIndex}
			onClick={disabled ? undefined : handleClick}
			onKeyDown={disabled ? undefined : handleKeyDown}
			aria-disabled={disabled}
		>
			{children}
		</Component>
	);
}
