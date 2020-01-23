<template>
    <div id="wrap-reg">
        <div class="register">
            <h4>여울&여름이의 다이어리</h4>
            <div id="content-register">
                <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                <div id="email-input">
                    <v-text-field 
                    v-model="user.email" 
                    label="이메일" 
                    required>
                    </v-text-field>
                </div>
                <div id="name-input">
                    <v-text-field 
                    v-model="user.username" 
                    label="이름" 
                    required>
                    </v-text-field>
                </div>
                <div id="pwd-input">
                    <v-text-field
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Not visible"
                    v-model="user.password"
                    class="input-group--focused"
                    placeholder="비밀번호"
                    @click:append="show3 = !show3"
                ></v-text-field>
                </div>
                <div id="btn-input">
                    <v-btn v-on:click="userRegist" outline color="pink" block>가입</v-btn>
                    <!-- <v-btn v-on:click="onLogin" outline color="pink">로그인</v-btn> -->
                </div>
                <div id="sns-button">
                    <div class="naver-btn">
                        <a v-bind:href="getNaverBtn" ><img height='44' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>
                    </div>
                    <div class="google-btn" v-on:click="handleSignInClick()" >
                        <div  class="google-icon-wrapper" >
                            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" >
                        </div>
                        <p class="btn-text" >Sign up with google</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { socialService } from '../_services';

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
            submitted: false,
            show3: false,
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

            var naverBtn = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gGeZ9i_jrqofbACc0C6q&redirect_uri=http://yeoulab.ml/server/social/naverGetCode&state=register';
            return naverBtn;
        }
    },
    created (){
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
                        var name  = res.data.response.name;
                        var password = res.data.response.id;
                        if (email && password && name) {
                            console.log("##### naver sign up 처리 #####");
                            
                            that.submitted      = true;
                            that.user.email     = email;
                            that.user.username  = name;
                            that.user.password  = password;

                            that.register(that.user);
                        }
                    }
                });
            });
        }
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
                        'requestMask.includeField': 'person.names,person.emailAddresses'
                    }).then(function(response) {

                        window.setTimeout( () => {
                            that.submitted      = true;
                            that.user.email     = response.result.emailAddresses[0].value;
                            that.user.username  = response.result.names[0].displayName;
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
#wrap-reg{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.register{
    display: flex;
    flex-direction: column;
}

h4{
   font-family: 'Malgun Gothic', sans-serif;
   text-align: center;
   font-weight: bold;
}

#email-input, #name-input, #pwd-input, #sns-button{
    display: flex;
}
#btn-input{
    padding-bottom: 10px;
    border-bottom: 1px dotted pink;
}

#sns-button {
    padding-top: 15px;
}

.naver-btn{
    padding-right: 10px;
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
  flex-shrink: 0;
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
