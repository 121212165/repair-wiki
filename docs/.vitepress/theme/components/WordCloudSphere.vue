<script setup>
// 3D 旋转词网球体：Canvas 实现，自动旋转 + 拖拽 + 悬停高亮 + 点击选词
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  words: { type: Array, required: true }, // [{ w, n }]
  selected: { type: String, default: '' },
})
const emit = defineEmits(['select'])

const canvasEl = ref(null)
const wrapEl = ref(null)

const TIER_COLORS = ['#7e93a8', '#3e9e6c', '#2f6db3', '#c2452d']
let ctx, raf = 0, ro
let pts = [], W = 0, H = 0, dpr = 1
let ay = 0, ax = 0.4, t0 = 0
let dragging = false, lastX = 0, lastY = 0, moved = 0
let mouseX = -1, mouseY = -1, hoverWord = ''

function buildPoints() {
  const N = props.words.length
  const ns = props.words.map((x) => x.n)
  const min = Math.min(...ns), max = Math.max(...ns)
  pts = props.words.map((x, i) => {
    // 斐波那契球面均匀布点
    const y = 1 - ((i + 0.5) * 2) / N
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = i * 2.399963
    const t = max === min ? 0.5 : (x.n - min) / (max - min)
    return { w: x.w, n: x.n, x: Math.cos(th) * r, y, z: Math.sin(th) * r, size: 13 + t * 17, tier: Math.min(3, Math.floor(t * 4)) }
  })
}

function resize() {
  const el = wrapEl.value
  if (!el) return
  dpr = window.devicePixelRatio || 1
  W = el.clientWidth
  H = el.clientHeight
  canvasEl.value.width = W * dpr
  canvasEl.value.height = H * dpr
  canvasEl.value.style.width = W + 'px'
  canvasEl.value.style.height = H + 'px'
  ctx = canvasEl.value.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function project(p, time) {
  const cAy = Math.cos(ay), sAy = Math.sin(ay)
  const x1 = p.x * cAy + p.z * sAy
  const z1 = -p.x * sAy + p.z * cAy
  const axTot = ax + Math.sin(time * 0.00045) * 0.12
  const cAx = Math.cos(axTot), sAx = Math.sin(axTot)
  const y2 = p.y * cAx - z1 * sAx
  const z2 = p.y * sAx + z1 * cAx
  const persp = 1.35 / (2.1 - z2) // z2∈[-1,1] → 约 0.64~1.23
  const R = Math.min(W, H) * 0.42
  return { sx: W / 2 + x1 * R * persp, sy: H / 2 + y2 * R * persp, z: z2, persp }
}

function hitTest(x, y) {
  let best = 24, hit = ''
  const time = performance.now()
  for (const p of pts) {
    const q = project(p, time)
    if (q.z > 0.05) {
      const d = Math.hypot(q.sx - x, q.sy - y)
      if (d < best) { best = d; hit = p.w }
    }
  }
  return hit
}

function frame(time) {
  raf = requestAnimationFrame(frame)
  if (!ctx) return
  if (!dragging) ay += 0.0035
  ctx.clearRect(0, 0, W, H)

  const proj = pts.map((p) => ({ p, ...project(p, time) }))
  proj.sort((a, b) => a.z - b.z) // 后面的先画
  hoverWord = mouseX >= 0 ? hitTest(mouseX, mouseY) : ''
  for (const q of proj) {
    const depth = (q.z + 1) / 2
    const isSel = props.selected && q.p.w === props.selected
    const isHover = q.p.w === hoverWord
    ctx.font = `600 ${Math.round(q.p.size * q.persp)}px "Segoe UI", system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.globalAlpha = 0.22 + depth * 0.78
    ctx.fillStyle = isSel || isHover ? '#111' : TIER_COLORS[q.p.tier]
    ctx.fillText(q.p.w, q.sx, q.sy)
    if (isSel || isHover) {
      const w = ctx.measureText(q.p.w).width
      ctx.globalAlpha = 0.9
      ctx.strokeStyle = '#c2452d'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(q.sx - w / 2 - 4, q.sy + q.p.size * q.persp * 0.7)
      ctx.lineTo(q.sx + w / 2 + 4, q.sy + q.p.size * q.persp * 0.7)
      ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
  canvasEl.value.style.cursor = hoverWord ? 'pointer' : (dragging ? 'grabbing' : 'grab')
}

function setPointer(e) {
  const rect = canvasEl.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}
function onDown(e) { setPointer(e); dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY }
function onMove(e) {
  setPointer(e)
  if (dragging) {
    const dx = e.clientX - lastX, dy = e.clientY - lastY
    moved += Math.abs(dx) + Math.abs(dy)
    ay += dx * 0.005
    ax = Math.max(-1.2, Math.min(1.2, ax + dy * 0.004))
    lastX = e.clientX; lastY = e.clientY
  }
}
function onUp(e) {
  if (dragging && moved < 5) {
    if (e && typeof e.clientX === 'number') setPointer(e)
    const hit = hoverWord || hitTest(mouseX, mouseY)
    if (hit) emit('select', hit)
  }
  dragging = false
}
function onLeave() { mouseX = -1; mouseY = -1; dragging = false }

onMounted(() => {
  buildPoints()
  resize()
  ro = new ResizeObserver(resize)
  ro.observe(wrapEl.value)
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro?.disconnect() })
watch(() => props.words, buildPoints)
</script>

<template>
  <div ref="wrapEl" class="wc-wrap">
    <canvas
      ref="canvasEl"
      @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp"
      @pointerleave="onLeave" @pointercancel="onUp"
    />
  </div>
</template>

<style scoped>
.wc-wrap {
  width: 100%;
  height: 460px;
  touch-action: pan-y;
  user-select: none;
}
canvas { display: block; margin: 0 auto; }
</style>
