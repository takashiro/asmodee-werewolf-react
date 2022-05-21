import React from 'react';

export default async function isFocusOut(e: React.FocusEvent): Promise<boolean> {
	const container = e.currentTarget;
	const { relatedTarget } = e;
	if (!relatedTarget || !(relatedTarget instanceof HTMLElement)) {
		return true;
	}

	if (container === relatedTarget || container.contains(relatedTarget)) {
		return false;
	}

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(!container.contains(document.activeElement));
		}, 0);
	});
}
