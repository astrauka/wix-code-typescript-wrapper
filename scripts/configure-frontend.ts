import * as del from 'del';
import * as fs from 'fs';
import { difference } from 'lodash';
import * as path from 'path';
import * as copy from 'recursive-copy/lib/copy';
import { rsync } from './rsync';

const CURRENT_DIR = path.resolve(__dirname, './');
const DIST_DIR = path.resolve(CURRENT_DIR, '../dist');
const SRC_DIR = path.resolve(DIST_DIR, './src');

async function configureFrontendPublic() {
  const PUBLIC_DIST_DIR = path.resolve(DIST_DIR, './frontend/public');
  const PUBLIC_SRC_DIR = path.resolve(SRC_DIR, './public');
  const UNIVERSAL_DIST_DIR = path.resolve(DIST_DIR, './backend/universal');

  await del(PUBLIC_SRC_DIR);
  await copy(PUBLIC_DIST_DIR, PUBLIC_SRC_DIR, { filter: ['**/*.js', '!**/*.spec.js'] });
  await copy(UNIVERSAL_DIST_DIR, `${PUBLIC_SRC_DIR}/universal`, {
    filter: ['**/*.js', '!**/*.spec.js'],
  });
  await copy(`${CURRENT_DIR}/tsconfig.public.json`, `${PUBLIC_SRC_DIR}/tsconfig.json`);
  await rsync(`${PUBLIC_SRC_DIR}/`, path.resolve(CURRENT_DIR, '../src/public'));
}

async function configureFrontendPages() {
  const PAGES_DIST_DIR = path.resolve(DIST_DIR, './frontend/pages');
  const PAGES_SRC_DIR = path.resolve(SRC_DIR, './pages');
  const WIX_PAGES_SRC_DIR = path.resolve(CURRENT_DIR, '../src/pages');
  await del(PAGES_SRC_DIR);
  await configurePages(PAGES_DIST_DIR, PAGES_SRC_DIR, WIX_PAGES_SRC_DIR);
  await rsync(`${PAGES_SRC_DIR}/`, WIX_PAGES_SRC_DIR, { override: false });
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
      pagesToCopy.map(([page]) => page)
    );
    throw new Error(`Typescript pages did not match source pages: ${missingPages}`);
  }

  await Promise.all(
    pagesToCopy.map(([page, directory]) =>
      copy(`${distDir}/${page}.js`, `${srcDir}/${directory}/${page}.js`)
    )
  );
}

Promise.all([configureFrontendPublic(), configureFrontendPages()]).then(() => console.log('Done'));
