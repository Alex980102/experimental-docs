const withNextra = require('nextra')({
  mermaid: true,
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
});

module.exports = withNextra({
  reactStrictMode: true,
});