#!/usr/bin/env node
import command from 'commander';
import genDiff from '../src/index.js';

const { program } = command;
program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstFilePath, secondFilePath) => {
    console.log(genDiff(firstFilePath, secondFilePath, program.format));
  })
  .parse(process.argv);
