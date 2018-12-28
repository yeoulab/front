<template>

  <div class="circular" >
    <b-navbar toggleable="md" type="dark" variant="success">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">홈</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="#">링크</b-nav-item>
      </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right text="사용자" class="m-2">
            <!-- <template slot="button-content">
            <em>사용자</em>
            </template> -->
            <b-dropdown-item to="#">사용자정보</b-dropdown-item>
            <b-dropdown-item to="/login">로그아웃</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item to="/login">로그인</b-dropdown-item>
            <b-dropdown-item to="/register">회원가입</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <br>
<!-- <div class="circular" :style="{ backgroundImage: 'url(' + image + ')' }"> -->
    
    <!-- <b-jumbotron bg-variant="https://picsum.photos/1024/400/?image=41">  -->
        <!-- <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Fluid image" /> -->
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <router-view></router-view>
                </div>
            </div>
        </div>
            
    <!-- <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <b-nav-item href="/register">회원가입</b-nav-item>
            <b-nav-item href="/register">아이디 찾기</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->
    <!-- <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div> -->

    <!-- <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div> -->
                    
                <!-- </div>
            </div>
        </div>
    </div> -->
    <!-- </b-jumbotron> -->
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
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