<template>
  <div class="flex flex-col gap-4 justify-center  h-full w-full items-center">
    <canvas
      ref="canvasElem"
      class="bg-black outline-2 outline-green-500"
      :width="GRID_SIDE_LENGTH"
      :height="GRID_SIDE_LENGTH"
      :style="{
        width: GRID_SIDE_LENGTH + 'px',
        height: GRID_SIDE_LENGTH + 'px',
      }"
    />
    <div class="flex gap-10">
      <Button @click="start">
        START
      </Button>
      <Button @click="stop">
        STOP
      </Button>
      <div />
    </div>
  </div>
</template>

<script setup lang="ts">
const canvasElem = useTemplateRef('canvasElem')

let ctx: CanvasRenderingContext2D | null = null

let setIntervalReturnId: ReturnType<typeof setInterval> | null = null

const GRID_SIZE = 20
const GRID_UNIT_SIZE = 20
const GRID_SIDE_LENGTH = GRID_SIZE * GRID_UNIT_SIZE

const defaultState = {
  snake: [{ x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }],
  food: { x: 14, y: 3 },
  snakeDirection: { dx: 0, dy: -1 },
}

const snake = structuredClone(defaultState.snake)
const snakeDirection = structuredClone(defaultState.snakeDirection)
const food = structuredClone(defaultState.food)

function onWebsiteLoad() {
  if (!canvasElem.value) return

  ctx = canvasElem.value.getContext('2d')
  window.addEventListener('keydown', onKeyDown)
}

function start() {
  if (!setIntervalReturnId) {
    draw()
    setIntervalReturnId = setInterval(update, 250)
  }
}

function stop() {
  if (setIntervalReturnId) {
    clearGrid()
    clearInterval(setIntervalReturnId)
    setIntervalReturnId = null
    snake.length = 0
    const copiedState = structuredClone(defaultState)

    snake.splice(0, 0, ...copiedState.snake)
    Object.assign(food, copiedState.food)
    Object.assign(snakeDirection, copiedState.snakeDirection)
  }
}

function drawRect(x: number, y: number, color: string) {
  if (!ctx) return

  ctx.fillStyle = color
  ctx.fillRect(
    x * GRID_UNIT_SIZE,
    y * GRID_UNIT_SIZE,
    GRID_UNIT_SIZE,
    GRID_UNIT_SIZE,
  )
}

function clearGrid() {
  if (!ctx) return

  ctx.clearRect(0, 0, GRID_SIDE_LENGTH, GRID_SIDE_LENGTH)
}

function draw() {
  if (!ctx) return
  clearGrid()
  for (const bodyPart of snake) {
    drawRect(bodyPart.x, bodyPart.y, '#0f0')
  }
  drawRect(food.x, food.y, '#f00')
}

function update() {
  const { dx, dy } = snakeDirection
  const head = snake[0]!
  const newHead = { x: head.x + dx, y: head.y + dy }
  snake.unshift(newHead)
  snake.pop()
  draw()
}

function onKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      snakeDirection.dx = 0
      snakeDirection.dy = 1
      break
    case 'ArrowUp':
      snakeDirection.dx = 0
      snakeDirection.dy = -1
      break
    case 'ArrowLeft':
      snakeDirection.dy = 0
      snakeDirection.dx = -1
      break
    case 'ArrowRight':
      snakeDirection.dy = 0
      snakeDirection.dx = 1
      break
  }
}

onMounted(onWebsiteLoad)
</script>
