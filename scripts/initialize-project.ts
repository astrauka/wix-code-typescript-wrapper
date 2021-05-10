import * as path from 'path';

import { rsync } from './rsync';

const CURRENT_DIR = path.resolve(__dirname, './');
const INITIAL_STRUCTURE_DIR = path.resolve(CURRENT_DIR, '../initial-structure');
const DESTINATION_DIR = path.resolve(CURRENT_DIR, './destination');

export async function initializeProject() {
  await rsync(`${INITIAL_STRUCTURE_DIR}/`, path.resolve(CURRENT_DIR, '../src/backend'));
}
