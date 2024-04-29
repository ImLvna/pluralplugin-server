import simplyPluralGet from '$lib/server/sp';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const fronters = await simplyPluralGet('fronters', locals.spToken);

	const { id } = await simplyPluralGet('me', locals.spToken);

	const members = await simplyPluralGet(`members/${id}`, locals.spToken);

	return json(
		fronters
			.map((fronter: { content: { member: string } }) => {
				const member = members.find(
					(member: { id: string }) => member.id === fronter.content.member
				);
				if (member.content.private) return null;
				return member.content.name;
			})
			.filter(Boolean)
	);
};
