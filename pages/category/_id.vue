<template>
  <v-container>
    <v-row v-if="category">
      <v-col>
        <h1>{{category.title}}</h1>
      </v-col>
    </v-row>
    <Game :key="post.url" v-for="post in posts" :game="post"/>

    <v-dialog
      v-model="dialog"
      width="1200"
      max-width="100%"
    >
      <img :src="dialogImg" />

    </v-dialog>
    <div class="pag" v-if="category">
      <v-pagination
        v-model="page"
        :length="pagesCount"
        :total-visible="7"
      ></v-pagination>

    </div>

  </v-container>
</template>

<script>
import Pda4Repository from "@/app/repositories/Pda4Repository";
import Game from "@/components/Game";

export default {
  components: {Game},
  name: "_id",
  data: () => {
    return {
      page: 1,
      dialogImg: null,
      dialog: false,
      posts: [],
      category: null,
    }
  },
  computed: {
    pagesCount() {
      if (!this.category) {
        return 0
      }
      return this.category.count % 30 ? parseInt(this.category.count / 30) + 1 : this.category.count / 30;
    }
  },
  watch: {
    page() {
      this.loadPage(this.page)
    },
    dialog() {
      if (!this.dialog) {
        this.dialogImg = null
      }
    },
    dialogImg() {
      if (this.dialogImg) {
        this.dialog = true
      }
    }
  },
  methods:{
    chunk(items, count) {
      let answer = [];
      let put = [];
      for(let i of items) {
        if (put.length === count) {
          answer.push(put)
          put = []
        }
        put.push(i)
      }
      if (put.length) {
        answer.push(put)
      }

      return answer;
    },
    async load(posts) {
      await Promise.all(posts.map(x => Pda4Repository.getGame(x.url)))

      setTimeout(async () => {

        for(let post of posts) {
          post.images = (await Pda4Repository.getGame(post.url)).images
        }
      }, 500)
    },
    async loadPage(page = 1) {
      this.posts = [];
      let data = await Pda4Repository.getCategory(this.$route.params.id, page)
      this.posts = data.posts
      this.pagesCount = data.pagesCount

      let startPosts = this.chunk(this.posts, 4)[0];
      await this.load(startPosts)
      await this.load(this.posts)
    }
  },
  async mounted() {
    let allCat = await Pda4Repository.getAllCategories();
    this.category = allCat.find(x => x.url == this.$route.params.id)
    this.loadPage(1);




  }
}
</script>

<style scoped>

.pag {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
  width: 100%;
  z-index: 2;

}
</style>
