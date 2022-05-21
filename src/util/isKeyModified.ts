import React from 'react';

export default function isKeyModified(e: React.KeyboardEvent): boolean {
	return e.altKey || e.shiftKey || e.ctrlKey || e.metaKey;
}
