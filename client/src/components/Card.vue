<script>
import { mapActions } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  props: ['movie'],
  methods: {
    ...mapActions(useAppStore, ['fetchDetail']),
    detailId() {
      this.fetchDetail(this.movie.id)
    }
  }
}
</script>

<template>
  <!--card-->
  <div class="rounded-xl shadow-xl m-2">
    <div class="p-3 flex flex-col rounded-lg">
      <div class="rounded-xl overflow-hidden hover:border-4 border-white">
        <div>
          <img :src="movie.imageUrl" alt="" @click="$router.push('/detail/' + movie.id)" />
        </div>
        <h5 class="my-2 px-4 text-2xl font-bold tracking-tight text-gray-100">
          {{ movie.title }}
        </h5>
        <p class="mb-3 px-4 font-normal text-gray-100">{{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>
