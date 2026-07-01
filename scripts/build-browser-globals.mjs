import { build } from 'obuild'
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
  {
    packageName: '@timestamp-js/calendar-hebrew',
    directory: 'packages/calendar-hebrew',
    globalName: 'TimestampJsCalendarHebrew',
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
    cwd: packageDir,
    entries: [
      {
        type: 'bundle',
        input: './src/index.ts',
        outDir: './dist',
        minify: false,
        dts: false,
        license: false,
      },
      {
        type: 'bundle',
        input: './src/index.ts',
        outDir: './dist',
        minify: true,
        dts: false,
        license: false,
      },
    ],
    hooks: {
      rolldownConfig(config) {
        config.external = []
        config.platform = 'browser'
      },
      rolldownOutput(config) {
        const minified = config.minify === true

        config.format = 'iife'
        config.name = pkg.globalName
        config.entryFileNames = minified ? 'index.global.min.js' : 'index.global.js'
        config.chunkFileNames = minified
          ? '_chunks/[name].global.min.js'
          : '_chunks/[name].global.js'
        config.sourcemap = false
        config.codeSplitting = false
      },
    },
  })
}
