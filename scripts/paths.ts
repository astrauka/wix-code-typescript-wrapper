import * as path from 'path';

export function getRootDirectory(): string {
  return path.resolve(__dirname, '../');
}

export function getDirectoryFromRoot(relativePath: string): string {
  return path.resolve(getRootDirectory(), relativePath);
}
