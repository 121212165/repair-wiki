// iFixit 教程抓取：拉全量索引 → 按保有量设备清单定向筛选 → 抓详情 → 生成 Markdown 页面 + 站点索引
// 用法：node scripts/fetch-ifixit.mjs
//   COUNT=每品类兜底上限(默认40)  PER_DEVICE=每机型篇数(默认3)
//   FORCE=1(强制重建索引缓存)  SKIP_FULL=1(只重建索引不抓详情)
// 设备清单依据见 调研-保有量设备清单.md（主流机型累计销量均远超 1 万台）
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = path.join(ROOT, 'docs')
const DATA = path.join(ROOT, 'data')
const API = 'https://www.ifixit.com/api/2.0'
const COUNT = parseInt(process.env.COUNT || '40', 10)
const PER_DEVICE = parseInt(process.env.PER_DEVICE || '3', 10)
const PAGE = 200
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function apiJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'repair-wiki/0.1 (personal knowledge base)' } })
      if (res.status === 429) { await sleep(3000 * (i + 1)); continue }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      if (i === tries - 1) throw e
      await sleep(1500 * (i + 1))
    }
  }
}

// 站点四大板块：devices = 保有量设备清单（按机型定向），kw = 品类兜底关键词
const SECTIONS = [
  {
    key: 'phone', label: '手机',
    devices: ['iPhone 17', 'iPhone 16', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone 8', 'Galaxy S24', 'Galaxy S22', 'Galaxy S20', 'Galaxy A5', 'Pixel 8', 'Pixel 7', 'Redmi Note', 'Huawei P30'],
    kw: ['iphone', 'android phone', 'samsung galaxy phone', 'google phone', 'xiaomi phone', 'huawei phone', 'oneplus phone', 'motorola phone', 'nokia phone', 'oppo phone', 'vivo phone'],
  },
  {
    key: 'laptop', label: '笔记本',
    devices: ['MacBook Air 13', 'MacBook Air 15', 'MacBook Pro 13', 'MacBook Pro 14', 'MacBook Pro 15', 'MacBook Pro 16', 'ThinkPad X1 Carbon', 'ThinkPad T480', 'ThinkPad T14', 'Dell XPS 13', 'HP EliteBook', 'IdeaPad'],
    kw: ['macbook', 'laptop', 'notebook', 'chromebook', 'thinkpad', 'ultrabook'],
  },
  {
    key: 'pc', label: '台式机',
    devices: ['iMac 24', 'iMac 27', 'iMac 21', 'Mac mini', 'Mac Pro', 'OptiPlex', 'motherboard', 'graphics card', 'power supply'],
    kw: ['pc desktop', 'mac desktop', 'imac', 'mac mini', 'mac pro', 'desktop pc', 'motherboard', 'power supply', 'graphics card', 'cpu'],
  },
  {
    key: 'camera', label: '相机',
    devices: ['Canon EOS Rebel T2i', 'Canon EOS Rebel T3', 'Canon EOS Rebel T5', 'Canon EOS Rebel T3i', 'Canon EOS Rebel T6i', 'Canon EOS Rebel T7i', 'Canon EOS 60D', 'Canon EOS 70D', 'Canon EOS 5D Mark II', 'Nikon D70', 'Nikon D90', 'Nikon D5100', 'Nikon D3000', 'Sony Alpha ILCE-6000', 'Sony Alpha a7s II', 'Sony Alpha NEX-6', 'GoPro Hero4 Black', 'GoPro Hero5 Black', 'Fujifilm X100T'],
    kw: ['camera', 'canon', 'nikon', 'sony camera', 'gopro', 'dslr', 'camcorder', 'lens', 'fujifilm', 'panasonic camera', 'olympus'],
  },
  {
    key: 'home', label: '家居家电',
    devices: ['扫地机器人|Roomba', '擦地机器人|Braava', '其他机器人|Robotic Vacuum', '电视|Television', '液晶电视|LCD TV', '电视盒子|Fire TV', '马桶|Toilet', '漏水·水路|Plumbing', '水龙头|Faucet', '排水疏通|Drain', '热水器|Water Heater', '洗碗机|Dishwasher'],
    kw: ['plumbing', 'toilet', 'faucet', 'vacuum', 'television', 'tv', 'robot', 'washing', 'dishwasher', 'drain', 'water heater', 'leak', 'sink', 'shower'],
  },
]

const DIFF_ZH = { 'Very easy': '很简单', 'Very Easy': '很简单', Easy: '简单', Moderate: '中等', Difficult: '困难', 'Very Difficult': '很难' }

async function fetchIndex() {
  const cache = path.join(DATA, 'guides-index.json')
  if (!process.env.FORCE && fs.existsSync(cache)) {
    console.log('[index] 使用缓存 data/guides-index.json（FORCE=1 重建）')
    return JSON.parse(fs.readFileSync(cache, 'utf8'))
  }
  const all = []
  for (let offset = 0; ; offset += PAGE) {
    const page = await apiJson(`${API}/guides?limit=${PAGE}&offset=${offset}`)
    all.push(...page)
    console.log(`[index] 已拉取 ${all.length} 条`)
    if (page.length < PAGE) break
    await sleep(150)
  }
  fs.mkdirSync(DATA, { recursive: true })
  fs.writeFileSync(cache, JSON.stringify(all))
  return all
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'guide'
}

function esc(s) { return String(s ?? '').replace(/</g, '&lt;') }

function guideToMarkdown(g) {
  const L = []
  const diff = DIFF_ZH[g.difficulty] || g.difficulty || '—'
  L.push('---')
  L.push(`title: ${JSON.stringify(g.title)}`)
  L.push('---')
  L.push('')
  L.push(`> 📖 原教程：[iFixit #${g.guideid}](${g.url}) · 难度：**${diff}** · 耗时：${esc(g.time_required) || '—'} · 品类：${esc(g.category)}`)
  L.push('')
  if (g.introduction_raw) L.push(g.introduction_raw.trim(), '')
  if (g.tools?.length) {
    L.push('## 需要的工具', '')
    for (const t of g.tools) L.push(`- ${esc(t.text || t.notes || '')}`)
    L.push('')
  }
  if (g.parts?.length) {
    L.push('## 需要的配件', '')
    for (const p of g.parts) L.push(`- ${esc(p.text || '')}`)
    L.push('')
  }
  L.push('## 步骤', '')
  g.steps?.forEach((st, i) => {
    L.push(`### 第 ${i + 1} 步${st.title ? '：' + esc(st.title) : ''}`, '')
    for (const line of st.lines || []) L.push(line.text_raw || '')
    L.push('')
    for (const m of st.media?.data || []) {
      const src = m.medium || m.standard
      if (src) L.push(`![步骤图](${src})`, '')
    }
  })
  if (g.conclusion_raw) { L.push('## 完成', '', g.conclusion_raw.trim(), '') }
  L.push('---', '', '*内容来自 [iFixit](https://www.ifixit.com)，遵循 CC BY-NC-SA 协议，仅作个人学习用途。*', '')
  return L.join('\n')
}

function pickSorted(pool, n, seen) {
  const out = []
  for (const g of pool.sort((a, b) => (b.modified_date || 0) - (a.modified_date || 0))) {
    if (seen.has(g.guideid)) continue
    seen.add(g.guideid)
    out.push(g)
    if (out.length >= n) break
  }
  return out
}

async function main() {
  fs.mkdirSync(DATA, { recursive: true })
  const index = await fetchIndex()
  console.log(`[index] 共 ${index.length} 篇教程`)
  const ok = index.filter((g) => g.public !== false && g.locale === 'en')

  const siteIndex = []
  for (const sec of SECTIONS) {
    const outDir = path.join(DOCS, sec.key)
    fs.mkdirSync(outDir, { recursive: true })
    const seen = new Set()
    const groups = [] // { device, guides }
    // 1) 按机型定向收录（支持 '中文标签|iFixit关键词' 形式）
    for (const dev of sec.devices) {
      const [label, kwRaw] = dev.includes('|') ? dev.split('|') : [dev, dev]
      const k = kwRaw.toLowerCase()
      const matched = ok.filter((g) => (g.category || '').toLowerCase().includes(k))
      const picked = pickSorted(matched, PER_DEVICE, seen)
      if (picked.length) groups.push({ device: label.trim(), guides: picked })
    }
    console.log(`[${sec.key}] 机型定向 ${groups.length}/${sec.devices.length} 组`)
    // 2) 品类兜底补齐到 COUNT
    const generic = ok.filter((g) => sec.kw.some((k) => (g.category || '').toLowerCase().includes(k)) && !seen.has(g.guideid))
    const fill = pickSorted(generic, Math.max(0, COUNT - seen.size), seen)
    if (fill.length) groups.push({ device: '更多教程', guides: fill })

    const items = []
    for (const grp of groups) {
      for (const g of grp.guides) {
        const file = `${g.guideid}-${slugify(g.title)}.md`
        try {
          if (process.env.SKIP_FULL) throw new Error('skip')
          const full = await apiJson(`${API}/guides/${g.guideid}`)
          fs.writeFileSync(path.join(outDir, file), guideToMarkdown(full))
          await sleep(100)
        } catch {
          fs.writeFileSync(path.join(outDir, file), guideToMarkdown({ ...g, steps: [], introduction_raw: g.summary }))
          console.log(`  △ (摘要) ${g.title}`)
        }
        items.push({
          id: g.guideid, title: g.title, file: `/${sec.key}/${file}`, category: g.category,
          device: grp.device, difficulty: DIFF_ZH[g.difficulty] || g.difficulty || '—',
          time: g.time_required || '', summary: g.summary || '',
          image: g.image?.medium || g.image?.standard || '', url: g.url,
        })
      }
    }
    console.log(`[${sec.key}] 收录 ${items.length} 篇`)
    // 落地页：按机型分组
    const land = [`# ${sec.label}维修教程`, '', `共收录 ${items.length} 篇教程，内容来自 iFixit。机型清单依据见调研报告。`, '']
    for (const grp of groups) {
      land.push(`## ${grp.device}`, '')
      for (const g of grp.guides) {
        const it = items.find((x) => x.id === g.guideid)
        land.push(`- [${it.title}](${it.file}) · 难度：${it.difficulty}${it.time ? ` · ${it.time}` : ''}`)
      }
      land.push('')
    }
    fs.writeFileSync(path.join(outDir, 'index.md'), land.join('\n'))
    siteIndex.push({ key: sec.key, label: sec.label, items })
  }
  fs.writeFileSync(path.join(DATA, 'site-index.json'), JSON.stringify(siteIndex, null, 2))
  console.log('[done] 站点索引已写入 data/site-index.json')
}

main().catch((e) => { console.error(e); process.exit(1) })
