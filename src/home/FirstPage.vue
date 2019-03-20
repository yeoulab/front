<template>
    <div class="wrap-first">
        <div class="layer">
            <v-btn v-on:click="onLogin" outline color="pink">로그인</v-btn>
            <v-btn v-on:click="onRegister" outline color="pink">회원가입</v-btn>
        </div>
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

.wrap-first{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
