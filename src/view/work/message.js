import React, {useState} from 'react'
import {connect} from 'react-redux'
import putMessage from '../../store/action/putMessage'

function Message(props) {
    let {show, setShow, dispatch,id, getUser} = props
    let [info, setInfo] = useState("")
    let [put, setPut] = useState(false)
    return (<div 
        className="message_wrap"
        style={{
            transform: (show ? " translateY(0)" : " translateY(100%)")
        }}
    >
        <textarea
            value={info}
            onChange={({target}) => {
                setInfo(target.value)
            }}
        ></textarea>
        {put? <footer className="miiapv_footer put">评论提交中......</footer> : <footer className="miiapv_footer"
        onClick={() => {
            if (!info.trim()) {
                alert('请输入内容')
                return false
            }
            dispatch(putMessage(id, info)).then(res => {
                console.log("请求完成");
                setPut(false)
                setInfo("")
                setShow(false)
                dispatch({
                    type: "MESSAGE_ADD",
                    messageList: {
                        content: info,
                        create_time: Date.now(),
                        username: getUser   
                    }
                })
            })
            setPut(true)
        }}
        >提交评论</footer>}
        
    </div>)
}

export default connect(state => state)(Message)