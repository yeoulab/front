<template>
<!-- 아이콘 확인은 https://material.io 에서 -->
  <!-- <v-card height="50px" flat> -->
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      color="pink"
      fixed
      dark
    >
      <v-btn
        color="white"
        flat
        value="recent"
        v-on:click="goToCurrent"
      >
        <span>할 일</span>
        <v-icon>playlist_add</v-icon>
      </v-btn>

      <v-btn
        color="white"
        flat
        value="favorites"
        v-on:click="goToDone"
      >
        <span>한 일</span>
        <v-icon>done_outline</v-icon>
      </v-btn>

      <v-btn
        color="white"
        flat
        value="nearby"
        v-on:click="goToChart"
      >
        <span>통계</span>
        <v-icon>bar_chart</v-icon>
      </v-btn>
    </v-bottom-nav>
  <!-- </v-card> -->
</template>
</template>
<script>
export default{
    data() {
        return {
            bottomNav: 'recent'
        }
    },
    created(){

    },
    methods: {
        goToCurrent(){
            //this.$router.push('/home/current');
            this.$emit('goToCurrent');
        },
        goToDone(){
            this.$emit('goToDone');
        },
        goToChart(){
            //this.$router.push('/home/chart');
            this.$emit('goToChart');
        }
    }
}
</script>
<style>
</style>