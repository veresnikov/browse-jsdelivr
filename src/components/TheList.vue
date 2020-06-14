<template lang="pug">
div
  template(v-if="dirty && count && $store.state.packages.length")
    p.mt-2(v-if="dirty") Результатов поиска:
      =' '
      span.badge.badge-pill.badge-dark {{ count }}
    table.data-table.table.table-dark(:class="{ 'data-table--loading': $store.state.fetching.search }")
      thead
        tr
          th(scope="col") Name
          th(scope="col") Version
          th(scope="col") Description
      tbody
        tr(v-for="p, index in $store.state.packages" :key="index")
          td(@click.prevent="$store.dispatch('showPackage', p.name)")
            a.data-table__link.nuxt__(href="#") {{ p.name }}
          td {{ p.version }}
          td {{ p.description }}
    .d-flex.justify-content-center
      BasePagination
  p(v-else-if="dirty") Ничего не нашлось
  p(v-else) Введите название пакета
</template>

<script>
import BasePagination from './BasePagination'

export default {
  name: 'TheList',
  components: { BasePagination },
  computed: {
    dirty () {
      return this.$store.state.total !== null
    },
    count () {
      return this.$store.state.total
    }
  }
}
</script>

<style lang="scss">
.data-table {
  &__link {
    color: #ffffff;
    &:hover {
      color: #ffffff;
    }
  }
  &--loading {
    opacity: .6
  }
}
</style>
