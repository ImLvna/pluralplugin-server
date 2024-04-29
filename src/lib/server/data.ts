import type { Data } from '$lib/types/data';
import { existsSync, readFileSync, writeFileSync } from 'fs';

let dataDir = './data';

if (!existsSync('./data')) {
	if (existsSync('../data')) {
		dataDir = '../data';
	} else if (existsSync('../../data')) {
		dataDir = '../../data';
	} else if (existsSync('/data')) {
		dataDir = '/data';
	}
}

export const DATA_DIR = dataDir;
export const DATA_PATH = `${dataDir}/data.json`;

const data: Data = (() => {
	try {
		return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
	} catch {
		return {
			systems: {},
			tokens: {}
		};
	}
})();

export default data;

export function saveData() {
	writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}
