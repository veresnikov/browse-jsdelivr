<template lang="pug">
div(v-if="info")
  PackageDataTop(v-if="info.total" title="Top 5 files" :data="info.files" :total="info.total")
</template>

<script>
import axios from '../../utils/api'
import PackageDataTop from './PackageDataTop'

export default {
  components: { PackageDataTop },
  data () {
    return { info: null, list: [] }
  },
  async created () {
    const { data } = await axios.get(`/package/npm/${this.$store.state.package.name}@${this.$store.state.package.version}/stats`)
    this.info = data
  }
}
</script>
