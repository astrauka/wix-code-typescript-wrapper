import { rsync } from './utils/sync';
import { getDirectoryFromCaller, getDirectoryFromLibrary } from './utils/files';

export async function initializeProject() {
  const callerPath = getDirectoryFromCaller();
  const initialStructurePath = getDirectoryFromLibrary('./initial-structure');
  console.info(`Copying ${initialStructurePath} to ${callerPath}`);
  await rsync(`${initialStructurePath}/`, `${callerPath}/`, { overwrite: false });
  console.info('Done');
}
