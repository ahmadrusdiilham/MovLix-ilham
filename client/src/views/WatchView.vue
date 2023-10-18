<script>
import { mapState } from 'pinia'
import { useAppStore } from '../stores/app'

export default {
  computed: {
    ...mapState(useAppStore, ['watch'])
  }
}
</script>

<template>
  <div class="h-screen mt-5 bg-slate-950">
    <iframe class="w-full h-full" :src="watch.video" frameborder="2"></iframe>
  </div>
</template>
