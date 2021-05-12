import * as copy from 'recursive-copy/lib/copy';
import * as del from 'del';

import { getDirectoryFromCaller } from './paths';
import { rsync } from './rsync';

export async function syncDirectory(from: string, to: string) {
  const compiledSource = getDirectoryFromCaller(`./dist/${to}`);
  await del(compiledSource);
  await copy(getDirectoryFromCaller(`./dist/${from}`), compiledSource, { filter: ['**/*.js', '!**/*.spec.js'] });
  await rsync(`${compiledSource}/`, getDirectoryFromCaller(`./${to}`));
}
