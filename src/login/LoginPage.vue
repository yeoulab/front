<template>
    <div>
        <h4 align="center">로그인</h4>
        <label for="inputFormatter">이메일</label>
        <b-form-input type="email" v-model="email" v-validate="'required'" placeholder="Enter your e-mail"></b-form-input>
        <!-- <label for="username" class="sr-only">아이디</label> -->
        <!-- <input type="text" v-model="username" name="username" class="form-control" placeholder="id" required autofocus> -->
        <!-- <label for="inputPassword" class="sr-only">패스워드</label> -->
        <label for="inputFormatter">비밀번호</label>
        <input type="password" v-model="password" name="password" class="form-control" v-on:keyup.enter="user_login" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="user_login">Sign in</button>
        <p></p>
        <div class="body" align="center">
            <a @click="handleSignInClick()">
                <img src="https://s3.ap-northeast-2.amazonaws.com/diary-image/btn_google_signin_light_normal_web.png">
            </a>
        </div>
        <p></p>
        <div class="footer" align="center">
            <router-link to="/register" class="btn btn-link">회원가입</router-link>
            <router-link to="/register" class="btn btn-link">아이디찾기</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: '',
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
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
                this.login({ email, password })
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
                'requestMask.includeField': 'person.names'
            }).then(function(response) {
                console.log('Login 에서 호출');
                console.log('Hello, ' + response.result.names[0].givenName);
                //this.user.username  = response.result.metadata.source.id;
                that.submitted      = true;
                // that.username = response.result.names[0].metadata.source.id;
                // that.password = response.result.names[0].metadata.source.id;

                var username = response.result.names[0].metadata.source.id;
                var password = response.result.names[0].metadata.source.id;
                if (username && password) {
                    console.log("##### google 로그인 처리 #####");
                    that.login({ username, password })
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
<style>
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

</style>