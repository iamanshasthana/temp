import { useEffect, useRef } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────

const FLOWER_COLORS = [
  ['#f9c5c5', '#e8737a', '#c9545c'], // rose
  ['#f5d0e8', '#d4a5c9', '#b880b0'], // lavender
  ['#fde8c0', '#f0c070', '#d4a853'], // golden
  ['#fcd5e0', '#f09ab0', '#d06080'], // peach pink
  ['#e0d5f5', '#c0a5e5', '#9070d0'], // soft purple
]

const PETAL_EMOJIS = ['🌸', '🌺', '✿', '❀']

const NUM_FLOWERS = 7
const NUM_PETALS  = 22

// ─── Helper: random in range ──────────────────────────────────────────────────
function rand(min, max) {
  return min + Math.random() * (max - min)
}

// ─── Draw a single flower petal shape ────────────────────────────────────────
function drawPetal(ctx, cx, cy, radius, rotation, color) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)
  ctx.beginPath()
  ctx.ellipse(0, -radius * 0.6, radius * 0.38, radius * 0.65, 0, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

// ─── Draw a 5-petal flower (rose style) ───────────────────────────────────────
function drawFlowerRose(ctx, x, y, radius, colors, bloomProgress) {
  const r = radius * bloomProgress
  if (r < 1) return
  const [outer, mid, center] = colors
  const numPetals = 5
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2 - Math.PI / 2
    drawPetal(ctx, x, y, r, angle, outer)
  }
  // Inner ring
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2 - Math.PI / 2 + Math.PI / numPetals
    drawPetal(ctx, x, y, r * 0.62, angle, mid)
  }
  // Center
  ctx.beginPath()
  ctx.arc(x, y, r * 0.22, 0, Math.PI * 2)
  ctx.fillStyle = center
  ctx.fill()
  // Center glow
  const cGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 0.22)
  cGrad.addColorStop(0, 'rgba(255,255,220,0.85)')
  cGrad.addColorStop(1, 'rgba(255,255,220,0)')
  ctx.beginPath()
  ctx.arc(x, y, r * 0.22, 0, Math.PI * 2)
  ctx.fillStyle = cGrad
  ctx.fill()
}

// ─── Draw a 6-petal daisy style ──────────────────────────────────────────────
function drawFlowerDaisy(ctx, x, y, radius, colors, bloomProgress) {
  const r = radius * bloomProgress
  if (r < 1) return
  const [outer, , center] = colors
  const numPetals = 6
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2
    drawPetal(ctx, x, y, r, angle, outer)
  }
  ctx.beginPath()
  ctx.arc(x, y, r * 0.3, 0, Math.PI * 2)
  const yGrad = ctx.createRadialGradient(x - r * 0.05, y - r * 0.05, 0, x, y, r * 0.3)
  yGrad.addColorStop(0, '#fff9c0')
  yGrad.addColorStop(0.6, center)
  yGrad.addColorStop(1, '#a07020')
  ctx.fillStyle = yGrad
  ctx.fill()
}

// ─── Draw a cherry blossom style ─────────────────────────────────────────────
function drawFlowerBlossom(ctx, x, y, radius, colors, bloomProgress) {
  const r = radius * bloomProgress
  if (r < 1) return
  const [outer, mid] = colors
  const numPetals = 5
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.ellipse(0, -r * 0.52, r * 0.3, r * 0.55, 0, 0, Math.PI * 2)
    const pGrad = ctx.createLinearGradient(0, -r, 0, 0)
    pGrad.addColorStop(0, outer)
    pGrad.addColorStop(1, mid)
    ctx.fillStyle = pGrad
    ctx.fill()
    ctx.restore()
  }
  // Stamens
  ctx.save()
  ctx.translate(x, y)
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    const len = r * 0.32
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len)
    ctx.strokeStyle = '#f0c0c0'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(Math.cos(a) * len, Math.sin(a) * len, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = '#ffe0a0'
    ctx.fill()
  }
  ctx.restore()
  // Center
  ctx.beginPath()
  ctx.arc(x, y, r * 0.14, 0, Math.PI * 2)
  ctx.fillStyle = '#fff0f0'
  ctx.fill()
}

