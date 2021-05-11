#!/usr/bin/env node
import yargs, { Arguments, terminalWidth } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { configureBackend } from './configure-backend';
import { configureFrontend } from './configure-frontend';
import { initializeProject } from './initialize-project';

const NAME = 'wix-code-typescript-wrapper';

yargs(hideBin(process.argv))
  .scriptName(NAME)
  .usage('$0 [action]')
  .command(
    'init',
    'initialize project structure',
    (yargs) => yargs,
    (_argv: Arguments) => initializeProject(),
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
  )
  .wrap(terminalWidth())
  .demandCommand(1, 1).argv;
