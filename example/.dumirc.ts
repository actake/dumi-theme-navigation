import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  publicPath: '/mcdocs/',
  base: '/mcdocs/',
  // disable mfsu for HMR
  mfsu: false,
  // pass theme config
  themeConfig: {
    name: 'example-demo',
    nav: [
      { title: '根目录', link: '/root', nestedSidebar: true },
      { title: 'guide', link: '/guide', nestedSidebar: true },
      { title: 'mains', link: '/mains' },
      { title: 'utils', link: '/utils' },
    ],
  },
  alias: {
    '@demo/main': join(__dirname, 'packages', 'main', 'src'),
    '@demo/utils': join(__dirname, 'packages', 'utils', 'src'),
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'main', dir: 'packages/main/src' },
      { type: 'utils', dir: 'packages/utils/src' },
    ],
  },
});
