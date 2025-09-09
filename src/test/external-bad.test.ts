import {expect, test} from 'vitest'
import {parseAndTypecheck, TypeErrorsReport} from "../typechecker";

import * as fs from 'fs'
import * as path from 'path'

const TEST_DIR = path.resolve(__dirname, './stella-tests/bad')

const files = fs.readdirSync(TEST_DIR).flatMap(dir => {
    if (dir.toString().startsWith("_")) {
        return []
    }
    return fs.readdirSync(path.join(TEST_DIR, dir)).map(f => ({
        error_type: dir.toString(),
        name: f,
        fullPath: path.join(TEST_DIR, dir, f)
    }))
})

test.each(files)('$error_type/$name', ({error_type, name, fullPath}) => {
    console.log(new URL("file://" + fullPath).toString());
    const source = fs.readFileSync(fullPath, 'utf-8')
    console.log(source)
    const firstLine = source.match(/^\/\/ *([A-Z_]+)\n/)?.[1]
    const allowedErrors = [error_type]
    if (firstLine) {
        allowedErrors.push(firstLine)
    }
    const result = parseAndTypecheck(source)
    expect(result).instanceof(TypeErrorsReport)
    const firstError = (result as TypeErrorsReport).errors[0].type
    console.log(firstError)
    expect(allowedErrors).toContain(firstError)
    debugger
})
