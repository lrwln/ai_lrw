// ===================== 打飞机小游戏 =====================
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

// ---------- Canvas 自适应 ----------
function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', resize)

// ---------- 输入处理 ----------
const keys = new Set()
window.addEventListener('keydown', e => {
  keys.add(e.key)
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault()
  }
})
window.addEventListener('keyup', e => keys.delete(e.key))

// ---------- 游戏状态 ----------
const STATE = { PLAYING: 'playing', OVER: 'over' }
let gameState = STATE.PLAYING
let score = 0
let spawnTimer = 0
let spawnInterval = 60        // 帧，越小敌机越多
let frameCount = 0

// ---------- 玩家 ----------
const player = {
  x: 0,
  y: 0,
  w: 40,
  h: 48,
  speed: 5,
  lives: 3,
  invincible: 0,  // 无敌帧
}

function resetPlayer() {
  player.x = canvas.width / 2
  player.y = canvas.height - 80
  player.lives = 3
  player.invincible = 0
}

// ---------- 子弹 ----------
const BULLET_SPEED = 10
const BULLET_COOLDOWN = 12 // 帧
let bulletCooldown = 0
const bullets = []

function spawnBullet() {
  bullets.push({
    x: player.x,
    y: player.y - player.h / 2,
    w: 4,
    h: 14,
    speed: BULLET_SPEED,
  })
}

// ---------- 敌机 ----------
const ENEMY_BASE_SPEED = 2.5
const enemies = []

function spawnEnemy() {
  const w = 36 + Math.random() * 20
  const h = w * 1.1
  enemies.push({
    x: w / 2 + Math.random() * (canvas.width - w),
    y: -h,
    w,
    h,
    speed: ENEMY_BASE_SPEED + Math.random() * 3,
  })
}

// ---------- 爆炸粒子 ----------
const particles = []

function spawnExplosion(x, y, color) {
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5
    const speed = 2 + Math.random() * 4
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 20 + Math.random() * 10,
      maxLife: 30,
      color,
    })
  }
}

// ---------- 星星背景 ----------
const stars = []
function initStars() {
  stars.length = 0
  const count = Math.floor((canvas.width * canvas.height) / 1500)
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 1 + 0.3,
    })
  }
}
initStars()
window.addEventListener('resize', initStars)

// ---------- 碰撞检测 (AABB) ----------
function rectCollide(a, b) {
  return (
    a.x - a.w / 2 < b.x + b.w / 2 &&
    a.x + a.w / 2 > b.x - b.w / 2 &&
    a.y - a.h / 2 < b.y + b.h / 2 &&
    a.y + a.h / 2 > b.y - b.h / 2
  )
}

// ---------- 绘制函数 ----------

