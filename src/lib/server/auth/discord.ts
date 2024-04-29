import { DISCORD_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import type { APIUser } from 'discord-api-types/v9';
import data, { saveData } from '../data';

export async function refreshAuth(token: string): Promise<string | false> {
	if (!data.tokens[token]) {
		return false;
	}

	const [refresh] = data.tokens[token];
	try {
		const res = await fetch(`https://discord.com/api/oauth2/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: PUBLIC_DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: refresh
			})
		}).then((res) => res.json());

		data.tokens[res.access_token] = [res.refresh_token, Date.now() + res.expires_in * 1000];
		delete data.tokens[token];
		saveData();
		return res.access_token;
	} catch (e) {
		return false;
	}
}

export default async function checkAuth(
	token: string
): Promise<{ newToken?: string; user: APIUser } | false> {
	if (!data.tokens[token]) {
		return false;
	}

	try {
		const res: APIUser = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((res) => res.json());

		if (data.tokens[token][1] < Date.now() + 1000 * 60 * 24) {
			const newToken = await refreshAuth(token);
			if (newToken) {
				return { newToken, user: res };
			}
		}
		return { user: res };
	} catch (e) {
		return false;
	}
}

export async function checkNewAuth(code: string, redirect: string): Promise<string | false> {
	try {
		const res = await fetch(`https://discord.com/api/oauth2/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: PUBLIC_DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				redirect_uri: redirect,
				code,
				scope: 'identify'
			})
		}).then((res) => res.json());

		data.tokens[res.access_token] = [res.refresh_token, Date.now() + res.expires_in * 1000];

		saveData();
		return res.access_token;
	} catch (e) {
		return false;
	}
}
