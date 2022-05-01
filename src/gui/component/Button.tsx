import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ComponentType;
	onTrigger: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export default function Button(props: ButtonProps): JSX.Element {
	const {
		component: Component = 'div',
		tabIndex = 0,
		onTrigger,
		onClick,
		onKeyDown,
		children,
		...otherProps
	} = props;

	function handleClick(e: React.MouseEvent<HTMLElement>): void {
		onTrigger(e);
		onClick?.(e);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
		if (e.key === 'Enter' && !e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}

	return (
		<Component
			{...otherProps}
			tabIndex={tabIndex}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</Component>
	);
}