// 星空背景
function drawStars() {
  for (const s of stars) {
    s.y += s.speed
    if (s.y > canvas.height) { s.y = -2; s.x = Math.random() * canvas.width }
    ctx.fillStyle = `rgba(255,255,255,${0.4 + s.r * 0.3})`
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

// 玩家飞机
function drawPlayer() {
  if (player.invincible > 0 && Math.floor(player.invincible / 4) % 2 === 0) return // 闪烁

  const { x, y, w, h } = player
  ctx.save()
  ctx.translate(x, y)

  // 主体 - 蓝色金属色
  const grad = ctx.createLinearGradient(0, -h / 2, 0, h / 2)
  grad.addColorStop(0, '#4fc3f7')
  grad.addColorStop(0.5, '#0288d1')
  grad.addColorStop(1, '#01579b')
  ctx.fillStyle = grad

  // 机身
  ctx.beginPath()
  ctx.moveTo(0, -h / 2)           // 机头
  ctx.lineTo(w * 0.3, -h * 0.15)
  ctx.lineTo(w * 0.15, h * 0.25)
  ctx.lineTo(w * 0.35, h * 0.2)
  ctx.lineTo(w * 0.3, h / 2)      // 尾翼
  ctx.lineTo(-w * 0.3, h / 2)
  ctx.lineTo(-w * 0.35, h * 0.2)
  ctx.lineTo(-w * 0.15, h * 0.25)
  ctx.lineTo(-w * 0.3, -h * 0.15)
  ctx.closePath()
  ctx.fill()

  // 驾驶舱
  ctx.fillStyle = '#b3e5fc'
  ctx.beginPath()
  ctx.ellipse(0, -h * 0.05, w * 0.12, h * 0.22, 0, 0, Math.PI * 2)
  ctx.fill()

  // 引擎火焰
  const flicker = 1 + Math.random() * 0.5
  const flameGrad = ctx.createLinearGradient(0, h * 0.2, 0, h * 0.65)
  flameGrad.addColorStop(0, '#ffeb3b')
  flameGrad.addColorStop(0.5, '#ff9800')
  flameGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = flameGrad
  ctx.beginPath()
  ctx.moveTo(-w * 0.15, h * 0.2)
  ctx.lineTo(w * 0.15, h * 0.2)
  ctx.lineTo(0, h * 0.5 + flicker * 8)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

// 子弹
function drawBullet(b) {
  const grad = ctx.createLinearGradient(b.x, b.y - b.h / 2, b.x, b.y + b.h / 2)
  grad.addColorStop(0, '#fff9c4')
  grad.addColorStop(0.4, '#ffee58')
  grad.addColorStop(1, '#f9a825')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.roundRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, 2)
  ctx.fill()
}

// 敌机
function drawEnemy(e) {
  ctx.save()
  ctx.translate(e.x, e.y)

  // 主体
  const grad = ctx.createLinearGradient(0, -e.h / 2, 0, e.h / 2)
  grad.addColorStop(0, '#ef5350')
  grad.addColorStop(0.5, '#c62828')
  grad.addColorStop(1, '#7f0000')
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.moveTo(0, e.h / 2)            // 底部
  ctx.lineTo(-e.w / 2, -e.h * 0.3)  // 左翼
  ctx.lineTo(-e.w * 0.15, -e.h / 2) // 左头
  ctx.lineTo(e.w * 0.15, -e.h / 2)  // 右头
  ctx.lineTo(e.w / 2, -e.h * 0.3)   // 右翼
  ctx.closePath()
  ctx.fill()

  // 座舱
  ctx.fillStyle = '#ffcdd2'
  ctx.beginPath()
  ctx.arc(0, e.h * 0.05, e.w * 0.12, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

// 粒子
function drawParticle(p) {
  const alpha = p.life / p.maxLife
  ctx.fillStyle = p.color.replace('1)', `${alpha})`).replace('rgb', 'rgba')
  ctx.beginPath()
  ctx.arc(p.x, p.y, 2.5 * alpha, 0, Math.PI * 2)
  ctx.fill()
}

// UI
function drawUI() {
  // 分数
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 24px "Courier New", monospace'
  ctx.textAlign = 'left'
  ctx.fillText(`分数: ${score}`, 16, 36)

  // 生命
  ctx.textAlign = 'right'
  ctx.fillText(`❤️ x ${player.lives}`, canvas.width - 16, 36)

  // 提示
  ctx.font = '12px "Courier New", monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.textAlign = 'center'
  ctx.fillText('方向键移动 | 空格射击', canvas.width / 2, canvas.height - 12)
}

// 游戏结束
function drawGameOver() {
  // 遮罩
  ctx.fillStyle = 'rgba(0,0,0,0.7)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 标题
  ctx.fillStyle = '#ef5350'
  ctx.font = 'bold 48px "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 40)

  // 分数
  ctx.fillStyle = '#fff'
  ctx.font = '24px "Courier New", monospace'
  ctx.fillText(`最终得分: ${score}`, canvas.width / 2, canvas.height / 2 + 20)

  // 重新开始
  ctx.fillStyle = '#ffeb3b'
  ctx.font = '18px "Courier New", monospace'
  ctx.fillText('按 R 键重新开始', canvas.width / 2, canvas.height / 2 + 60)
}

// ---------- 更新逻辑 ----------
function update() {
  frameCount++

  // 玩家移动
  if (gameState === STATE.PLAYING) {
    if (keys.has('ArrowLeft') || keys.has('a'))  player.x -= player.speed
    if (keys.has('ArrowRight') || keys.has('d')) player.x += player.speed
    if (keys.has('ArrowUp') || keys.has('w'))    player.y -= player.speed
    if (keys.has('ArrowDown') || keys.has('s'))  player.y += player.speed

    // 边界限制
    player.x = Math.max(player.w / 2, Math.min(canvas.width - player.w / 2, player.x))
    player.y = Math.max(player.h / 2, Math.min(canvas.height - player.h / 2, player.y))

    // 无敌帧递减
    if (player.invincible > 0) player.invincible--

    // 射击
    bulletCooldown--
    if ((keys.has(' ') || keys.has('Space')) && bulletCooldown <= 0) {
      spawnBullet()
      bulletCooldown = BULLET_COOLDOWN
    }

    // 子弹移动 & 越界移除
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= bullets[i].speed
      if (bullets[i].y + bullets[i].h / 2 < 0) {
        bullets.splice(i, 1)
      }
    }

    // 敌机生成
    spawnTimer++
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0
      spawnEnemy()
      // 难度递增
      if (spawnInterval > 25) spawnInterval -= 0.5
    }

    // 敌机移动 & 越界移除
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].y += enemies[i].speed
      if (enemies[i].y - enemies[i].h / 2 > canvas.height) {
        enemies.splice(i, 1)
      }
    }

    // 子弹 vs 敌机 碰撞
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        if (rectCollide(bullets[bi], enemies[ei])) {
          spawnExplosion(enemies[ei].x, enemies[ei].y, 'rgb(255,152,0)')
          bullets.splice(bi, 1)
          enemies.splice(ei, 1)
          score += 100
          break
        }
      }
    }

    // 玩家 vs 敌机 碰撞
    if (player.invincible === 0) {
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        if (rectCollide(player, enemies[ei])) {
          spawnExplosion(enemies[ei].x, enemies[ei].y, 'rgb(244,67,54)')
          enemies.splice(ei, 1)
          player.lives--
          player.invincible = 90 // 1.5秒无敌
          if (player.lives <= 0) {
            spawnExplosion(player.x, player.y, 'rgb(33,150,243)')
            gameState = STATE.OVER
          }
          break
        }
      }
    }

    // 粒子更新
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].x += particles[i].vx
      particles[i].y += particles[i].vy
      particles[i].life--
      if (particles[i].life <= 0) particles.splice(i, 1)
    }
  }

  // 游戏结束按 R 重新开始
  if (gameState === STATE.OVER && (keys.has('r') || keys.has('R'))) {
    restart()
  }
}

function restart() {
  gameState = STATE.PLAYING
  score = 0
  spawnTimer = 0
  spawnInterval = 60
  bulletCooldown = 0
  bullets.length = 0
  enemies.length = 0
  particles.length = 0
  resetPlayer()
  keys.clear()
}

// ---------- 主渲染 ----------
function draw() {
  // 清屏
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 背景色
  ctx.fillStyle = '#0a0a1a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawStars()

  if (gameState === STATE.PLAYING) {
    for (const b of bullets) drawBullet(b)
    for (const e of enemies) drawEnemy(e)
    for (const p of particles) drawParticle(p)
    drawPlayer()
    drawUI()
  } else {
    // 游戏结束仍绘制残留
    for (const p of particles) drawParticle(p)
    drawGameOver()
  }
}

// ---------- 游戏循环 ----------
function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

// ---------- 启动 ----------
resetPlayer()
loop()
