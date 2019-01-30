
import axios from 'axios';
import config from 'config';

export const socialService = {
    getNaverToken,
    getNaverInfo,
    getNaverLogin,
}

function getNaverToken(param){
    return new Promise( (resolve, reject) => { 
        axios.post(`${config.apiUrl}/social/naverCallback`, param )
            .then((res) => {
                console.log(res.data);
                if( res.data ){
                    localStorage.setItem('naverToken', JSON.stringify(res.data));
                    resolve( res.data );
                }

                localStorage.removeItem('naverToken');
                reject( new Error("Failure getting naver token"));
                // var token = res.data.access_token;
                // var value = { token };
                // return res.data;
                // axios.post('http://localhost:4000/social/naverInfo', value ).then((rs) => {
                //     console.log(rs.data);
                // });
            });
        });
}

function getNaverInfo(param){
    return new Promise( (resolve, reject) => {
        axios.post(`${config.apiUrl}/social/naverInfo`, param )
            .then((res) => {
                console.log("getNaverInfo successfully done")
                console.log(res.data);
                if( res  ){
                    resolve(res);
                }
                reject(new Error("naver info failed"));
        });
    });
}

function getNaverLogin(){
    return axios.get(`${config.apiUrl}/social/naverlogin`).then((res) =>{
                    console.log(res);
                });
}