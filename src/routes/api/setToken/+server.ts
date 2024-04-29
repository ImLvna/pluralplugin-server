import data, { saveData } from '$lib/server/data';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const { token } = await request.json();

	data.systems[locals.user.id] = token;
	saveData();
	return json({ token });
};
