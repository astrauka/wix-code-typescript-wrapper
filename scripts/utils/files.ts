import * as path from 'path';
import * as fs from 'fs';

import copy from 'recursive-copy';

export function getDirectoryFromLibrary(relativePath: string = ''): string {
  return path.resolve(path.resolve(__dirname, '../../../'), relativePath);
}

export function getDirectoryFromCaller(relativePath: string = ''): string {
  return path.resolve(process.cwd(), relativePath);
}

export async function copyFromTemplate(from: string, to: string) {
  await copy(getDirectoryFromLibrary(`./templates/${from}`), getDirectoryFromCaller(`./dist/${to}`));
}

export async function copyFromSource(from: string, to: string, options: object = {}) {
  await copy(getDirectoryFromCaller(`./typescript/${from}`), getDirectoryFromCaller(`./dist/${to}`), options);
}

export async function renameInDist(from: string, to: string) {
  fs.renameSync(getDirectoryFromCaller(`./dist/${from}`), getDirectoryFromCaller(`./dist/${to}`));
}

export function fileExists(url: string): boolean {
  return fs.existsSync(url);
}

export async function onDistDirectoryExists(path: string, onExistsFn: () => Promise<void>): Promise<void> {
  if (fileExists(getDirectoryFromCaller(`./dist/${path}`))) {
    await onExistsFn();
  }
}
