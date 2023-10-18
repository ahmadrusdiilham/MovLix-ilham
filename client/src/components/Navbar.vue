<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    handleLogout() {
      if (localStorage.access_token) {
        localStorage.clear()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Log Out Success',
          timer: 1500
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>

<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-slate-50 p-6 border-b-4">
      <div class="flex items-center flex-shrink-0 text-slate-950 mr-6">
        <!--logo movie-->
        <router-link to="/">
          <a class="font-bold text-2xl tracking-tight">MovLix</a>
        </router-link>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto mr-10">
        <div class="text-xl lg:flex-grow"></div>
        <div>
          <router-link to="/">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 text-xl text-slate-950 hover:text-slate-500 mr-4"
            >
              Home
            </a>
          </router-link>
        </div>
        <div>
          <router-link to="/mymovie">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 text-xl text-slate-950 hover:text-slate-500 mr-4"
            >
              MyMovie
            </a>
          </router-link>
        </div>
        <div>
          <router-link to="/login">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 text-xl text-slate-950 hover:text-slate-500 mr-4"
            >
              Sign In
            </a>
          </router-link>
        </div>
        <div>
          <router-link to="/register">
            <a
              class="block mt-4 lg:inline-block lg:mt-0 text-xl text-slate-950 hover:text-slate-500 mr-4"
            >
              Sign Up
            </a>
          </router-link>
        </div>
        <div>
          <a
            href=""
            @click.prevent="handleLogout"
            class="block mt-4 lg:inline-block lg:mt-0 text-xl text-slate-950 hover:text-slate-500"
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
