import React from 'react';
import { languages } from '../../model/Locale';

import LocaleList from '../common/LocaleList';

import './ContentInfo.scss';

interface ContentInfoProps {
	onLanguageChange?(language: string): void;
}

export default function ContentInfo({
	onLanguageChange,
}: ContentInfoProps): JSX.Element {
	return (
		<>
			<LocaleList
				languages={languages}
				onSelect={onLanguageChange}
			/>
			<ul className="dev-info">
				<li><a href="https://github.com/takashiro/Werewolf">About</a></li>
				<li><a href="https://github.com/takashiro/Werewolf/issues/new">Report a Bug</a></li>
			</ul>
			<div className="copyright">
				<p>Werewolves of Miller&apos;s Hollow</p>
				<p>
					<span>Designed by </span>
					<a href="http://langrensha.163.com">Netease Game</a>
				</p>
				<p>Authored by Kazuichi Takashiro © 2017 - 2022</p>
			</div>
		</>
	);
}
