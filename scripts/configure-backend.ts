import * as fs from 'fs';

import { syncDirectory } from './utils/sync-directory';
import { getDirectoryFromCaller } from './utils/paths';

export async function configureBackend() {
  const backendDst = getDirectoryFromCaller('./dist/backend');
  fs.renameSync(`${backendDst}/backend-api.js`, `${backendDst}/backend-api.jsw`);
  await syncDirectory('backend', 'src/backend');
}
