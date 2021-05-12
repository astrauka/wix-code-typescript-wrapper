import { syncDirectory } from './utils/sync-directory';

export async function configureBackend() {
  await syncDirectory('backend', 'src/backend');
}
