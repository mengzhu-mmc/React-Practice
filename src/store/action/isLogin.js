import http from './http'

export default function isLogin() {
    return function (dispatch) {
        return http.post('/user/isLogin').then((res) => {
            if (res.data.code == 0) {
                dispatch({
                    type: "LOGIN",
                    user: res.data.username
                })
            }
        })
    }
}