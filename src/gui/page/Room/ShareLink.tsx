import React from 'react';
import {
	defineMessage,
	IntlShape,
	MessageDescriptor,
	useIntl,
} from 'react-intl';

import { makeToast } from '../../component/Toast';

interface ShareLinkProps {
	id: number;
}

const title = defineMessage({ defaultMessage: 'Werewolves of the Miller\'s Hollow' });
const successfullyCopiedShareLink = defineMessage({ defaultMessage: 'Successfully copied the share link.' });
const failedToCopyShareLink = defineMessage({ defaultMessage: 'Failed to copy the share link. Please do it manually.' });

const shareTexts: MessageDescriptor[] = [
	defineMessage({ defaultMessage: 'I am the real seer this time!' }),
	defineMessage({ defaultMessage: 'Too dirty, bro!' }),
	defineMessage({ defaultMessage: 'Come on! Attack me tonight!' }),
	defineMessage({ defaultMessage: 'Close your eyes now.' }),
	defineMessage({ defaultMessage: 'I\'ll shot you if opted out.' }),
	defineMessage({ defaultMessage: 'I\'ll poison whoever talks like a werewolf.' }),
	defineMessage({ defaultMessage: 'Confess your role or get yourself killed.' }),
	defineMessage({ defaultMessage: 'The weakest werewolves cheat the witch.' }),
	defineMessage({ defaultMessage: 'Who shall I attack tonight?' }),
	defineMessage({ defaultMessage: 'You can\'t be the alpha wolf, can you?' }),
	defineMessage({ defaultMessage: 'You are nothing else but a werewolf.' }),
	defineMessage({ defaultMessage: 'Make up more! Your lies are almost true!' }),
	defineMessage({ defaultMessage: 'Opt out the werewolf I saw!' }),
];

function copyShareLink(intl: IntlShape, shareLink: string, anchor: HTMLAnchorElement): boolean {
	const titleText = intl.formatMessage(title);
	const shareText = intl.formatMessage(shareTexts[Math.floor(Math.random() * shareTexts.length)]);

	const linkInput = document.createElement('input');
	linkInput.type = 'text';
	linkInput.value = `\uD83D\uDC3A${titleText} ${shareLink} ${shareText}`;
	linkInput.contentEditable = 'true';
	linkInput.readOnly = false;

	anchor.textContent = '';
	anchor.append(linkInput);

	linkInput.focus();
	linkInput.select();
	const range = document.createRange();
	range.selectNodeContents(linkInput);
	const selection = window.getSelection();
	if (!selection) {
		return false;
	}

	selection.removeAllRanges();
	selection.addRange(range);
	linkInput.setSelectionRange(0, linkInput.value.length);
	const success = document.execCommand('copy');

	linkInput.readOnly = true;
	anchor.textContent = shareLink;

	return success;
}

export default function ShareLink(props: ShareLinkProps): JSX.Element {
	const intl = useIntl();
	const { id } = props;

	const { origin, pathname } = window.location;
	const shareLink = `${origin}${pathname}?id=${id}`;

	const a = React.useRef<HTMLAnchorElement>(null);

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
		if (!a.current) {
			return;
		}

		e.preventDefault();
		const success = copyShareLink(intl, shareLink, a.current);
		if (success) {
			makeToast(intl.formatMessage(successfullyCopiedShareLink));
		} else {
			makeToast(intl.formatMessage(failedToCopyShareLink));
		}
	}

	return (
		<a
			href={shareLink}
			onClick={handleClick}
			ref={a}
		>
			{shareLink}
		</a>
	);
}
