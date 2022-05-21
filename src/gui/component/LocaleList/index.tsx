import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Dropdown from '../Dropdown';
import isKeyModified from '../../../util/isKeyModified';

import './index.scss';
import Clickable from '../Clickable';

const msg = defineMessages({
	changeLanguage: { defaultMessage: 'Change Language' },
});

interface ListProps {
	languages: Map<string, string>;
	onSelect?: (language: string) => void;
}

function DropdownList({
	languages,
	onSelect,
}: ListProps): JSX.Element {
	const ul = React.useRef<HTMLUListElement>(null);
	const intl = useIntl();

	function select(li: HTMLLIElement): void {
		const { lang } = li;
		if (lang) {
			onSelect?.(lang);
		}
	}

	function handleClick(e: React.MouseEvent<HTMLUListElement>): void {
		const li = e.target as HTMLLIElement;
		select(li);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>): void {
		if (isKeyModified(e)) {
			return;
		}

		const li = e.target as HTMLLIElement;
		if ((e.key === 'Space' || e.key === 'Enter')) {
			select(li);
		} else if (e.key === 'ArrowUp') {
			const prev = li.previousElementSibling as HTMLElement;
			prev?.focus();
		} else if (e.key === 'ArrowDown') {
			const next = li.nextElementSibling as HTMLElement;
			next?.focus();
		}
	}

	React.useEffect(() => {
		const first = ul.current?.firstElementChild as HTMLLIElement;
		first?.focus();
	});

	const languageList = Array.from(languages.entries());
	return (
		<ul
			ref={ul}
			role="menu"
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={intl.formatMessage(msg.changeLanguage)}
		>
			{languageList.map(([localeId, localeName]) => (
				<li
					role="menuitem"
					tabIndex={0}
					key={localeId}
					lang={localeId}
				>
					{localeName}
				</li>
			))}
		</ul>
	);
}

export default function LocaleList({
	languages,
	onSelect,
}: ListProps): JSX.Element {
	const intl = useIntl();
	const [expanded, setExpanded] = React.useState(false);

	function handleClick(): void {
		setExpanded(!expanded);
	}

	function handleSelect(language: string): void {
		setExpanded(false);
		onSelect?.(language);
	}

	function handleExit(): void {
		setExpanded(false);
	}

	const label = intl.formatMessage(msg.changeLanguage);

	const renderContent = React.useCallback(() => (
		<DropdownList
			languages={languages}
			onSelect={handleSelect}
		/>
	), []);

	return (
		<Dropdown
			className="locale-list"
			expanded={expanded}
			onExit={handleExit}
			contentRenderer={renderContent}
		>
			<Clickable
				className="locale-icon"
				role="button"
				tabIndex={0}
				onTrigger={handleClick}
				title={label}
				aria-label={label}
			/>
		</Dropdown>
	);
}
