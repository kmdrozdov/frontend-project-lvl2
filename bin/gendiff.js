#!/usr/bin/env node
import Command from 'commander';
import genDiff from '../src/index.js';

const { program } = Command;
program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((arg1, arg2) => {
    console.log(genDiff(arg1, arg2, program.format));
  })
  .parse(process.argv);
