import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type PackageShape = {
  dependencies?: Record<string, string>;
};

const packageJsonPath = join(process.cwd(), 'package.json');
const raw = readFileSync(packageJsonPath, 'utf-8');
const parsed = JSON.parse(raw) as PackageShape;
const dependencies = parsed.dependencies ?? {};
const runtimeDependencyNames = Object.keys(dependencies);

if (runtimeDependencyNames.length > 0) {
  console.error(
    `[check:no-runtime-deps] failed: runtime dependencies are forbidden in meristem-shared: ${runtimeDependencyNames.join(', ')}`,
  );
  process.exit(1);
}

console.log('[check:no-runtime-deps] ok');

