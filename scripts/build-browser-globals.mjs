import { build } from 'esbuild'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')

const packages = [
  {
    packageName: '@timestamp-js/core',
    directory: 'packages/lib',
    globalName: 'TimestampJsCore',
  },
  {
    packageName: '@timestamp-js/calendar-islamic',
    directory: 'packages/calendar-islamic',
    globalName: 'TimestampJsCalendarIslamic',
  },
  {
    packageName: '@timestamp-js/calendar-saka',
    directory: 'packages/calendar-saka',
    globalName: 'TimestampJsCalendarSaka',
  },
]

const requestedPackages = new Set(process.argv.slice(2))
const selectedPackages =
  requestedPackages.size === 0
    ? packages
    : packages.filter(({ packageName }) => requestedPackages.has(packageName))

if (selectedPackages.length === 0) {
  throw new Error(`No browser-global package matched: ${[...requestedPackages].join(', ')}`)
}

for (const pkg of selectedPackages) {
  const packageDir = join(rootDir, pkg.directory)

  await build({
    entryPoints: [join(packageDir, 'src/index.ts')],
    outfile: join(packageDir, 'dist/index.global.js'),
    bundle: true,
    format: 'iife',
    globalName: pkg.globalName,
    platform: 'browser',
    target: ['es2020'],
    sourcemap: true,
    logLevel: 'info',
  })

  await build({
    entryPoints: [join(packageDir, 'src/index.ts')],
    outfile: join(packageDir, 'dist/index.global.min.js'),
    bundle: true,
    format: 'iife',
    globalName: pkg.globalName,
    platform: 'browser',
    target: ['es2020'],
    minify: true,
    legalComments: 'none',
    logLevel: 'info',
  })
}
