import { exec } from 'child_process';

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
