import * as fs from 'fs';

import * as del from 'del';
import * as copy from 'recursive-copy/lib/copy';

import { rsync } from './rsync';
import { getDirectoryFromCaller, getDirectoryFromLibrary } from './paths';

export async function configureBackend() {
  const backendSrcDir = getDirectoryFromCaller('./dist/src/backend');

  await del(backendSrcDir);
  await copy(getDirectoryFromCaller('./dist/backend'), backendSrcDir, { filter: ['**/*.js', '!**/*.spec.js'] });
  await copy(
    getDirectoryFromLibrary('./templates/tsconfig.backend.json'),
    getDirectoryFromCaller(`${backendSrcDir}/tsconfig.json`),
  );
  fs.renameSync(`${backendSrcDir}/backend-api.js`, `${backendSrcDir}/backend-api.jsw`);
  await rsync(`${backendSrcDir}/`, getDirectoryFromCaller('./src/backend'));
}
