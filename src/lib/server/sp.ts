export default async function simplyPluralGet(path: string, token: string) {
	const res = await fetch(`https://api.apparyllis.com/v1/${path}`, {
		method: 'GET',
		headers: {
			Authorization: token
		}
	});

	return await res.json();
}

export async function simplyPluralGetText(path: string, token: string) {
	const res = await fetch(`https://api.apparyllis.com/v1/${path}`, {
		method: 'GET',
		headers: {
			Authorization: token
		}
	});

	return await res.text();
}
