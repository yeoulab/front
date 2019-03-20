<template>
    <div class="topMenu">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0"><i class="el-icon-menu" v-on:click="check()"></i></el-menu-item>
        <el-menu-item index="1">Todo 관리</el-menu-item>
        <el-menu-item index="2" disabled>山愛커플</el-menu-item>
        <!-- <el-menu-item index="3" disabled>피카소 Shin</el-menu-item>
        <el-menu-item index="4" disabled></el-menu-item> -->
        <el-submenu index="5" align="right">
          <template slot=title>요! {{ this.user.username }} 님</template>
          <el-menu-item index="5-1">회원정보</el-menu-item>
          <el-menu-item index="5-2">로그아웃</el-menu-item>
        </el-submenu>

        <!-- <el-submenu index="2">
            <template slot="title">Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-submenu>
        </el-submenu> -->
        <!-- <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default{
    data() {
      return {
        activeIndex: '1',
        items: [
        'All', 'Family', 'Friends', 'Coworkers'
      ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log("key : "  + key);
        console.log("keyPath : " +  keyPath);
        // 님 => 로그아웃
        if( key === "5-2" ){
            console.log("DDDD");
            this.$router.push({path:'/login'});
        }
      }
    },
    computed: {
        ...mapState({
            user: state => state.account.user,
        })
    }
}
</script>
<style>

</style>
