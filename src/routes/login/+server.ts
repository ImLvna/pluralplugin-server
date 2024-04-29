import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import { redirect, type RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = ({ url }) => {
	const redirectUri = new URL(url.toString());
	redirectUri.pathname = '/login/accept';
	return redirect(
		302,
		`https://discord.com/oauth2/authorize?client_id=${PUBLIC_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri.toString())}&scope=identify`
	);
};
