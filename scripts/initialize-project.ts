import { rsync } from './rsync';
import { getDirectoryFromCaller, getDirectoryFromLibrary } from './paths';

export async function initializeProject() {
  const callerPath = getDirectoryFromCaller();
  const initialStructurePath = getDirectoryFromLibrary('./initial-structure');
  console.info(`Copying ${initialStructurePath} to ${callerPath}`);
  await rsync(`${initialStructurePath}/`, `${callerPath}/`, { overwrite: false });
  console.info('Done');
}
