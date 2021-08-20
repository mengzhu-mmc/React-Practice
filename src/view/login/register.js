import React,{useState} from 'react'
import {connect} from 'react-redux'
import register from '../../store/action/register'
import {withRouter} from 'react-router-dom'
import hook from '../../common/hook/index'

function RegisterBox(props) {
    const {useBack} = hook
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [vcode, setVcode] = useState("")
    const [vcodeShow, setVcodeShow] = useState(false)
    const [vcodeSrc, setVcodeSrc] = useState("/miaov/user/verify?"+ Date.now())
    const goBack = useBack(props.history)
    const {setDeg} = props
    let point = {}
    function toLogin() {
        props.dispatch(register({
            verify: vcode,
            username: user,
            password,
            password: password2
        })).then(data => {
            console.log(data);
            alert(data.msg)

            setTimeout(() => {
                if (data.code != 0) {
                    setDeg(0)
                } 
                setVcodeSrc("/miaov/user/verify?"+ Date.now())
            }, 100)
        })
    }
    
    return (
        <div className="register_box">
            <h3>注册账号</h3>
            <div className="login_form">
                <p>
                    <input 
                        type="text" 
                        placeholder="用户名" 
                        value={user}
                        onChange={({target}) => {
                            setUser(target.value)
                        }}
                    />
                </p>
                <p>
                    <input 
                        type="password" 
                        placeholder="请输入密码" 
                        value={password}
                        onChange={({target}) => {
                            setPassword(target.value)
                        }}
                    />
                </p>
                <p>
                    <input 
                        type="password" 
                        placeholder="确认密码" 
                        value={password2}
                        onChange={({target}) => {
                            setPassword(target.value)
                        }}
                    />
                </p>
                <p className="clearfix">
                    <input 
                        type="text" 
                        placeholder="验证码" 
                        value={vcode}
                        onChange={({target}) => {
                            console.log(target.value);
                            setVcode(target.value)
                        }}
                        onFocus={()=> {
                            setVcodeShow(true)
                        }}
                        className="verifyCode"
                    />
                    {
                        vcodeShow ? 
                                <img 
                                    className="verify" 
                                    src={vcodeSrc}
                                    onTouchStart={(e) => {
                                        let touch = e.changedTouches[0]
                                        point.x = touch.pageX
                                        point.y = touch.pageY
                                    }}
                                    onTouchEnd={(e) => {
                                        let touch = e.changedTouches[0]
                                        let nowPoint = {
                                            x: touch.pageX,
                                            y: touch.pageY
                                        }
                                        if (Math.abs(nowPoint.x - point.x) < 5 && Math.abs(nowPoint.y - point.y) < 5) {
                                            setVcodeSrc("/miaov/user/verify?" + Date.now())
                                        }
                                    }}
                                 /> : ""
                    }
                </p>
                <button className="form_btn" onClick={ toLogin }>马上注册</button>
                <p className="form_tip">已有帐号？<a href="#" onClick={() => { setDeg(0) }}>立即登录</a></p>
            </div>
        </div>
    )
}

export default connect(res => res)(withRouter(RegisterBox))