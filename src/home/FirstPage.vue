<template>
    <div class="layer">
        <!-- <b-button to="/login">로그인으로...</b-button> -->
        <el-button v-on:click="onLogin">로그인</el-button>
        <el-button v-on:click="onRegister">회원가입</el-button>
    </div>
</template>
<script>
export default{
    methods: {
        onLogin() {
            console.log("####");
            this.$router.push({path: '/login'})
        },
        onRegister() {
            this.$router.push({path: '/register'})
        }
    }
}
</script>
<style>
.layer{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%)
}
</style>
