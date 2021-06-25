import { syncDirectory } from './utils/sync';
import { copyFromSource, copyFromTemplate, renameInDist } from './utils/files';

export async function configureBackend() {
  await renameInDist('backend/backend-api.js', 'backend/backend-api.jsw');
  await copyFromTemplate('tsconfig.backend.json', 'backend/tsconfig.json');
  await copyFromSource('backend', 'backend', { filter: '*.config' });
  await syncDirectory('backend', 'src/backend');
}
