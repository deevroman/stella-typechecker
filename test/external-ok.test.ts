import {expect, test} from 'vitest'
import {parseAndTypecheck} from "../src/typechecker";

import * as fs from 'fs'
import * as path from 'path'

const TEST_DIR = path.resolve(__dirname, './stella-tests/ok')

const files = fs.readdirSync(TEST_DIR)
    .filter(f => f.endsWith('.st'))
    .map(f => ({ name: f, fullPath: path.join(TEST_DIR, f) }))

test.each(files)('ok/$name', ({name, fullPath}) => {
    console.log(new URL("file://" + fullPath).toString());
    const source = fs.readFileSync(fullPath, 'utf-8')
    const result = parseAndTypecheck(source)
    try {
        expect(result.ok).toBe(true)
    } catch (e) {
        console.log(source);
        console.error(result);
        throw e
    }
})