// ─── Draw glow around flower ──────────────────────────────────────────────────
function drawFlowerGlow(ctx, x, y, radius, color) {
  const grd = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2.2)
  grd.addColorStop(0, color + '55')
  grd.addColorStop(0.5, color + '22')
  grd.addColorStop(1, 'transparent')
  ctx.beginPath()
  ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2)
  ctx.fillStyle = grd
  ctx.fill()
}

// ─── Draw stem & leaf ─────────────────────────────────────────────────────────
function drawStem(ctx, x, groundY, tipY, progress, leafProgress) {
  const currentTipY = groundY - (groundY - tipY) * progress
  // Stem
  ctx.beginPath()
  ctx.moveTo(x, groundY)
  ctx.quadraticCurveTo(x + 6, (groundY + currentTipY) / 2, x, currentTipY)
  ctx.strokeStyle = '#5a8a4a'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.stroke()

  // Leaf (appears after stem is halfway)
  if (progress > 0.45 && leafProgress > 0) {
    const leafY = groundY - (groundY - tipY) * 0.5
    const lp = Math.min(leafProgress * 2, 1)
    ctx.save()
    ctx.translate(x, leafY)
    ctx.rotate(-0.5)
    ctx.beginPath()
    ctx.ellipse(0, 0, 10 * lp, 22 * lp, -0.3, 0, Math.PI * 2)
    ctx.fillStyle = '#6aaa5a'
    ctx.fill()
    ctx.restore()

    // Second leaf on other side
    ctx.save()
    ctx.translate(x, leafY - 18)
    ctx.rotate(0.5)
    ctx.beginPath()
    ctx.ellipse(0, 0, 8 * lp, 18 * lp, 0.3, 0, Math.PI * 2)
    ctx.fillStyle = '#5a9a4a'
    ctx.fill()
    ctx.restore()
  }
}

// ─── Draw grass blades ────────────────────────────────────────────────────────
function drawGrass(ctx, canvasW, groundY, time) {
  const numBlades = Math.floor(canvasW / 14)
  for (let i = 0; i < numBlades; i++) {
    const bx = (i / numBlades) * canvasW + rand(-4, 4)
    const height = rand(14, 34)
    const sway = Math.sin(time * 0.8 + i * 0.7) * 4
    ctx.beginPath()
    ctx.moveTo(bx, groundY)
    ctx.quadraticCurveTo(
      bx + sway,
      groundY - height * 0.6,
      bx + sway * 1.5,
      groundY - height
    )
    const g = ctx.createLinearGradient(bx, groundY, bx, groundY - height)
    g.addColorStop(0, '#4a7a3a')
    g.addColorStop(1, '#8aba7a')
    ctx.strokeStyle = g
    ctx.lineWidth = rand(1.2, 2.2)
    ctx.lineCap = 'round'
    ctx.stroke()
  }
}

// ─── Draw floating particles (glowing dots) ────────────────────────────────────
function drawParticles(ctx, particles, time) {
  particles.forEach(p => {
    p.y -= p.speed
    p.x += Math.sin(time * p.drift + p.phase) * 0.4
    if (p.y < -10) {
      p.y = ctx.canvas.height + 10
      p.x = rand(0, ctx.canvas.width)
    }
    const alpha = 0.3 + 0.5 * Math.abs(Math.sin(time * 0.5 + p.phase))
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
    ctx.fill()
  })
}

// ─── Draw floating petals ─────────────────────────────────────────────────────
function drawFallingPetals(ctx, petals, time) {
  petals.forEach(p => {
    p.y += p.vy
    p.x += Math.sin(time * p.drift + p.phase) * p.sway
    p.rotation += p.rotSpeed

    if (p.y > ctx.canvas.height + 20) {
      p.y = -20
      p.x = rand(0, ctx.canvas.width)
    }
    if (p.x < -20) p.x = ctx.canvas.width + 10
    if (p.x > ctx.canvas.width + 20) p.x = -10

    ctx.save()
    ctx.globalAlpha = p.alpha
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    // Small ellipse petal
    ctx.beginPath()
    ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()
    ctx.restore()
  })
}

