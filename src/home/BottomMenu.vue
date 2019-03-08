<template>
  <v-card height="50px" flat>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
      shift
    >
      <v-btn
        color="teal"
        flat
        value="recent"
        v-on:click="goToCurrent"
      >
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
        v-on:click="goToDone"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
        v-on:click="goToChart"
      >
        <span>Chart</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
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