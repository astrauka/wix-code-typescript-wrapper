import { rsync } from './rsync';
import { getDirectoryFromRoot } from './paths';

export async function initializeProject() {
  const callerPath = process.cwd();
  const initialStructurePath = getDirectoryFromRoot('./initial-structure');
  console.info(`Copying ${initialStructurePath} to ${callerPath}`);
  await rsync(`${initialStructurePath}/`, `${callerPath}/`, { overwrite: false });
  console.info('Done');
}
