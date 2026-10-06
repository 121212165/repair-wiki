<script setup>
// 词云页：品类切换 + 球体选词 + 关键词联动教程列表
import { ref, computed } from 'vue'
import kwData from '../../../../data/keywords.json'
import siteData from '../../../../data/site-index.json'
import Sphere from './WordCloudSphere.vue'

const sec = ref('all')
const word = ref('')

const words = computed(() => {
  if (sec.value === 'all') return kwData.all
  return kwData.sections.find((s) => s.key === sec.value)?.words || []
})

const matches = computed(() => {
  if (!word.value) return []
  const q = word.value.toLowerCase()
  const out = []
  for (const s of siteData) {
    for (const it of s.items) {
      const hay = `${it.title} ${it.category} ${it.device} ${it.summary}`.toLowerCase()
      if (hay.includes(q)) out.push({ ...it, section: s.label })
    }
  }
  return out
})
</script>

<template>
  <div class="wc-page">
    <div class="wc-chips">
      <button
        v-for="c in [{ key: 'all', label: '全部' }, ...kwData.sections.map((s) => ({ key: s.key, label: s.label }))]"
        :key="c.key" class="chip" :class="{ on: sec === c.key }" @click="sec = c.key; word = ''"
      >{{ c.label }}</button>
    </div>

    <p class="wc-hint">🖱️ 词球自动旋转 · 拖拽可手动转 · 点击关键词查看相关教程</p>

    <Sphere :key="sec" :words="words" :selected="word" @select="word = $event" />

    <div v-if="word" class="wc-result">
      <h2>
        关键词「<span class="kw">{{ word }}</span>」的相关教程 <span class="cnt">{{ matches.length }} 篇</span>
      </h2>
      <ul>
        <li v-for="it in matches.slice(0, 30)" :key="it.id">
          <span class="tag">{{ it.section }} · {{ it.device }}</span>
          <a :href="it.file.replace(/\.md$/, '.html')">{{ it.title }}</a>
          <span class="meta">难度：{{ it.difficulty }}</span>
        </li>
      </ul>
      <p v-if="matches.length > 30" class="more">仅显示前 30 篇，其余可用右上角搜索继续查。</p>
      <p v-if="!matches.length">没有直接命中的教程，试试别的关键词。</p>
    </div>
  </div>
</template>

<style scoped>
.wc-page { max-width: 860px; margin: 0 auto; }
.wc-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 12px; }
.chip {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 999px; padding: 4px 16px; cursor: pointer;
  font-size: 14px; color: var(--vp-c-text-1);
}
.chip.on { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }
.wc-hint { text-align: center; color: var(--vp-c-text-2); font-size: 13px; margin: 8px 0 0; }
.wc-result { margin-top: 24px; }
.wc-result h2 { border-top: 1px solid var(--vp-c-divider); padding-top: 20px; }
.kw { color: var(--vp-c-brand-1); }
.cnt { color: var(--vp-c-text-2); font-size: 15px; font-weight: 400; margin-left: 6px; }
.wc-result ul { list-style: none; padding: 0; }
.wc-result li { padding: 6px 0; border-bottom: 1px dashed var(--vp-c-divider); }
.tag {
  display: inline-block; font-size: 12px; color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft); border-radius: 4px; padding: 1px 8px; margin-right: 10px;
}
.meta { color: var(--vp-c-text-2); font-size: 13px; margin-left: 10px; }
.more { color: var(--vp-c-text-2); font-size: 13px; }
</style>
