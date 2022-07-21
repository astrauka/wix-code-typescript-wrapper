import { exec } from 'child_process';

import copy from 'recursive-copy';
import { deleteSync } from 'del';

import { getDirectoryFromCaller } from './files';

export async function rsync(source: string, destination: string, { overwrite = true } = {}) {
  await exec(`rsync -cr ${overwrite ? '--delete --force' : ''} ${source} ${destination}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    if (stdout) {
      console.info(`stdout: ${stdout}`);
    }
  });
}

export async function syncDirectory(from: string, to: string) {
  const compiledSource = getDirectoryFromCaller(`./dist/${to}`);
  deleteSync(compiledSource);
  await copy(getDirectoryFromCaller(`./dist/${from}`), compiledSource, {
    filter: ['**/*.js', '**/*.jsw', '**/*.json', '!**/*.spec.js'],
  });
  await rsync(`${compiledSource}/`, getDirectoryFromCaller(`./${to}`));
}
