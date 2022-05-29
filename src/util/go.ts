import Page from '../model/Page';

interface LocationParams {
	id?: number | string;
}

export default function go(page: Page, params?: LocationParams): void {
	const state = {
		page,
		...params,
	};
	const query = params && new URLSearchParams({
		id: String(params.id),
	});
	window.history.pushState(state, '', query ? `./?${query.toString()}` : '.');
	window.dispatchEvent(new PopStateEvent('popstate', { state }));
}
