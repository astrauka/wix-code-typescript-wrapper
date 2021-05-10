import { exec } from 'child_process';

export async function rsync(source: string, destination: string, { override = true } = {}) {
  await exec(
    `rsync -cr ${override ? '--delete --force' : ''} ${source} ${destination}`,
    (error, stdout, stderr) => {
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
    }
  );
}
