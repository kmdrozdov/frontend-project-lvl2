#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
