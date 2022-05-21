import React from 'react';

import isFocusOut from '../../util/isFocusOut';
import isKeyModified from '../../util/isKeyModified';

interface DropdownProps {
	expanded: boolean;
	onExit: () => void;
	className?: string;
	contentRenderer: () => React.ReactNode;
	children?: React.ReactNode;
}

export default function Dropdown({
	expanded,
	onExit,
	className,
	children,
	contentRenderer,
}: DropdownProps): JSX.Element {
	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
		if (expanded && e.key === 'Escape' && !isKeyModified(e)) {
			onExit?.();
		}
	}

	async function handleBlur(e: React.FocusEvent<HTMLDivElement>): Promise<void> {
		if (expanded && await isFocusOut(e)) {
			onExit?.();
		}
	}

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			className={className}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
		>
			{children}
			{expanded && (
				<>
					<div className="curtain" />
					{contentRenderer()}
				</>
			)}
		</div>
	);
}
