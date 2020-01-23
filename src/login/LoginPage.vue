<template>
    <div class="wrap-login">
        <div class="login">
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <h4 align="center">로그인</h4>
            <div id="input-id">
                <!-- <div>
                    <label for="inputFormatter">이메일</label>
                </div>
                <div>
                    <el-input type="email" v-model="email" v-validate="'required'" placeholder="Enter your e-mail"></el-input>
                </div> -->
                <v-text-field 
                v-model="email" 
                label="이메일" 
                required>
                </v-text-field>
            </div>
            <div id="input-pwd">
                <!-- <div>
                    <label for="inputFormatter">비밀번호</label>
                </div>
                <div>
                    <el-input type="password" v-model="password" v-on:keyup.enter="user_login" placeholder="Password" required></el-input>
                </div> -->
                <v-text-field
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Not visible"
                    v-model="password"
                    class="input-group--focused"
                    placeholder="비밀번호"
                    @click:append="show3 = !show3"
                    v-on:keyup.enter="user_login"
                ></v-text-field>            
            </div>
            <div id="checkbox">
                <label>
                    <input type="checkbox" v-model="idcheck" value="remember-me"> Remember me
                </label>
            </div>
            <div id="user-btn">
                <v-btn v-on:click="user_login" outline color="pink" block>로그인</v-btn>
            </div>
            <div id="account-btn">
                <a id="reg_txt" href="#/register" v-on:click="onRegister" outline color="pink">회원가입</a>
                <a id="find_pwd" href="#">비밀번호 찾기</a>
                <!--<v-btn v-on:click="onRegister" outline color="pink">회원가입</v-btn>
                <v-btn outline color="pink">비밀번호 찾기</v-btn>-->
            </div>
            <div id="sns-button">
                <div class="naver-btn">
                    <a v-bind:href="getNaverBtn"><img height='44' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>
                </div>
                <div class="google-btn" v-on:click="handleSignInClick()" >
                    <div  class="google-icon-wrapper" >
                        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" >
                    </div>
                    <p class="btn-text" >Sign in with google</p>
                </div>
            </div>
        </div>
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
        }),
        getNaverBtn(){
            var host = window.location.host;
            console.log("host :"+host);

            // var naverBtn = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gGeZ9i_jrqofbACc0C6q&redirect_uri=http://'
            //         + host
            //         + '/#/login&state=yeoulab';

            var naverBtn = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gGeZ9i_jrqofbACc0C6q&redirect_uri=http://yeoulab.ml/server/social/naverGetCode&state=login';
                    
            return naverBtn;
        }
    },
    created () {
        // reset login status
        console.log("LoginPage Vue Created");
        this.logout();

        // coockie setting
        this.idcheck  = this.$cookie.get("idcheck");
        this.email    = this.$cookie.get("email");
        this.password = this.$cookie.get("password");

        // console.log("#####");
        // console.log(window.location.hash);
        // console.log("#####222222");
        // console.log(this.$route.params);
        // console.log(this.$route.hash);
        // console.log(this.$route.query.code);
        // var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
        // console.log(urlParams);
        var code = this.$route.query.code;
        var state = this.$route.query.state;
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

.wrap-login{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.login{
    display: flex;
    flex-direction: column;
}

h4{
   font-family: 'Malgun Gothic', sans-serif;
   text-align: center;
   font-weight: bold;
}

#user-btn{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dotted pink;
}

#account-btn{
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 20px;
}
#account-btn #reg_txt{
    padding-right: 10px;
}

#sns-button{
    display: flex;
    flex-direction: row;
    padding-top: 10px;
}

#sns-button google-btn{
    flex-shrink: 0;
}

$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

.naver-btn{
    padding-right: 10px;
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
