<script>
import Card from '../components/Card.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useAppStore } from '../stores/app'
export default {
  data() {
    return {
      params: {
        page: 1,
        title: ''
      }
    }
  },
  components: {
    Card
  },
  computed: {
    ...mapState(useAppStore, ['movies']),
    ...mapWritableState(useAppStore, ['movies'])
  },
  methods: {
    ...mapActions(useAppStore, ['fetchMovie']),
    searchTitle() {
      this.fetchMovie(this.params)
    },
    loadMore() {
      this.params.page++
    }
  },
  created() {
    this.fetchMovie(this.params)
  },
  watch: {
    ['params.page']() {
      this.fetchMovie(this.params)
    },
    ['params.title']() {
      if (this.params.title === '') {
        this.movies = []
      }
      this.fetchMovie(this.params)
    }
  },
  mounted() {
    const load = this.loadMore
    // console.log('mounted')
    // Detect when scrolled to bottom.
    // const listElm = document.getElementById('scroll-bar')
    window.addEventListener('scroll', (e) => {
      // console.log('cek masuk')
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        console.log('scroll masuk')
        load()
      }
    })
  }
}
</script>

<template>
  <section class="px-14 bg-slate-900">
    <div class="container mx-auto flex min-h-screen justify-center bg-slate-950 px-6">
      <div class="grid grid-cols-4" id="scroll-bar">
        <div class="col-span-4 p-3 mt-5">
          <div class="">
            <form @submit.prevent="searchTitle">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >Search</label
              >
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Title"
                  v-model="params.title"
                />
              </div>
            </form>
          </div>
        </div>
        <!--card-->
        <Card v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
    <div id="infinite-list"></div>
  </section>
</template>
