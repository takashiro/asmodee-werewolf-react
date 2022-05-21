import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Dropdown from '../Dropdown';
import Clickable from '../Clickable';
import ClickableList from '../ClickableList';

import './index.scss';

const msg = defineMessages({
	changeLanguage: { defaultMessage: 'Change Language' },
});

interface ListProps {
	languages: Map<string, string>;
	onSelect?: (language: string) => void;
}

function OptionList({
	languages,
	onSelect,
}: ListProps): JSX.Element {
	const intl = useIntl();

	function select(li: HTMLLIElement): void {
		const { lang } = li;
		if (lang) {
			onSelect?.(lang);
		}
	}

	function handleTrigger(e: React.SyntheticEvent<HTMLElement>): void {
		const li = e.target as HTMLLIElement;
		select(li);
	}

	const languageList = Array.from(languages.entries());
	return (
		<ClickableList
			role="menu"
			onTrigger={handleTrigger}
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
		</ClickableList>
	);
}

export default function LocaleList({
	languages,
	onSelect,
}: ListProps): JSX.Element {
	const intl = useIntl();
	const [expanded, setExpanded] = React.useState(false);
	const button = React.useRef<HTMLButtonElement>(null);

	function focus(): void {
		button.current?.focus();
	}

	function handleToggle(): void {
		setExpanded(!expanded);
	}

	function handleSelect(language: string): void {
		setExpanded(false);
		onSelect?.(language);
		focus();
	}

	function handleExit(): void {
		setExpanded(false);
		focus();
	}

	const label = intl.formatMessage(msg.changeLanguage);

	const renderContent = React.useCallback(() => (
		<OptionList
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
				ref={button}
				className="locale-icon"
				onTrigger={handleToggle}
				title={label}
				aria-label={label}
			/>
		</Dropdown>
	);
}
