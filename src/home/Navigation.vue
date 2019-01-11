<template>
  <div>
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
            <b-dropdown-item v-if="this.user != null" to="#">사용자정보</b-dropdown-item>
            <b-dropdown-item v-if="this.user != null" to="/login">로그아웃</b-dropdown-item>
            <!-- <b-dropdown-divider></b-dropdown-divider> -->
            <!-- <b-dropdown-item v-if="this.user === null" to="/login">로그인</b-dropdown-item> -->
            <b-dropdown-item v-if="this.user === null" to="/register">회원가입</b-dropdown-item>
            <b-dropdown-item v-if="this.user === null" to="#">ID 찾기/PW 찾기</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <br>
    <!-- {{ user }} -->
  </div>
</template>
<script>
  // vuex 를 위한 import
  import {mapState, mapActions} from 'vuex';

  export default {
    computed: {
        ...mapState({
            user: state => state.account.user,
        }),
    }
  }
</script>