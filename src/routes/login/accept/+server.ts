import { checkNewAuth } from '$lib/server/auth/discord';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	if (!url.searchParams.has('code')) {
		return error(400, 'Missing code');
	}

	const redirectUri = new URL(url.toString());
	redirectUri.pathname = '/login/accept';
	redirectUri.search = '';
	const token = await checkNewAuth(url.searchParams.get('code')!, redirectUri.toString());
	if (!token) {
		return error(400, 'Invalid code');
	}

	cookies.set('token', token, {
		maxAge: 31556952000,
		path: '/'
	});

	return redirect(302, '/');
};
