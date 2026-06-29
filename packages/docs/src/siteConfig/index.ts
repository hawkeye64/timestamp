import { fabGithub, fabXTwitter } from '@quasar/extras/fontawesome-v7'
import { version, productName } from '../../package.json'
import { slugify } from '../.q-press/components/markdown-utils'

export interface SocialLink {
  name: string
  icon: string
  path: string
  external?: boolean
}

export interface SiteMenuItem extends MenuItem {
  about?: string
  expanded?: boolean
  external?: boolean
  children?: SiteMenuItem[]
  separator?: boolean
  header?: string
  mq?: number
  extract?: string
  image?: string
  maxWidth?: string
}

export interface LinksConfig {
  primaryHeaderLinks: SiteMenuItem[]
  secondaryHeaderLinks: SiteMenuItem[]
  moreLinks: SiteMenuItem[]
  footerLinks: SiteMenuItem[]
  socialLinks: SocialLink[]
  ecoSystemLinks?: SiteMenuItem[]
}

export interface LogoConfig {
  showLogo: boolean
  logoLight: string
  logoDark: string
  logoAlt: string
}

export interface VersionConfig {
  showTitle: boolean
  showVersion: boolean
  showOnHeader: boolean
  showOnSidebar: boolean
}

export interface UIConfig {
  usePrimaryHeader: boolean
  useSecondaryHeader: boolean
  headerHeightHint: number
  useMoreLinks: boolean
  useFooter: boolean
  useSidebar: boolean
  useToc: boolean
}

export interface CopyrightConfig {
  line1: string
  line2: string
}

export interface LicenseConfig {
  label: string
  link: string
}

export interface PrivacyConfig {
  label: string
  link: string
}

export interface CodepenGlobalPackage {
  packageName: string
  globalName: string
}

export interface CodepenModulePackage {
  packageName: string
  importUrl: string
}

export interface CodepenConfig {
  head?: string
  cssExternal?: string[]
  jsExternal?: string[]
  jsPreProcessor?: string
  titleSuffix?: string
  jsSetup?: string
  globalPackages?: CodepenGlobalPackage[]
  modulePackages?: CodepenModulePackage[]
}

export interface SiteConfig {
  lang: string
  title: string
  description: string
  version: string
  copyright: CopyrightConfig
  githubEditRootSrc: string
  githubSourceRootSrc?: string
  codepen?: CodepenConfig
  license: LicenseConfig
  privacy: PrivacyConfig
  logoConfig: LogoConfig
  versionConfig: VersionConfig
  config: UIConfig
  links: LinksConfig
  sidebar: MenuItem[]
}

function processMenuItem(item: MenuItem, parentPath = ''): MenuItem {
  const isPathlessGroup = item.path === ''
  const normalizedPath = isPathlessGroup
    ? parentPath
    : (item.path?.replace(/^\/+/, '') ?? slugify(item.name))
  let relativePath = ''

  if (isPathlessGroup === false) {
    relativePath =
      parentPath !== '' && normalizedPath.startsWith(`${parentPath}/`)
        ? normalizedPath.slice(parentPath.length + 1)
        : normalizedPath
  }

  return {
    name: item.name,
    path: relativePath,
    expanded: item.expanded ?? false,
    children: item.children
      ? item.children.map((child) => processMenuItem(child, normalizedPath))
      : undefined,
  }
}

const socialLinks = {
  name: 'Social',
  mq: 1400,
  children: [
    {
      name: 'GitHub',
      icon: fabGithub,
      path: 'https://github.com/hawkeye64/timestamp',
      external: true,
    },
    {
      name: 'X (Twitter)',
      icon: fabXTwitter,
      path: 'https://twitter.com/jgalbraith64',
      external: true,
    },
  ] as SocialLink[],
}

const netlifyLink = {
  path: 'https://www.netlify.com',
  external: true,
  image: 'https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg',
  name: 'Deploys by Netlify',
  maxWidth: '120px',
}

const sponsorLink = {
  path: 'https://github.com/sponsors/hawkeye64',
  external: true,
  image: 'https://github.com/hawkeye64.png?size=96',
  name: 'Sponsor Jeff',
  maxWidth: '24px',
}

const footerLinks = [
  {
    name: 'Sponsors',
    children: [
      {
        name: netlifyLink.name,
        path: netlifyLink.path,
        external: netlifyLink.external,
        image: netlifyLink.image,
        maxWidth: netlifyLink.maxWidth,
      },
      {
        name: sponsorLink.name,
        path: sponsorLink.path,
        external: sponsorLink.external,
        image: sponsorLink.image,
        maxWidth: sponsorLink.maxWidth,
      },
    ],
  },
  {
    name: socialLinks.name,
    children: [...socialLinks.children],
  },
]

const gettingStartedMenu: SiteMenuItem = {
  name: 'Getting Started',
  mq: 820,
  children: [
    { name: 'Introduction', path: '/getting-started/introduction' },
    { name: 'Installation', path: '/getting-started/installation' },
    { name: 'Parsing', path: '/getting-started/parsing' },
    { name: 'Immutability', path: '/getting-started/immutability' },
    { name: 'SSR', path: '/getting-started/ssr' },
  ],
}

