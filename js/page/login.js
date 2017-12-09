
(()=>{
	let connected = false;

	$client.on('open', ()=>{
		connected = true;
		ShowMessage('正在登录...');
		if (!$user.id) {
			$client.request(net.RequestUserId);
		} else {
			$client.request(net.Login, {
				uid: $user.id
			});
		}
	});

	$client.on('close', ()=>{
		if (!connected) {
			ShowMessage('无法连接到服务器 ' + $client.url);
		} else {
			ShowMessage('连接已断开。');
		}
	});

	$client.on('error', e => {
		ShowMessage(e.toString());
	});
})();

DeclareModule('page/login', () => {
	ShowMessage('正在连接...');
	if ($client.connected && $user.id > 0) {
		LoadPage('enter-lobby');
	} else {
		try {
			if ($_GET['server']) {
				$client.connect($_GET['server']);
			} else {
				let match = location.href.match(/^(\w+)\:\/\/(.*?)(?:\/.*)?$/i);
				if (match) {
					if (match[1] == 'file') {
						$client.connect('localhost');
					} else {
						$client.connect(match[2]);
					}
				}
			}
		} catch (e) {
			ShowMessage(e.toString());
		}
	}
});
