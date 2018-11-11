export function authHeader() {
    // return authorization header with jwt token
    // user 정보를 localStorage 에서 가져왔으나
    // back-end 를 수정할 경우, 이 부분은 수정이 필요함.
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}