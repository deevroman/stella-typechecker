import fs from 'fs';
import {parseAndTypecheck, TypeErrorsReport} from './typechecker';

const data = fs.readFileSync(0, 'utf-8');
const report = parseAndTypecheck(data);

if (report.ok) {
    process.exit(0)
} else {
    if (report instanceof TypeErrorsReport) {
        console.error(report.errors[0].type) // todo pretty print
    } else {
        console.error(report);
    }
    process.exit(1)
}
