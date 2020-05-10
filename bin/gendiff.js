#!/usr/bin/env node
import Command from 'commander';
import gendiff from '../src/index.js';

const { program } = Command;
program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((arg1, arg2) => {
    gendiff(arg1, arg2);
  })
  .parse(process.argv);
