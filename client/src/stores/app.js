import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useAppStore = defineStore('app', {
  state: () => ({
    baseUrl: 'https://movlix.ahmadrusdiilham.com',
    movies: [],
    detailMovie: {},
    myMovies: [],
    watch: []
  }),
  getters: {},
  actions: {
    async handelLogin(value) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: value
        })
        localStorage.access_token = data.access_token
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Success',
          timer: 1500
        })
        this.$router.push('/')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async fetchMovie(params) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/movies',
          method: 'get',
          params: params
        })
        if (params.title) {
          this.movies = data
        } else {
          data.forEach((el) => {
            this.movies.push(el)
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchDetail(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/movies/' + id,
          method: 'get'
        })
        this.detailMovie = data
      } catch (err) {
        console.log(err)
      }
    },
    async addMyMovie(value) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/mymovies',
          method: 'post',
          data: value,
          headers: {
            access_token: localStorage.access_token
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchMyMovie() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/mymovies',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.myMovies = data
      } catch (err) {
        console.log(err)
      }
    },
    async buyMovie(value) {
      try {
        // console.log(value)
        const { data } = await axios({
          url: this.baseUrl + '/generate-midtrans-token',
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          }
        })
        const myMovie = this.fetchMyMovie
        const changePage = this.$router.push
        const cb = this.addMyMovie
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            cb(value)
            myMovie()
            changePage('/mymovie')
          }
        })
      } catch (err) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login First!'
        })
        this.$router.push('/login')
      }
    },
    async watchMovie(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/video/' + id,
          method: 'get'
        })
        this.watch = data[0]
        this.$router.push('/watch')
      } catch (err) {
        console.log(err)
      }
    },
    async loginDiscord(value) {
      try {
        console.log(value)
        const { data } = await axios({
          url: this.baseUrl + '/auth/discord',
          method: 'get',
          params: value
        })
        localStorage.access_token = data.access_token
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Success',
          timer: 1500
        })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async register(value) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: value
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register Success',
          timer: 1500
        })
        this.$router.push('/login')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    }
  }
})
