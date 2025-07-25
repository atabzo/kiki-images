<template>
  <div class="space-y-4">
    <UploadButton @click="triggerFileInput">Upload Image</UploadButton>
    <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileChange" />
  </div>
  <button @click="goToCompressor" class="bg-pink-400 text-white px-4 py-2 rounded">
    Go to Compressor Page
  </button>
</template>

<script setup lang="ts">
import UploadButton from '~/components/ui/button/Button.vue'
const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    console.log("Selected file:", file)
  }
}
</script>
