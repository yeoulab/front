<template>
    <div>
        <h4>회원가입</h4>
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <!-- <form @submit.prevent="handleSubmit"> -->
            <!-- <div class="form-group"> -->
                <!-- <label for="firstName">First Name</label> -->
                <label for="inputFormatter">이메일</label>
                <b-form-input type="email" v-model="user.email" v-validate="'required'" placeholder="Enter your e-mail"></b-form-input>
                <!-- <input type="text" v-model="user.firstName" v-validate="'required'" name="firstName" placeholder="First Name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" /> -->
                <!-- <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div> -->
            <!-- </div> -->
            <!-- <div class="form-group"> -->
                <!-- <label for="lastName">Last Name</label> -->
                <!-- <input type="text" v-model="user.lastName" v-validate="'required'" name="lastName" placeholder="Last Name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" /> -->
                <!-- <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div> -->
            <!-- </div> -->
            <!-- <div class="form-group"> -->
                <!-- <label for="username">ID</label> -->
                <label for="inputFormatter">이름</label>
                <input type="text" v-model="user.username" v-validate="'required'" name="username" placeholder="이름" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" />
                <!-- <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div> -->
            <!-- </div> -->
            <!-- <div class="form-group"> -->
                <!-- <label htmlFor="password">Password</label> -->
                <label for="inputFormatter">비밀번호</label>
                <b-form-input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" placeholder="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                <p></p>
                <!-- <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div> -->
            <!-- </div> -->
            <!-- <div class="form-group"> -->
                <!-- <button class="btn btn-primary" :disabled="status.registering">Register</button> -->
                <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="userRegist">가입</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">뒤로가기</router-link>
                <p></p>
            <!-- </div> -->
        <!-- </form> -->
        <!-- <button id="signin-button" @click="handleSignInClick()">구글로 회원가입</button> -->
        <a @click="handleSignInClick()">
            <img src="https://s3.ap-northeast-2.amazonaws.com/diary-image/btn_google_signin_light_normal_web.png">
        </a>
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