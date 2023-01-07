<template>
  <v-sheet class="main">
    <div class="pa-4 main_logo">
      <div>
        <nuxt-link style="display:flex;" to="/">
          <img height="28px" >
        </nuxt-link>
      </div>
    </div>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        link
        to="/"
        :exact="true"
      >
        <v-list-item-content>
          <v-list-item-title>Хочу поиграть</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item
        v-for="[icon, text, url, exact, children] in links"
        :key="url"
        link
        :to="url"
        :exact="exact"
      >
        <v-list-item-icon v-if="icon">
          <v-icon size="20px">{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        no-action
        :group="group.link"
        v-for="group in groups"
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon size="20px" v-text="group.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{group.title}}</v-list-item-title>

          </v-list-item-content>

        </template>

        <v-list-item
          v-for="(child, i) in group.children"
          :key="i"
          :to="child.link"
          :exact="child.exact"
          link
        >
          <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
    <div style="height: 100%;"></div>
  </v-sheet>
</template>

<script>

import Pda4Repository from "@/app/repositories/Pda4Repository";

export default {
  name: "Menu",
  data: () => {
    return {
      links: []
    }
  },
  computed: {
    groups() {
      let groups = [];
      return groups;
    },
    // links() {
    //   let links = [];
    //
    //     links.push(['mdi-home', 'Главная', '/'])
    //
    //
    //   return links;
    // }
  },
  async mounted() {
    this.links = (await Pda4Repository.getAllCategories()).map(x => ([null, x.title, '/category/' + x.url]))
  }

}
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
