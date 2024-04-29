import simplyPluralGet from '$lib/server/sp';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const { id } = await simplyPluralGet('me', locals.spToken);
	return json(await simplyPluralGet(`members/${id}`, locals.spToken));
};
