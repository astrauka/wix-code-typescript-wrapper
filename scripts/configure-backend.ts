import * as del from 'del';
import * as fs from 'fs';
import * as path from 'path';
import * as copy from 'recursive-copy/lib/copy';
import { rsync } from './rsync';

const CURRENT_DIR = path.resolve(__dirname, './');
const DIST_DIR = path.resolve(CURRENT_DIR, '../dist');
const SRC_DIR = path.resolve(DIST_DIR, './src');

async function configureBackend() {
  const BACKEND_DIST_DIR = path.resolve(DIST_DIR, './backend');
  const BACKEND_SRC_DIR = path.resolve(SRC_DIR, './backend');

  await del(BACKEND_SRC_DIR);
  await copy(BACKEND_DIST_DIR, BACKEND_SRC_DIR, { filter: ['**/*.js', '!**/*.spec.js'] });
  await copy(`${CURRENT_DIR}/tsconfig.backend.json`, `${BACKEND_SRC_DIR}/tsconfig.json`);
  fs.renameSync(`${BACKEND_SRC_DIR}/backend-api.js`, `${BACKEND_SRC_DIR}/backend-api.jsw`);
  fs.renameSync(`${BACKEND_SRC_DIR}/data-hooks.js`, `${BACKEND_SRC_DIR}/data.js`);
  await rsync(`${BACKEND_SRC_DIR}/`, path.resolve(CURRENT_DIR, '../src/backend'));
}

configureBackend().then(() => console.log('Done'));
