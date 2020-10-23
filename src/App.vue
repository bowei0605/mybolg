<template>
  <v-app>
    <v-app-bar app color="white" elevate-on-scroll v-if="$route.path!='/Login'">
      <HeaderNav />
    </v-app-bar>
    <router-view />
  </v-app>
</template>
<script>
import HeaderNav from '@/components/HeaderNav'
export default {
  components: {
    HeaderNav,
  },
  mounted () {
    console.log(this.$route.path)
  }
}
</script>
