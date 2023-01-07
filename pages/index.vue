<template>
  <v-container>
    <h1>
      Хочу поиграть
    </h1>
    <v-row v-if="!wantPlay.length">
      <v-col>
        <v-card>
          В списке нет игр
        </v-card>
      </v-col>
    </v-row>
    <Game v-for="game in wantPlay" :game="game" @wantPlayClick="reload"/>

  </v-container>
</template>

<script>
import axios from "axios";
import Pda4Repository from "@/app/repositories/Pda4Repository";
import WantPlayRepository from "@/app/repositories/WantPlayRepository";
import Game from "@/components/Game";

export default {
  components: {Game},
  data: () => ({
    wantPlay: []
  }),
  name: 'IndexPage',
  methods: {
    reload() {
      this.wantPlay = WantPlayRepository.getAll()
    }
  },
  async mounted() {
    this.reload();

    // this.test = await axios.get('/site?showforum=522')
  }
}
</script>
