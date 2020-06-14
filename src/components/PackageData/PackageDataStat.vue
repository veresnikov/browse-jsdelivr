<template lang="pug">
div(v-if="info")
  PackageDataTop(v-if="info.total" title="Top 5 versions" :data="info.versions" :total="info.total")
</template>

<script>
import axios from '../../utils/api'
import PackageDataTop from './PackageDataTop'

export default {
  components: { PackageDataTop },
  data () {
    return { info: null }
  },
  async created () {
    const { data } = await axios.get(`/package/npm/${this.$store.state.package.name}/stats`)
    this.info = data
  }
}
</script>
