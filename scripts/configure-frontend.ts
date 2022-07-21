import * as fs from 'fs';

import { deleteSync } from 'del';
import { difference } from 'lodash';
import copy from 'recursive-copy';

import { rsync, syncDirectory } from './utils/sync';
import { copyFromTemplate, getDirectoryFromCaller, onDistDirectoryExists } from './utils/files';

async function configureFrontendPublic() {
  await onDistDirectoryExists('frontend/public', async () => {
    await copyFromTemplate('tsconfig.public.json', 'frontend/public/tsconfig.json');
    await syncDirectory('frontend/public', 'src/public');
    await onDistDirectoryExists('backend/universal', async () => {
      await syncDirectory('backend/universal', 'src/public/universal');
    });
  });
}

async function configureFrontendPages() {
  await onDistDirectoryExists('frontend/pages', async () => {
    const distDir = getDirectoryFromCaller('./dist/frontend/pages');
    const srcDir = getDirectoryFromCaller('./dist/src/pages');
    const wixSrcDir = getDirectoryFromCaller('./src/pages');
    deleteSync(srcDir);
    await configurePages(distDir, srcDir, wixSrcDir);
    await rsync(`${srcDir}/`, wixSrcDir, { overwrite: false });
  });
}

async function configurePages(distDir: string, srcDir: string, wixSrcDir: string) {
  const typescriptPages = fs
    .readdirSync(distDir)
    .filter((file) => !file.endsWith('.spec.js'))
    .map((file) => file.split('.js')[0]);
  const corvidPagesDirectories = fs
    .readdirSync(wixSrcDir, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((directory) => directory.name);

  const pagesToCopy = corvidPagesDirectories
    .map((directory) => {
      const page = directory.split('.')[0];
      if (page && typescriptPages.includes(page)) {
        return [page, directory];
      }
    })
    .filter(Boolean);

  if (typescriptPages.length !== pagesToCopy.length) {
    const missingPages = difference(
      typescriptPages,
      pagesToCopy.map(([page]) => page),
    );
    throw new Error(`Typescript pages did not match source pages: ${missingPages}`);
  }

  await Promise.all(
    pagesToCopy.map(([page, directory]) => copy(`${distDir}/${page}.js`, `${srcDir}/${directory}/${page}.js`)),
  );
}

export async function configureFrontend() {
  await Promise.all([configureFrontendPublic(), configureFrontendPages()]);
}
