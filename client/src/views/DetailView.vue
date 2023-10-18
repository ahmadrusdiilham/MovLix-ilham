<script>
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '../stores/app'
import ButtonGenre from '../components/ButtonGenre.vue'

export default {
  components: {
    ButtonGenre
  },
  computed: {
    ...mapState(useAppStore, ['detailMovie'])
  },
  methods: {
    ...mapActions(useAppStore, ['fetchDetail', 'addMyMovie', 'buyMovie']),
    submitMyMovie() {
      const newValue = {
        movieId: this.detailMovie.id,
        title: this.detailMovie.title,
        release_date: this.detailMovie.release_date,
        imageUrl: this.detailMovie.imageUrl
      }
      this.buyMovie(newValue)
    }
  },
  created() {
    this.fetchDetail(this.$route.params.id)
    //disqus
    ;(function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement('script')
      s.src = 'https://movlix.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date())
      ;(d.head || d.body).appendChild(s)
    })()
  }
}
</script>

<template>
  <main class="bg-slate-900">
    <div class="bg-slate-950 py-8 container mx-auto rounded-xl">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row">
          <div class="md:flex-1 px-4">
            <div class="rounded-2xl">
              <img
                class="w-full h-full object-cover"
                :src="detailMovie.imageUrl"
                alt="Product Image"
              />
            </div>
            <div class="flex -mx-2 mb-4">
              <div class="w-full px-2">
                <button
                  @click.prevent="submitMyMovie"
                  class="w-full mt-2 bg-white text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
                >
                  Buy Movie
                </button>
              </div>
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-3xl font-bold mb-2 text-white">{{ detailMovie.title }}</h2>

            <div class="flex mb-4 mt-4">
              <div class="mr-4">
                <div class="flex items-center rounded-xl p-4 bg-slate-800">
                  <p class="text-2xl font-bold text-gray-100">
                    {{ detailMovie.rating }}
                  </p>
                </div>
              </div>

              <!--rating-->

              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6 text-gray-300 mr-1 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
              </div>

              <!--rating-->
            </div>
            <div class="mb-4 mt-4">
              <span class="font-bold text-white text-2xl">Genre:</span>
              <div class="flex items-center mt-4">
                <!--button genre-->
                <ButtonGenre v-for="genre in detailMovie.genre" :key="genre.id" :genre="genre" />
              </div>
            </div>
            <div>
              <span class="font-bold text-white text-2xl">Overvies:</span>
              <p class="text-gray-100 mt-2 text-2xl">{{ detailMovie.synopsis }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-5">
      <!-- <Disqus /> -->
      <div id="disqus_thread"></div>
      <noscript
        >Please enable JavaScript to view the
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript
      >
    </div>
  </main>
</template>
