<script>
export default {
  props: ['genre']
}
</script>

<template>
  <button
    disabled
    class="bg-gray-300 text-slate-900 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
  >
    {{ genre.name }}
  </button>
</template>
