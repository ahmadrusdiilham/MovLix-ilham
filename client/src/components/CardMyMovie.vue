<script>
import { mapActions } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  props: ['myMovie'],
  methods: {
    ...mapActions(useAppStore, ['watchMovie']),
    watchLink() {
      this.watchMovie(this.myMovie.movieId)
    }
  }
}
</script>

<template>
  <div class="rounded-xl">
    <div class="p-5 flex flex-col mt-4">
      <div class="rounded-xl overflow-hidden">
        <div class="w-100 overflow-hidden">
          <img :src="myMovie.imageUrl" alt="" />
        </div>
        <div class="grid justify-between gap-2 justify-items-start text-white">
          <h3>{{ myMovie.title }}</h3>
          <span>{{ myMovie.release_date }}</span>
          <button
            @click.prevent="watchLink"
            class="bg-blue-500 text-white mt-4 px-4 py-3 rounded-xl hover:bg-blue-400"
          >
            Watch Movie
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
