import fs from 'fs';
import { parseAndTypecheck } from './typechecker';

const data = fs.readFileSync(0, 'utf-8');
const report = parseAndTypecheck(data);

if (report.ok) {
    process.exit(0)
} else {
    console.error(report);
    process.exit(1)
}