// ─── Initialize flower definitions ───────────────────────────────────────────
function createFlowers(canvasW, canvasH, groundY) {
  const flowers = []
  const types = ['rose', 'daisy', 'blossom']

  for (let i = 0; i < NUM_FLOWERS; i++) {
    const xFrac = (i + 0.5 + rand(-0.2, 0.2)) / NUM_FLOWERS
    const colors = FLOWER_COLORS[i % FLOWER_COLORS.length]
    const stemH = rand(canvasH * 0.25, canvasH * 0.55)
    const startDelay = rand(0, 2.5)

    flowers.push({
      x: xFrac * canvasW,
      groundY,
      tipY: groundY - stemH,
      radius: rand(20, 32),
      colors,
      type: types[i % types.length],
      stemProgress: 0,
      bloomProgress: 0,
      leafProgress: 0,
      startDelay,
      stemDuration: rand(2.2, 3.5),
      bloomDuration: rand(1.2, 2),
      startTime: null,
    })
  }
  return flowers
}

// ─── Initialize floating petals ───────────────────────────────────────────────
function createPetals(canvasW, canvasH) {
  const petals = []
  const petalColors = ['#f9c5c5cc', '#d4a5c9cc', '#f0c0d0cc', '#e8d0f0cc', '#fde8c0cc']
  for (let i = 0; i < NUM_PETALS; i++) {
    petals.push({
      x: rand(0, canvasW),
      y: rand(-canvasH, canvasH),
      w: rand(4, 9),
      h: rand(2, 5),
      vy: rand(0.3, 0.9),
      sway: rand(0.5, 1.8),
      drift: rand(0.3, 1.2),
      phase: rand(0, Math.PI * 2),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),
      alpha: rand(0.35, 0.75),
      color: petalColors[i % petalColors.length],
    })
  }
  return petals
}

