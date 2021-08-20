import http from './http'

export default function getWork(id) {
    return function (dispatch) {
        dispatch({
            type: "WORK_LOAD"
        })
        return http.post(`/lecturer/info`, {
            article_id: id
        }).then((res) => {

            dispatch({
                type: "WORK_LOADOVER",
                data: res.data
            })
        })
    }
}