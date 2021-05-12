import * as path from 'path';

export function getDirectoryFromLibrary(relativePath: string = ''): string {
  return path.resolve(path.resolve(__dirname, '../'), relativePath);
}

export function getDirectoryFromCaller(relativePath: string = ''): string {
  return path.resolve(process.cwd(), relativePath);
}
