<template>
    <div class="layer">
        <v-btn v-on:click="onLogin" outline color="pink">로그인</v-btn>
        <v-btn v-on:click="onRegister" outline color="pink">회원가입</v-btn>
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
  /* position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%) */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
}
</style>
