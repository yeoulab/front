<template>
    <div class="login">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <h4 align="center">로그인</h4>
        <div class="input-id">
            <div>
                <label for="inputFormatter">이메일</label>
            </div>
            <div>
                <el-input type="email" v-model="email" v-validate="'required'" placeholder="Enter your e-mail"></el-input>
            </div>
        </div>
        <div class="input-pwd">
            <div>
                <label for="inputFormatter">비밀번호</label>
            </div>
        <!-- <input type="password" v-model="password" name="password" class="form-control" v-on:keyup.enter="user_login" placeholder="Password" required> -->
            <div>
                <el-input type="password" v-model="password" v-on:keyup.enter="user_login" placeholder="Password" required></el-input>
            </div>
        </div>
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" v-model="idcheck" value="remember-me"> Remember me
            </label>
        </div>
        <div class="user-btn">
            <el-button v-on:click="user_login">Sign in</el-button>
            <el-button v-on:click="onRegister">회원가입</el-button>
            <el-button>비밀번호 찾기</el-button>
        </div>
        <p></p>
        <div>
        </div>
        <!-- <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="user_login">Sign in</button> -->
        <p></p>
        <el-row>
            <el-col :span="60">
                <div class="naver-btn">
                    <a href='https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gGeZ9i_jrqofbACc0C6q&redirect_uri=http://localhost:8080/login&state=yeoulab'><img height='44' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>
                </div>
            </el-col>
            <el-col :span="60">
                <div class="google-btn" v-on:click="handleSignInClick()" >
                    <div  class="google-icon-wrapper" >
                        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" >
                    </div>
                    <p class="btn-text" >Sign in with google</p>
                </div>
            </el-col>
        </el-row>
        <!-- <div> -->
            <!-- <button v-on:click="naverlogin" >naver</button> -->
            <!-- <a href='https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gGeZ9i_jrqofbACc0C6q&redirect_uri=http://localhost:4000/social/naverCallback&state='><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a> -->
            
        <!-- </div> -->
        <!-- <div class="body" align="center">
            <a @click="handleSignInClick()">
                <img src="https://s3.ap-northeast-2.amazonaws.com/diary-image/btn_google_signin_light_normal_web.png">
            </a>
        </div>
        <p></p>
        <div class="footer" align="center">
            <router-link to="/register" class="btn btn-link">회원가입</router-link>
            <router-link to="/register" class="btn btn-link">아이디찾기</router-link>
        </div> -->
    </div>
</template>

<script>
// 2018.01.29
// cookie added
// 2018.01.30
// naver login added
// 1304499990
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { socialService } from '../_services';

export default {
    data () {
        return {
            email: '',
            //username: '',
            password: '',
            submitted: false,
            idcheck: '',
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created () {
        // reset login status
        this.logout();

        // coockie setting
        this.idcheck  = this.$cookie.get("idcheck");
        this.email    = this.$cookie.get("email");
        this.password = this.$cookie.get("password");

        var urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
        var state = urlParams.get('state');
        var param = {code, state};
        console.log(param);
        if( code && state ){
            socialService.getNaverToken(param).then((res) => {
                console.log("getNaverToken Start");
                var token = res.access_token;
                var value = { token };
                socialService.getNaverInfo(value).then((res) =>{
                    console.log("getNaverInfo Start");
                    if( res.data.response.email ){
                        var that = this;
                        var email = res.data.response.email;
                        var password = res.data.response.id;
                        if (email && password) {
                            console.log("##### naver 로그인 처리 #####");
                            that.login({ email, password })
                        }
                    }
                });
            });

            // axios.post('http://localhost:4000/social/naverCallback', payload ).then((res) => {
            //     console.log(res.data);
            //     var token = res.data.access_token;
            //     var value = { token };
            //     axios.post('http://localhost:4000/social/naverInfo', value ).then((rs) => {
            //         console.log(rs.data);
            //     });
            // })
        }
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        naverlogin(){
            axios.get('http://localhost:4000/social/naverlogin').then((res) =>{
                console.log(res);
            }
            );
        },
        onRegister(){
            this.$router.push({path:'register'})
        },
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;

            if (email && password) {
                this.login({ email, password })
            }
        },
        user_login( event ) {
            this.submitted = true;
            const { email, password } = this;
            if ( !email ){
                alert("아이디를 입력하세요");
                return;
            }
            if( !password ){
                alert("패스워드를 입력하세요");
                return;
            }
            if (email && password) {
                this.login({ email, password });
                if( this.idcheck == true ){
                    this.$cookie.set('email', email, {expires: 7});
                    this.$cookie.set('password', password, {expires: 7});
                    this.$cookie.set('idcheck', true, {expires: 7});
                }
                else{
                    this.$cookie.delete('email');
                    this.$cookie.delete('password');
                    this.$cookie.delete('idcheck');
                }
            }
        },
        handleSignInClick(event) {
            // Ideally the button should only show up after gapi.client.init finishes, so that this
            // handler won't be called before OAuth is initialized.+
            var that = this;

            gapi.auth2.getAuthInstance().signIn();
            
            // Make an API call to the People API, and print the user's given name.
            gapi.client.people.people.get({
                'resourceName': 'people/me',
                'requestMask.includeField': 'person.names,person.emailAddresses'
            }).then(function(response) {
                //this.user.username  = response.result.metadata.source.id;
                that.submitted      = true;
                // that.username = response.result.names[0].metadata.source.id;
                // that.password = response.result.names[0].metadata.source.id;

                var email = response.result.emailAddresses[0].value;
                var password = response.result.names[0].metadata.source.id;
                if (email && password) {
                    console.log("##### google 로그인 처리 #####");
                    that.login({ email, password })
                }
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });            
        },
        handleSignOutClick(event) {
            gapi.auth2.getAuthInstance().signOut();
        }        
    }

        //     <div class="header"> 
        //     <div class="form-group">
        //         <label for="username">아이디</label>
        //         <input type="text" v-model="username" name="username" class="form-control" />
        //         <!-- <div v-show="submitted && !username" class="invalid-feedback">Username is required</div> -->
        //     </div>
        //     <div class="form-group">
        //         <label htmlFor="password">비밀번호</label>
        //         <input type="password" v-model="password" name="password" class="form-control" v-on:keyup.enter="user_login" />
        //         <!-- <div v-show="submitted && !password" class="invalid-feedback">Password is required</div> -->
        //     </div>
        //     <div align="center" class="form-group">
        //         <button align="center" class="button button1" v-on:click="user_login">로그인</button>
        //     </div>
        // </div>
};
</script>
<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
h4{
   font-family: 'Malgun Gothic', sans-serif;
   text-align: center;
   font-weight: bold;
}

.login{
  position:absolute;
//   top: 50px;
//   left: 50px;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%)
}

// .el-input{
//     width: 329px;
// }
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}

.el-row {
    margin-bottom: 50px;
    &:last-child {
        margin-bottom: 0;
    }
}

$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

.user-btn{
    width: 400px;
}

.naver-btn{
    width: 145px;
}

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
