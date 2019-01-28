<template>
    <div class="register">
        <h4>가입해보세요!</h4>
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                <label for="inputFormatter">이메일</label>
                <el-input type="email" v-model="user.email" v-validate="'required'" placeholder="이메일"></el-input>
                <label for="inputFormatter">이름</label>
                <!-- <input type="text" v-model="user.username" v-validate="'required'" name="username" placeholder="이름" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" /> -->
                <el-input type="text" v-model="user.username" v-validate="'required'" name="username" placeholder="이름"></el-input>
                <label for="inputFormatter">비밀번호</label>
                <!-- <b-form-input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" placeholder="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" /> -->
                <el-input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" placeholder="password"></el-input>
                <p></p>
                <el-button  v-on:click="userRegist">가입</el-button>
                <!-- <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> -->
                <el-button  v-on:click="onLogin">로그인</el-button>
                <!-- <router-link to="/login" class="btn btn-link">뒤로가기</router-link> -->
                <p></p>
            <!-- </div> -->
        <!-- </form> -->
        <!-- <button id="signin-button" @click="handleSignInClick()">구글로 회원가입</button> -->
        <!-- <a @click="handleSignInClick()">
            <img src="https://s3.ap-northeast-2.amazonaws.com/diary-image/btn_google_signin_light_normal_web.png">
        </a> -->
        <div class="google-btn" v-on:click="handleSignInClick()" >
            <div  class="google-icon-wrapper" >
                <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" >
            </div>
            <p class="btn-text" >Sign up with google</p>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                // firstName: '',
                // lastName: '',
                email: '',
                username: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions('account', ['register']),
        onLogin(){
            this.$router.push({path:'login'})
        },
        userRegist(e){
            console.log("userRegist start");
            console.log(this.user);
            // if( !this.user.firstName ){
            //     alert("이름을 입력하세요");
            //     return;
            // }
            // if( !this.user.lastName ){
            //     alert("성을 입력하세요");
            //     return;
            // }
            if( !this.user.email ){
                alert("이메일을 입력하세요");
                return;
            }
            if( !this.user.username ){
                alert("이름을 입력하세요");
                return;
            }
            if( !this.user.password ){
                alert("비밀번호를 입력하세요");
                return;
            }

            this.register(this.user);
        },
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        },
        handleSignInClick(event) {
            // Ideally the button should only show up after gapi.client.init finishes, so that this
            // handler won't be called before OAuth is initialized.
            // login 을 한다.
            console.log("this.submitted : " + this.submitted);

            var that = this;

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    // Make an API call to the People API, and print the user's given name.
                    gapi.client.people.people.get({
                        'resourceName': 'people/me',
                        'requestMask.includeField': 'person.names'
                    }).then(function(response) {
                        console.log('Register 에서 호출');
                        console.log('Hello, ' + response.result.names[0].givenName);

                        window.setTimeout( () => {
                            console.log("that.firstName", that.firstName);
                            that.submitted      = true;
                            that.user.firstName = response.result.names[0].familyName;
                            that.user.lastName  = response.result.names[0].givenName;
                            that.user.username  = response.result.names[0].metadata.source.id;
                            that.user.password  = response.result.names[0].metadata.source.id;

                            that.register(that.user);
                        }, 1000 );
                        // submitted      = true;
                        // user.firstName = response.result.names[0].familyName;
                        // user.lastName  = response.result.names[0].givenName;
                        // user.username  = response.result.names[0].metadata.source.id;
                        // user.password  = response.result.names[0].metadata.source.id;
                        // // this.submitted      = true;
                        // console.log(user);
                        // this.register(user);
                    }, function(reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });
                });
            
        },
    }
};
</script>
<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
h4{
   font-family: 'Malgun Gothic', sans-serif;
   text-align: center;
   font-weight: bold;
}

.register{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%)
}

$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

.google-btn {
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  cursor: pointer;
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
