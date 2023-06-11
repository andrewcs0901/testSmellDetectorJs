const complexSnapshots = require('./complexSnapshots');
const identicalTestDescription = require('./identicalTestDescription');
const nonFunctionalStatement = require('./nonFunctionalStatement');
const onlyTest = require('./onlyTest');
const subOptimalAssert = require('./subOptimalAssert');
const unusedImports = require('./unusedImports');
const verboseTest = require('./verboseTest');
const verifyInSetup = require('./verifyInSetup');

const Detectors = [complexSnapshots, identicalTestDescription, nonFunctionalStatement, onlyTest,
    subOptimalAssert, unusedImports, verboseTest, verifyInSetup];

module.exports = Detectors;