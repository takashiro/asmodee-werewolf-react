import React from 'react';

import Client from '../../model/Client';
import HttpError from '../../model/HttpError';
import Room from '../../model/Room';

import Page from '../Page';

import './index.scss';

interface LoaderProps {
	id: number;
	onPageOpen?: (page: Page, room: Room) => void;
}

export default function RoomLoader(props: LoaderProps): JSX.Element {
	const {
		id,
		onPageOpen,
	} = props;

	const [message, setMessage] = React.useState('');

	async function enterRoom(): Promise<void> {
		const client = new Client();
		const room = new Room(client);
		if (!room.restore(id)) {
			try {
				await room.enter(id);
			} catch (error) {
				if (error instanceof HttpError && error.code === 404) {
					setMessage('房间不存在。');
				} else {
					setMessage('未知错误。');
				}
				return;
			}
			room.save();
		}

		if (onPageOpen) {
			onPageOpen(Page.Room, room);
		}
	}

	React.useEffect((): void => {
		enterRoom();
	});

	return (
		<div className="room-loader">
			{message ? (
				<>
					<div className="main">
						<div className="inline-message">
							{message}
						</div>
					</div>
					<div className="button-area">
						<a className="button" href=".">返回</a>
					</div>
				</>
			) : (
				<div className="main">
					<div className="inline-message">
						加载中...
					</div>
				</div>
			)}
		</div>
	);
}
