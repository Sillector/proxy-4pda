<template>

  <v-row>
    <v-col>
      <v-lazy
        :options="{
        threshold: .5
      }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card>
          <v-card-title>
            {{game.title}}

            <div class="open-btn">
              <v-btn @click="wantPlayToggle">
                <span v-if="!isWantPlay">Хочу поиграть</span>
                <span v-if="isWantPlay">Не хочу поиграть</span>
              </v-btn>
              <v-btn class="success" target="_blank" :href="'https://4pda.to/forum/index.php?showtopic=' + game.url">Открыть</v-btn>
            </div>
          </v-card-title>
          <v-card-subtitle>
            {{game.subTitle}}
          </v-card-subtitle>

          <v-divider></v-divider>
          <v-card-text>
            <v-row v-if="game.images == null">
              <v-col cols="4" :key="j" v-for="j in 3">
                <v-skeleton-loader
                  class="mx-auto"
                  type="image"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row v-if="game.images && game.images.length <= 3">
              <v-col  class="item col-4" :key="j" v-for="j in game.images">
                <img @click="$emit('open', 'https:' + j)" loading="lazy" :src="'https:' + j" alt="">
              </v-col>
            </v-row>
            <v-carousel delimiter-icon="mdi-minus" height="300"
                        hide-delimiter-background v-if="game.images && game.images.length > 3">
              <v-carousel-item :key="_" v-for="(i,_) in chunk(game.images,3)">
                <v-row>
                  <v-col class="item col-4" :key="j" v-for="j in i">
                    <img  @click="$emit('open', 'https:' + j)" loading="lazy" :src="'https:' + j" alt="">
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
import WantPlayRepository from "@/app/repositories/WantPlayRepository";

export default {
  name: "Game",
  props: {
    game: Object
  },
  data: () => {
    return {
      isWantPlay: false,
    }
  },
  mounted() {
    this.isWantPlay = !!WantPlayRepository.getAll().find(x => x.url === this.game.url)
  },

  methods: {
    wantPlayToggle() {
      if (this.isWantPlay) {
        WantPlayRepository.remove(this.game)
        this.isWantPlay = false
      } else {
        WantPlayRepository.add(this.game)
        this.isWantPlay = true
      }
      this.$emit('wantPlayClick')

    },
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
  }
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px
}
.item img {
  max-height: 300px;
  /*cursor: pointer;*/
}
.open-btn {
  position: absolute;
  right: 16px;
}
</style>
