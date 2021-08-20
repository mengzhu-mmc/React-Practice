import http from './http'

export default function putMessage(id, content) {
    return function (dispatch) {
        return http.post('/lecturer/addcomment', {
            article_id: id,
            content:content
        }).then((res) => {
            if (res.data.code !== 0) {
                alert(res.data.message)
            }
            return true
        })
    }
}