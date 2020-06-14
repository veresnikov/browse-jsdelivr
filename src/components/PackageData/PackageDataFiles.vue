<template lang="pug">
div(v-if="info")
  // p(v-if="info.default") default: {{ info.default }}
  // p(v-for="f in info.files" :key="f.name") {{ f.type }}: {{ f.name }}
  PackageDataTop(title="npm CDN Files" :data="info.files" :total="info.total" v-slot="slotProps")
    i.fa(aria-hidden="true" :class="slotProps.item.type === 'file' ? 'fa-file' : 'fa-folder'")
    =' '
    span {{ slotProps.item.name }}
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
    const { data } = await axios.get(`/package/npm/${this.$store.state.package.name}@${this.$store.state.package.version}`)
    this.info = data
  }
}
</script>
