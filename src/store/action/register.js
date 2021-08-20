import http from './http'

export default function register(data) {
    return function (dispatch) {
        return http.post('/user/register', data).then((res) => {
            return res
            // if (res.data.code == 0) {
            //     dispatch({
            //         type: "LOGIN",
            //         user: data.username
            //     })
            // }
            // return res.data
        })
    }
}