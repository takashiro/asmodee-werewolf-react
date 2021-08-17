import React from 'react';

import Toast from '../component/Toast';

interface ShareLinkProps {
	id: number;
}

const shareTexts: string[] = [
	'我这次是真的预言家！',
	'老哥太脏了！',
	'来啊首刀我啊！',
	'天黑请闭眼',
	'出我我就带走你',
	'谁发言不好我就毒谁',
	'拍不出身份今天就出你',
	'一天到晚就知道骗药！',
	'今晚刀谁呢？',
	'你该不会是狼王吧？',
	'你就是铁狼一匹',
	'加油！吹得快像真的了！',
	'今天就先出我的查杀',
];

function copyShareLink(shareLink: string, anchor: HTMLAnchorElement): boolean {
	const shareText = shareTexts[Math.floor(Math.random() * shareTexts.length)];

	const linkInput = document.createElement('input');
	linkInput.type = 'text';
	linkInput.value = `\uD83D\uDC3A狼人杀 ${shareLink} ${shareText}`;
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
	const { id } = props;

	const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
	const shareLink = `${baseUrl}?id=${id}`;

	const a = React.useRef<HTMLAnchorElement>(null);

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
		if (!a.current) {
			return;
		}

		e.preventDefault();
		const success = copyShareLink(shareLink, a.current);
		if (success) {
			Toast.makeToast('成功复制该链接。');
		} else {
			Toast.makeToast('复制失败。请手动长按该链接，然后分享给好友。');
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
