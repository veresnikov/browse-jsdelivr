<template lang="pug">
.card
  .card-header(v-if="title") {{ title }}
  ul.list-group
    li.list-group-item(v-for="l in list" :key="l.name")
      .row
        .col.text-left
          slot(v-bind:item="l") {{ l.name }}
        .col.text-right(v-if="l.total") {{ l.total }}
        .col(v-if="'percent' in l")
          .progress
            .progress-bar.bg-success(role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${l.percent}%`") {{ l.percent }} %
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    data: {
      type: [Array, Object],
      required: true
    },
    total: {
      type: Number
    }
  },
  computed: {
    list () {
      if (Array.isArray(this.data)) return this.data

      const list = Object.entries(this.data).map(_ => {
        return { name: _[0], total: _[1].total, percent: Math.round((_[1].total / this.total) * 100) }
      })
      list.sort((a, b) => {
        if (a.total > b.total) return -1
        else if (a.total < b.total) return 1
        else return 0
      })
      return list.slice(0, 5)
    }
  }
}
</script>
