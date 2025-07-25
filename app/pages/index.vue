<template>
  <div class="min-h-screen w-full bg-[#a20e1a] relative flex flex-col justify-between p-6">
    <!-- Image fixed to bottom right -->
    <img :src="images[currentImage]" alt="Kiki's Cat"
      class="absolute bottom-0 right-10 w-84 md:w-84 h-auto object-contain" />

    <!-- Heading at the top or above -->
    <h1 class="font=barrio text-white text-3xl md:text-5xl font-bold">
      Kiki's Image Compression Service~
    </h1>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  '/kiki_red1.jpg',
  '/kiki_red2.png',
  '/kiki_red3.png'
]
const currentImage = ref(0)
let animating = true
const timeoutIds = []

function safeSetTimeout(fn, delay) {
  const id = setTimeout(fn, delay)
  timeoutIds.push(id)
  return id
}

function startAnimation() {
  function nextCycle() {
    currentImage.value = 0
    safeSetTimeout(() => {
      currentImage.value = 1
      safeSetTimeout(() => {
        currentImage.value = 2
        safeSetTimeout(() => {
          if (animating) nextCycle()
        }, 200)
      }, 200)
    }, 2000)
  }
  nextCycle()
}

onMounted(startAnimation)

onBeforeUnmount(() => {
  animating = false
  timeoutIds.forEach(clearTimeout)
})
</script>
