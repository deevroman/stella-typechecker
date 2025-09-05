import {expect, test} from 'vitest'
import {parseAndTypecheck, TypeErrorsReport} from "../typechecker";

import * as fs from 'fs'
import * as path from 'path'

const TEST_DIR = path.resolve(__dirname, './stella-tests/bad')

const files = fs.readdirSync(TEST_DIR).flatMap(dir => {
    return fs.readdirSync(path.join(TEST_DIR, dir)).map(f => ({
        error_type: dir.toString(),
        name: f,
        fullPath: path.join(TEST_DIR, dir, f)
    }))
})

test.each(files)('$error_type/$name', ({error_type, name, fullPath}) => {
    console.log(new URL("file://" + fullPath).toString());
    const source = fs.readFileSync(fullPath, 'utf-8')
    const result = parseAndTypecheck(source)
    expect(result).instanceof(TypeErrorsReport)
    expect((result as TypeErrorsReport).errors.map(i => i.type.toString())).contains(error_type)
    debugger
})
