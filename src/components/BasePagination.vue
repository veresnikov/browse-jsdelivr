<template lang="pug">
nav
  ul.pagination
    li.page-item(:class="{ disabled: !prevPage }" key="prev")
      router-link.page-link(v-if="prevPage" :to="`/?page=${prevPage}&q=${text}`") Назад
      a.page-link(v-else href="#") Назад
    li.page-item(v-for="p in prevPages" :key="p")
      router-link.page-link(:to="`/?page=${p}&q=${text}`") {{ p }}
    li.page-item.disabled(key="current")
      a.page-link(href="#") {{ currentPage }}
    li.page-item(v-for="p in nextPages" :key="p")
      router-link.page-link(:to="`/?page=${p}&q=${text}`") {{ p }}
    li.page-item(:class="{ disabled: !nextPage }" key="next")
      router-link.page-link(v-if="nextPage" :to="`/?page=${nextPage}&q=${text}`") Далее
      a.page-link(v-else href="#") Далее
</template>

<script>
export default {
  name: 'BasePagination',
  computed: {
    currentPage () {
      const page = this.$route.query.page
      return parseInt(page, 10) ? parseInt(page, 10) : 0
    },
    count () {
      return this.$store.state.total
    },
    pagesCount () {
      return Math.ceil(this.count / this.$store.state.limit)
    },
    prevPage () {
      const prevPage = this.currentPage - 1
      return prevPage > 0 ? prevPage : false
    },
    prevPages () {
      const prevPages = []
      let i = this.currentPage
      while (i > 1) {
        i--
        prevPages.unshift(i)
      }
      return prevPages.slice(-5)
    },
    nextPage () {
      const newPage = this.currentPage + 1
      return newPage > this.pagesCount ? false : newPage
    },
    nextPages () {
      const nextPages = []
      let i = this.currentPage
      while (i < this.pagesCount) {
        i++
        nextPages.push(i)
      }
      return nextPages.slice(0, 5)
    },
    text () {
      return this.$route.query.q
    }
  }
}
</script>
