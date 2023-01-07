<template>
  <v-app id="inspire"
         v-resize="onResize">
    <v-navigation-drawer
      :mobile-breakpoint="SIZES.MEDIUM "
      v-model="drawer"
      :permanent="!isMobile"
      :expand-on-hover="isMedium"
      app
      class="bar-2"
    >
      <Menu/>
    </v-navigation-drawer>
    <v-app-bar v-if="isMobile" app>
      <img style="cursor: pointer;" @click="$router.push('/')" height="28px" >
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
<!--    <Loading v-if="loading"></Loading>-->
  </v-app>
</template>
<style lang="scss">
.v-data-footer__select {
  visibility: hidden;
  width: 1px;
}
.v-main{
  background: #0000000d;
}
@import "assets/main";
</style>
<script>

import Menu from "../components/Menu";

const SIZES = {
  MOBILE: 450,
  MEDIUM: 1200,
}


export default {
  name: 'default',
  components: {Menu},
  data: () => ({
    loading: false,
    width:  SIZES.MEDIUM,
    drawer: null,
    SIZES
  }),
  methods: {


    onResize() {
      this.width = window.innerWidth;
      // cookies.setCookie('width', this.width)

    }
  },
  watch: {
    width() {
      if (this.isMedium) {
        this.drawer = undefined;
      } else {
        this.drawer = null;
      }
    }
  },
  computed: {
    isMobile() {
      return this.width <= SIZES.MOBILE;
    },
    isMedium() {
      return this.width > SIZES.MOBILE && this.width < SIZES.MEDIUM;
    },
    isLarge() {
      return this.width > SIZES.MEDIUM;
    },
  },
  created() {
    this.$vuetify.theme.dark = false;
  },
  mounted() {
    this.onResize();
    if (typeof localStorage !== "undefined") {
      if (this.$route.query.utm_source) {
        localStorage.utm_source = this.$route.query.utm_source;
      }
    }
  }
}
</script>
