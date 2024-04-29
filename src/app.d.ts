// See https://kit.svelte.dev/docs/types#app

import type { APIUser } from 'discord-api-types/v9';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: APIUser;
			spToken: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
