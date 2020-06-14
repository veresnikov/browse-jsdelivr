<template lang="pug">
.container#app.vh-100.d-flex.flex-column
  TheHeader
  main
    TheList
  TheFooter
  BaseModal
    PackageData
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import TheHeader from './components/TheHeader'
import TheList from './components/TheList'
import TheFooter from './components/TheFooter'
import BaseModal from './components/BaseModal'
import PackageData from './components/PackageData'

export default {
  name: 'App',
  components: { TheHeader, TheList, TheFooter, BaseModal, PackageData }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
