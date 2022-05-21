import React from 'react';

import isKeyModified from '../../util/isKeyModified';

interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
	onTrigger: (e: React.SyntheticEvent<HTMLElement>) => void;
	component?: React.ElementType;
	disabled?: boolean;
	elementRef?: React.ForwardedRef<HTMLElement>;
}

export function Clickable(props: ClickableProps): JSX.Element {
	const {
		component: Component = 'button',
		tabIndex = 0,
		onTrigger,
		onClick,
		onKeyDown,
		disabled,
		children,
		elementRef,
		...otherProps
	} = props;

	function handleClick(e: React.MouseEvent<HTMLElement>): void {
		onTrigger(e);
		onClick?.(e);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
		if (!isKeyModified(e) && (e.key === 'Space' || e.key === 'Enter')) {
			onTrigger(e);
			e.preventDefault();
			e.stopPropagation();
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
			ref={elementRef}
		>
			{children}
		</Component>
	);
}

export default React.forwardRef<HTMLElement, ClickableProps>(
	(props, ref) => <Clickable {...props} elementRef={ref} />,
);
