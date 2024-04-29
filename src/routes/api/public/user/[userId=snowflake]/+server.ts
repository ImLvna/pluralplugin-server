import simplyPluralGet from '$lib/server/sp';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const fronters = await simplyPluralGet('fronters', locals.spToken);

	console.log(fronters);

	const { id } = await simplyPluralGet('me', locals.spToken);

	const members = await simplyPluralGet(`members/${id}`, locals.spToken);

	return json(
		fronters
			.map((fronter: { content: { uid: string } }) => {
				console.log(fronter);
				const member = members.find(
					(member: { content: { uid: string } }) => member.content.uid === fronter.content.uid
				);
				if (member.content.private) return null;
				return member.content.name;
			})
			.filter(Boolean)
	);
};
