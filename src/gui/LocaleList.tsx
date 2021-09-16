import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import './LocaleList.scss';

const msg = defineMessages({
	changeLanguage: { defaultMessage: 'Change Language' },
});

const languageNames = new Map<string, string>([
	['en-US', 'English (United States)'],
	['en-GB', 'English (United Kingdom)'],
	['zh-Hans', '中文（简体）'],
	['zh-Hant', '中文（繁体）'],
	['yue', '中文（粤语）'],
]);

interface ListProps {
	languages: string[];
	onSelect: (language: string) => void;
}

function Dropdown(props: ListProps): JSX.Element {
	const {
		languages,
		onSelect,
	} = props;

	function select(li: HTMLLIElement): void {
		const { lang } = li;
		if (lang) {
			onSelect(lang);
		}
	}

	function handleClick(e: React.MouseEvent<HTMLUListElement>): void {
		const li = e.target as HTMLLIElement;
		select(li);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>): void {
		const li = e.target as HTMLLIElement;
		if (e.key === 'Space' || e.key === 'Enter') {
			select(li);
		} else if (e.key === 'ArrowUp') {
			const prev = li.previousElementSibling as HTMLElement;
			prev?.focus();
		} else if (e.key === 'ArrowDown') {
			const next = li.nextElementSibling as HTMLElement;
			next?.focus();
		}
	}

	return (
		<ul
			role="menu"
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{languages.map((lang) => (
				<li
					role="menuitem"
					tabIndex={0}
					key={lang}
					lang={lang}
				>
					{languageNames.get(lang) || lang}
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

	function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>): void {
		if (e.key === 'Space' || e.key === 'Enter') {
			setExpanded(!expanded);
		}
	}

	function handleSelect(language: string): void {
		setExpanded(false);
		onSelect(language);
	}

	const label = intl.formatMessage(msg.changeLanguage);
	return (
		<div className="locale-list">
			<div
				className="locale-icon"
				role="button"
				tabIndex={0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				title={label}
				aria-label={label}
			/>
			{expanded && (
				<>
					<div className="curtain" />
					<Dropdown
						languages={languages}
						onSelect={handleSelect}
					/>
				</>
			)}
		</div>
	);
}
