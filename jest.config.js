const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  setupFiles: ['<rootDir>/test/setup.js'],
};

module.exports = config;
