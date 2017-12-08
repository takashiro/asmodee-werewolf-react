
const net = DeclareCommand(
	'ArrangeRole',
	'FetchRole',
	'UpdateRole',

	'WerewolfCommandCount'
);

$client = new Client;

$client.bind(net.RequestUserId, user_id => {
	$user.id = user_id;
	$client.request(net.Login, {
		uid: user_id
	});
	window.localStorage.setItem('nickname', $user.name);
});

$client.bind(net.Login, uid => {
	$user.id = uid;
	if (uid > 0) {
		LoadPage('enter-lobby');
	} else {
		MakeToast('Login failed.');
	}
});

$client.bind(net.ArrangeRole, roles => {

});

$client.bind(net.UpdateRole, info => {

});

$client.bind(net.FetchRole, role => {

});
