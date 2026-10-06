// 从 data/site-index.json 的教程元数据（标题/摘要/品类/机型）提取关键词，按板块分桶输出 data/keywords.json
// 用法：node scripts/extract-keywords.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DATA = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data')
const site = JSON.parse(fs.readFileSync(path.join(DATA, 'site-index.json'), 'utf8'))

// 通用英文虚词 + 维修教程套话（无信息量的词不入云）
const STOP = new Set(('the a an and or for with your you from this that how to of in on is are be been it its if into not new one two all when what which by at as use using used can will could should would may might step steps guide guides ifixit replacement replace replaced replacing removal remove removed removing repair repairs repairing reinstall reinstalling installation install installed installing disassembly disassemble disassembling disassembled teardown take takes taking off out up down then than more most also very just like get got put place lift pull push slide gently carefully small large small tiny securely firmly sure make making need needs needed let helps help before after during without within while about above below between each other again further once only own same so too own hard easy easier difficult because until back front top bottom side left right number part parts model models device devices'.split(/\s+/)))
const TOP_N = 48

function tokens(text) {
  return String(text || '').toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g) || []
}

function countPool(pool) {
  const m = new Map()
  for (const t of tokens(pool)) {
    if (STOP.has(t) || /^\d+$/.test(t)) continue
    m.set(t, (m.get(t) || 0) + 1)
  }
  return m
}

const display = (w) => w.charAt(0).toUpperCase() + w.slice(1)
const toWords = (m, n) => [...m.entries()]
  .filter(([, c]) => c >= 2)
  .sort((a, b) => b[1] - a[1])
  .slice(0, n)
  .map(([w, c]) => ({ w: display(w), n: c }))

const out = { sections: [], all: [] }
const merged = new Map()

for (const sec of site) {
  const m = countPool(sec.items.map((it) => `${it.title} ${it.category} ${it.device} ${it.summary}`).join(' '))
  const words = toWords(m, TOP_N)
  out.sections.push({ key: sec.key, label: sec.label, words })
  for (const [w, c] of m) merged.set(w, (merged.get(w) || 0) + c)
  console.log(`[${sec.key}] ${words.length} 词，Top5: ${words.slice(0, 5).map((x) => `${x.w}:${x.n}`).join(' ')}`)
}
out.all = toWords(merged, 60)

fs.writeFileSync(path.join(DATA, 'keywords.json'), JSON.stringify(out, null, 2))
console.log('[done] data/keywords.json')
