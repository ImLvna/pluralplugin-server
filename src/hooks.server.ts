import checkAuth from '$lib/server/auth/discord';
import data from '$lib/server/data';
import { error, redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith('/api/public') && !event.url.pathname.startsWith('/login')) {
		const token = event.cookies.get('token');
		if (!token) return redirect(302, '/login');

		const res = await checkAuth(token);

		if (!res) return redirect(302, '/login');

		if (res.newToken) {
			event.cookies.set('token', res.newToken, {
				maxAge: 31556952000,
				path: '/'
			});
		}

		event.locals.user = res.user;

		if (data.systems[res.user.id]) {
			event.locals.spToken = data.systems[res.user.id];
		}
	}

	event.locals.spToken = event.locals.spToken ?? '';

	if (event.url.pathname.startsWith('/api/public/user')) {
		const spToken = data.systems[event.params.userId ?? ''];
		if (spToken) {
			event.locals.spToken = spToken;
		} else {
			return error(404, 'User not found');
		}
	}

	const response = await resolve(event);
	response.headers.set('cache-control', 'private, no-store, max-age=0');
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return response;
};
