<template>
  <div class="circular" >
    <Navigation></Navigation>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navigation from '../home/Navigation.vue'

export default {
    name: 'app',
    components: {
      Navigation,
    },
    data() {
        return {
            image: 'https://picsum.photos/1024/400/?image=41',
        }
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>