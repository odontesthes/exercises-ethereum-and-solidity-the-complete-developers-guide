import * as path from 'path';

const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'contracts', 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

let source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath,
            contract.replace(':','') + '.json'),
        output[contract]
    );
}