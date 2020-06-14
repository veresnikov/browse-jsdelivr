<template lang="pug">
.container-fluid.package-data(v-if="package")
  .row
    .col-12
      h1 {{ package.name }}
        =' '
        span.badge.badge-info {{ package.version }}
      p
        img(:src="`https://data.jsdelivr.com/v1/package/npm/${package.name}/badge?style=rounded`")
      p {{ package.description }}
    .col-12
      template(v-for="k in package.keywords")
        span.badge.badge-pill.badge-dark.mr-1 {{ k }}
        =' '
    .col-12.my-2.package-data__icons
      a.text-dark(:href="package.links.npm" target="_blank")
        i.fa.fa-download(aria-hidden="true")
      a.text-dark.ml-2(v-if="package.links.repository" :href="package.links.repository" target="_blank")
        i.fa.fa-github(aria-hidden="true")
    .col-12.my-2
      img.ml-1(v-for="m in package.maintainers" :key="m.username" :src="`https://github.com/${m.username}.png?s=20`" height="50")
    .col-12.col-lg-6.my-2
      PackageDataFiles
    .col-12.col-lg-6.my-2
      PackageDataStat
    .col-12.col-lg-6.my-2
      PackageDataFilesStat
    .col-12.my-2
      PackageDataChart
</template>

<script>
import PackageDataStat from './PackageData/PackageDataStat'
import PackageDataFiles from './PackageData/PackageDataFiles'
import PackageDataFilesStat from './PackageData/PackageDataFilesStat'
import PackageDataChart from './PackageData/PackageDataChart'

export default {
  components: { PackageDataStat, PackageDataFiles, PackageDataFilesStat, PackageDataChart },
  computed: {
    package () {
      return this.$store.state.package
    }
  }
}
</script>

<style lang="scss">
.package-data {
  &__icons {
    font-size: 30px;
  }
}
</style>
