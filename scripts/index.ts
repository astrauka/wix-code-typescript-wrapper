#!/usr/bin/env node
import yargs, { Arguments } from 'yargs';

import { configureBackend } from './configure-backend';
import { configureFrontend } from './configure-frontend';

yargs
  .usage('wix-code-typescript-wrapper [action]')
  .command(
    'init',
    'initialize project structure',
    (_yards) => yargs,
    (_argv: Arguments) => configureBackend(),
  )
  .command(
    'build-backend',
    'build and configure backend code to src/backend directory',
    (_yards) => yargs,
    (_argv: Arguments) => configureBackend(),
  )
  .command(
    'build-frontend',
    'build and configure forntend code to src/pages, src/public, src/lightboxes directories',
    (_yards) => yargs,
    (_argv: Arguments) => configureFrontend(),
  ).argv;
