<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navigation from '../home/Navigation.vue'
import FirstPage from '../home/FirstPage.vue'
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es7/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

export default {
    name: 'app',
    components: {
      Navigation,
      FirstPage,
    },
    data() {
        return {
            image: 'https://picsum.photos/1024/400/?image=41',
            icons: [],
            list: [],
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
<style>
    .container {
        height: 100%;
    }

</style>