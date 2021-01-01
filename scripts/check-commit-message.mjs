#!/usr/bin/env node

import process from 'process';
import fs from 'fs/promises';

const colorizeFunctions = {
    red: (str) => '\x1b[1;31m' + str + '\x1b[0m',
    blue: (str) => '\x1b[1;34m' + str + '\x1b[0m',
};

const { red, blue } = colorizeFunctions;

const checks = {
    'no-empty-message': (msg) => ! msg.trim() ? 'Empty commit messages are not allowed' : false,
    'no-extra-space': (msg) => msg !== msg.trim() ? 'Leading or trailing spaces are not allowed' : false,
    'ascii-only': (msg) => ! /^[ -~]*$/.test(msg.trim()) ? 'Non-ASCII characters are not allowed' : false,
    'start-with-capital': (msg) => ! /^[A-Z0-9]/.test(msg.trim()) ? 'Expected capital letter or digit at the beginning' : false,
    'end-with-ref': (msg) => ! /Ref\s+#\d+$/.test(msg.trim()) ? 'Expected Ref #xxx at the end' : false,
};

(async () => {
    console.log(blue('* Checking commit message'));
    let filename = process.argv[2];
    // Get the path to commit message file from $GIT_PARAMS if it does not exist in commandline args
    // Workaround for the old Yorkie
    if (!filename) {
        filename = process.env['GIT_PARAMS'];
    }
    const data = await fs.readFile(filename, 'utf8');
    const brief = data.split('\n').filter((line) => line && !line.startsWith('#'))[0];
    let failures = {};
    for (const check of Object.keys(checks)) {
        process.stdout.write(`* Running check for ${check}\r`);
        const result = checks[check](brief);
        if (result) {
            failures[check] = result;
        }
    }
    console.log(`* ${Object.keys(failures).length} check(s) failed` + ' '.repeat(20));
    for (const check of Object.keys(failures)) {
        console.log(red('× ' + failures[check]) + ' (' + check + ')');
    }
    process.exit(Object.keys(failures).length);
})();