// ─── Initialize glow particles ────────────────────────────────────────────────
function createParticles(canvasW, canvasH) {
  const pColors = ['#f9c5c5', '#d4a5c9', '#fde8c0', '#c0d4f9', '#f9d4c5']
  const particles = []
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: rand(0, canvasW),
      y: rand(0, canvasH),
      r: rand(1, 3.5),
      speed: rand(0.2, 0.7),
      drift: rand(0.5, 1.5),
      phase: rand(0, Math.PI * 2),
      color: pColors[i % pColors.length],
    })
  }
  return particles
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FlowerCanvas() {
  const canvasRef = useRef(null)
  const stateRef  = useRef(null)
  const rafRef    = useRef(null)
  const hiddenRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    // ── Size canvas ──────────────────────────────────────────────────────────
    function sizeCanvas() {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      initState()
    }

    // ── Initialize / re-initialize state ─────────────────────────────────────
    function initState() {
      const W = canvas.getBoundingClientRect().width
      const H = canvas.getBoundingClientRect().height
      const groundY = H - 28

      stateRef.current = {
        W, H,
        groundY,
        flowers:   createFlowers(W, H, groundY),
        petals:    createPetals(W, H),
        particles: createParticles(W, H),
        startTime: null,
        loopTime: 0,
        loopDuration: 12, // seconds before restarting
      }
    }

    // ── Draw background ───────────────────────────────────────────────────────
    function drawBackground(ctx, W, H) {
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0,   '#1a0a2e')
      grad.addColorStop(0.4, '#2d1040')
      grad.addColorStop(0.75,'#4a1540')
      grad.addColorStop(1,   '#1a0a1a')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Subtle mid-glow
      const mGrad = ctx.createRadialGradient(W * 0.5, H * 0.6, 0, W * 0.5, H * 0.6, W * 0.7)
      mGrad.addColorStop(0, 'rgba(200,80,150,0.12)')
      mGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = mGrad
      ctx.fillRect(0, 0, W, H)
    }

    // ── Draw ground strip ─────────────────────────────────────────────────────
    function drawGround(ctx, W, groundY, H) {
      const gGrad = ctx.createLinearGradient(0, groundY, 0, H)
      gGrad.addColorStop(0, '#2d5020')
      gGrad.addColorStop(1, '#1a3010')
      ctx.fillStyle = gGrad
      ctx.fillRect(0, groundY, W, H - groundY)
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    function animate(timestamp) {
      if (hiddenRef.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const s = stateRef.current
      if (!s) { rafRef.current = requestAnimationFrame(animate); return }

      if (!s.startTime) s.startTime = timestamp
      const elapsed = (timestamp - s.startTime) / 1000 // seconds
      s.loopTime = elapsed

      // Auto-loop: reset flowers after loopDuration so they regrow
      if (elapsed > s.loopDuration) {
        s.startTime = timestamp
        s.flowers = createFlowers(s.W, s.H, s.groundY)
      }

      const W = s.W, H = s.H

      // Clear & draw BG
      ctx.clearRect(0, 0, W, H)
      drawBackground(ctx, W, H)

      // Glow particles
      ctx.globalAlpha = 1
      drawParticles(ctx, s.particles, elapsed)

      // Ground
      ctx.globalAlpha = 1
      drawGround(ctx, W, s.groundY, H)

      // Grass
      ctx.globalAlpha = 0.9
      drawGrass(ctx, W, s.groundY, elapsed)
      ctx.globalAlpha = 1

      // Flowers
      s.flowers.forEach(f => {
        const age = elapsed - f.startDelay
        if (age < 0) return

        // Stem growth
        f.stemProgress = Math.min(age / f.stemDuration, 1)

        // Leaf appears at 50% stem growth
        f.leafProgress = f.stemProgress > 0.5
          ? Math.min((age - f.stemDuration * 0.5) / (f.stemDuration * 0.5), 1)
          : 0

        // Bloom starts after stem is done
        const bloomAge = age - f.stemDuration
        f.bloomProgress = bloomAge > 0
          ? Math.min(1 - Math.pow(1 - bloomAge / f.bloomDuration, 3), 1)
          : 0

        // Draw glow when blooming
        if (f.bloomProgress > 0.1) {
          ctx.globalAlpha = f.bloomProgress * 0.85
          drawFlowerGlow(ctx, f.x, f.tipY, f.radius, f.colors[0])
          ctx.globalAlpha = 1
        }

        // Draw stem
        drawStem(ctx, f.x, s.groundY, f.tipY, f.stemProgress, f.leafProgress)

        // Draw flower
        if (f.bloomProgress > 0) {
          if (f.type === 'rose')    drawFlowerRose(ctx, f.x, f.tipY, f.radius, f.colors, f.bloomProgress)
          if (f.type === 'daisy')   drawFlowerDaisy(ctx, f.x, f.tipY, f.radius, f.colors, f.bloomProgress)
          if (f.type === 'blossom') drawFlowerBlossom(ctx, f.x, f.tipY, f.radius, f.colors, f.bloomProgress)
        }
      })

      // Falling petals (on top)
      ctx.globalAlpha = 1
      drawFallingPetals(ctx, s.petals, elapsed)

      rafRef.current = requestAnimationFrame(animate)
    }

    // ── Visibility handling ───────────────────────────────────────────────────
    function handleVisibility() {
      hiddenRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // ── Resize handling ───────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      ctx.resetTransform()
      sizeCanvas()
    })
    resizeObserver.observe(canvas)

    // ── Start ─────────────────────────────────────────────────────────────────
    sizeCanvas()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '360px',
        display: 'block',
        borderRadius: 'inherit',
      }}
      aria-label="Animated flower garden"
    />
  )
}