const apiMenu: SiteMenuItem = {
  name: 'API',
  mq: 900,
  children: [
    { name: 'Timestamp API', path: '/api/timestamp-api' },
    { name: 'Islamic Calendar API', path: '/api/islamic-calendar-api' },
    { name: 'Saka Calendar API', path: '/api/saka-calendar-api' },
    { name: 'Timestamp Object', path: '/api/timestamp-object' },
    { name: 'Calendar Helpers', path: '/api/calendar-helpers' },
    { name: 'Comparisons', path: '/api/comparisons' },
  ],
}

const developingMenu: SiteMenuItem = {
  name: 'Developing',
  mq: 1060,
  children: [
    { name: 'Parsing + Formatting', path: '/developing/parsing-and-formatting' },
    { name: 'Validation + Boundaries', path: '/developing/validation-and-boundaries' },
    { name: 'Date Math', path: '/developing/date-math' },
    {
      name: 'Calendar Systems',
      path: '/developing/calendar-systems',
      children: [
        { name: 'Islamic Civil (Hijri)', path: '/developing/calendar-systems/islamic-civil' },
        { name: 'Saka', path: '/developing/calendar-systems/saka' },
      ],
    },
    { name: 'Intervals + Lists', path: '/developing/intervals-and-lists' },
    { name: 'Comparisons + Ranges', path: '/developing/comparisons-and-ranges' },
    { name: 'SSR + Runtime', path: '/developing/ssr-and-runtime' },
    { name: 'Timezone Model', path: '/developing/timezone-model' },
  ],
}

const otherMenu: SiteMenuItem = {
  name: 'Other',
  mq: 1220,
  children: [
    { name: 'Releases', path: '/other/releases' },
    { name: 'Upgrade Guide', path: '/other/upgrade-guide' },
    { name: 'FAQ', path: '/other/faq' },
    { name: 'Contact', path: '/other/contact' },
    {
      name: 'Contributing',
      children: [
        { name: 'Overview', path: '/other/contributing/overview' },
        {
          name: 'Bugs and Feature Requests',
          path: '/other/contributing/bugs-and-feature-requests',
        },
        { name: 'Documentation', path: '/other/contributing/documentation' },
        { name: 'Sponsor', path: '/other/contributing/sponsor' },
      ],
    },
  ],
}

export const sidebar: MenuItem[] = [
  processMenuItem(gettingStartedMenu),
  processMenuItem(apiMenu),
  processMenuItem(developingMenu),
  processMenuItem(otherMenu),
]

const siteConfig: SiteConfig = {
  lang: 'en-US',
  title: productName,
  description: 'Immutable date, time, interval, and range helpers for JavaScript and TypeScript.',
  version,
  copyright: {
    line1: 'MIT License',
    line2: 'Copyright (c) Jeff Galbraith',
  },
  githubEditRootSrc: 'https://github.com/hawkeye64/timestamp/tree/master/packages/docs/src',
  githubSourceRootSrc: 'https://github.com/hawkeye64/timestamp/tree/master/packages/docs/src',
  codepen: {
    jsPreProcessor: 'typescript',
    titleSuffix: `Timestamp v${version}`,
    jsExternal: [
      `https://cdn.jsdelivr.net/npm/@timestamp-js/core@${version}/dist/index.global.min.js`,
      `https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-islamic@${version}/dist/index.global.min.js`,
      `https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-saka@${version}/dist/index.global.min.js`,
    ],
    globalPackages: [
      {
        packageName: '@timestamp-js/core',
        globalName: '(globalThis as any).TimestampJsCore',
      },
      {
        packageName: '@timestamp-js/calendar-islamic',
        globalName: '(globalThis as any).TimestampJsCalendarIslamic',
      },
      {
        packageName: '@timestamp-js/calendar-saka',
        globalName: '(globalThis as any).TimestampJsCalendarSaka',
      },
    ],
  },
  license: {
    label: 'MIT',
    link: 'https://github.com/hawkeye64/timestamp/blob/master/LICENSE',
  },
  privacy: {
    label: 'Privacy',
    link: '/privacy-policy',
  },
  logoConfig: {
    showLogo: true,
    logoLight: '/timestamp-logo.svg',
    logoDark: '/timestamp-logo.svg',
    logoAlt: 'Timestamp',
  },
  versionConfig: {
    showTitle: true,
    showVersion: true,
    showOnHeader: false,
    showOnSidebar: true,
  },
  config: {
    usePrimaryHeader: false,
    useSecondaryHeader: true,
    headerHeightHint: 55,
    useMoreLinks: true,
    useFooter: true,
    useSidebar: true,
    useToc: true,
  },
  links: {
    primaryHeaderLinks: [],
    secondaryHeaderLinks: [gettingStartedMenu, apiMenu, developingMenu, otherMenu],
    moreLinks: [
      {
        name: 'More',
        children: [gettingStartedMenu, apiMenu, developingMenu, otherMenu, socialLinks],
      },
    ],
    footerLinks,
    socialLinks: socialLinks.children,
  },
  sidebar,
}

export default siteConfig
