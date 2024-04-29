import type { Snowflake } from 'discord-api-types/globals';

export interface Data {
	systems: Record<Snowflake, string>;
	tokens: Record<string, [string, number]>;
}
