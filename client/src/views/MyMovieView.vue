<script>
import CardMyMovie from '../components/CardMyMovie.vue'
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  components: {
    CardMyMovie
  },
  computed: {
    ...mapState(useAppStore, ['myMovies'])
  },
  methods: {
    ...mapActions(useAppStore, ['fetchMyMovie'])
  },
  created() {
    this.fetchMyMovie()
  }
}
</script>

<template>
  <main class="bg-slate-900 h-screen">
    <div class="container mx-auto py-5 grid grid-cols-4 gap-6 bg-slate-950">
      <!-- Card -->
      <CardMyMovie v-for="myMovie in myMovies" :key="myMovie.movieId" :myMovie="myMovie" />
    </div>
  </main>
</template>
