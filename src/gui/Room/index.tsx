import React from 'react';

import Page from '../Page';

import Toast from '../component/Toast';

import RoleTable from './RoleTable';
import RoleViewer from './RoleViewer';
import shareTexts from './shareTexts';

import RoomModel from '../../model/Room';

import './index.scss';

interface RoomProps {
	room: RoomModel;
	onPageNagivated?: (page: Page) => void;
}

class Room extends React.Component<RoomProps> {
	protected linkAnchor = React.createRef<HTMLAnchorElement>();

	getShareUrl(): string {
		const { room } = this.props;
		const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
		return `${baseUrl}?id=${room.getId()}`;
	}

	handleShareLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		const success = this.copyShareLink();
		if (success) {
			Toast.makeToast('成功复制该链接。');
		} else {
			Toast.makeToast('复制失败。请手动长按该链接，然后分享给好友。');
		}
	}

	handleReturn = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const { onPageNagivated } = this.props;
		if (onPageNagivated) {
			setTimeout(onPageNagivated, 0, Page.Lobby);
		}
	}

	copyShareLink(): boolean {
		const linkAnchor = this.linkAnchor.current;
		if (!linkAnchor) {
			return false;
		}

		const shareUrl = this.getShareUrl();
		const shareText = shareTexts[Math.floor(Math.random() * shareTexts.length)];

		const linkInput = document.createElement('input');
		linkInput.type = 'text';
		linkInput.value = `\uD83D\uDC3A狼人杀 ${shareUrl} ${shareText}`;
		linkInput.contentEditable = 'true';
		linkInput.readOnly = false;

		linkAnchor.innerHTML = '';
		linkAnchor.append(linkInput);

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
		linkAnchor.innerHTML = shareUrl;

		return success;
	}

	render(): JSX.Element {
		const { room } = this.props;
		const roles = room.getRoles();
		const shareUrl = this.getShareUrl();
		return (
			<div>
				<div className="inline-message">
					房间号：
					{room.getId()}
				</div>
				{roles && <RoleTable roles={roles} />}
				{!room.isOwner() && <RoleViewer player={room.createPlayer()} />}
				<div className="box share-link-area">
					<span className="label">邀请链接</span>
					<a href={shareUrl} onClick={this.handleShareLinkClick} ref={this.linkAnchor}>{shareUrl}</a>
				</div>
				<div className="button-area">
					{/* (this.isOwner() ? <button onClick={this.openGodNote}>上帝助手</button> : null) */}
					<button type="button" onClick={this.handleReturn}>返回</button>
				</div>
			</div>
		);
	}
}

export default Room;
