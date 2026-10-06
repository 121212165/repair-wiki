import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const idxPath = path.join(ROOT, 'data', 'site-index.json')
const siteIndex = fs.existsSync(idxPath) ? JSON.parse(fs.readFileSync(idxPath, 'utf8')) : []

const sectionLink = (s) => `/${s.key}/`
const nav = [{ text: '首页', link: '/' }, ...siteIndex.map((s) => ({ text: s.label, link: sectionLink(s) })), { text: '词云', link: '/wordcloud' }, { text: '来源与版权', link: '/about' }]

// 每个板块按机型分组：先按 device 归组保持抓取顺序，组内列教程
const sidebar = Object.fromEntries(
  siteIndex.map((s) => {
    const groups = []
    const byDevice = new Map()
    for (const it of s.items) {
      if (!byDevice.has(it.device)) {
        byDevice.set(it.device, [])
        groups.push(byDevice.get(it.device))
      }
      byDevice.get(it.device).push({ text: it.title, link: it.file })
    }
    return [
      `/${s.key}/`,
      groups.map((items, i) => ({ text: [...byDevice.keys()][i], collapsed: i === 0 ? false : true, items })),
    ]
  }),
)

export default defineConfig({
  lang: 'zh-CN',
  // GitHub Pages 项目页部署在 /repair-wiki/ 子路径下；绑自定义域名后改为 '/'
  base: process.env.VP_BASE || '/repair-wiki/',
  title: '维修知识库',
  description: '相机 / 电脑 / 笔记本 / 手机维修教程 · 聚合自 iFixit',
  head: [['link', { rel: 'icon', href: '/wrench.svg', type: 'image/svg+xml' }]],
  themeConfig: {
    nav,
    sidebar,
    search: { provider: 'local', options: { translations: { button: { buttonText: '搜索教程', buttonAriaLabel: '搜索' }, modal: { noResultsText: '没有找到相关教程', resetButtonTitle: '清空', footer: { selectText: '打开', navigateText: '切换', closeText: '关闭' } } } } },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '分类',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
    socialLinks: [{ icon: 'github', link: 'https://www.ifixit.com' }],
  },
})
