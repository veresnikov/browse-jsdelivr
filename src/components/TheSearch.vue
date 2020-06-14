<template lang="pug">
.search.mt-4
  form(@submit.prevent="search()")
    input.search__input.form-control(v-model="text" ref="text" @keyup="search()")
  .alert.alert-danger.mt-4(v-if="error" role="alert") {{ error }}
</template>

<script>
export default {
  name: 'TheSearch',
  data () {
    const text = this.$route.query.q || ''
    return { text }
  },
  computed: {
    pageNumber () {
      const pageNumber = parseInt(this.$route.query.page, 10)
      if (!pageNumber) return 0
      return pageNumber
    },
    loading () {
      return this.$store.state.fetching.search
    },
    error () {
      return this.$store.state.error
    }
  },
  mounted () {
    this.$refs.text.focus()
    this.fetchData()
  },
  methods: {
    async search () {
      if (this.text === this.$route.query.q && this.pageNumber === 1) return
      await this.$router.push({ path: '/', query: { page: 1, q: this.text } })
    },
    async fetchData () {
      if (this.pageNumber < 1 || !this.$route.query.q) {
        this.$store.commit('SET_PACKAGES', { packages: [], total: null })
        return
      }
      const from = (this.pageNumber - 1) * this.$store.state.limit
      await this.$store.dispatch('search', { text: this.$route.query.q, from })
    }
  },
  watch: {
    $route (to, from) {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss">
.search {
  &__input {
    border: 1px solid #000000;
    &:focus {
      box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
