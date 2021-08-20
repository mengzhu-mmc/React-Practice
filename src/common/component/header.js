import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import hook from '../hook/index'
import isLogin from '../../store/action/isLogin'
import logout from '../../store/action/logout'

function Header(props) {
    const {useBack} = hook
    const goBack = useBack(props.history)
    const path = props.location.pathname
    const {user, changeShowMenu} = props
    const [isBtnShow, setBtnShow] = useState(false)
    useEffect(() => {
        props.dispatch(isLogin())
    }, [])  /* 监控一个空数组，，这样只会执行一次 */

    function getUser() {
        if (path === "/login") {
            return ""
        } 
        if (user) {
            return (<span className="header-btn-right">
                <span 
                    className="header-user" 
                    onTouchEnd={() => { setBtnShow(!isBtnShow) }}
                >{user}</span>
                <span 
                    className="header-logout-btn" 
                    style={{display: isBtnShow ? "block" : "none"}} 
                    onTouchEnd={() => {
                        props.dispatch(logout())
                    }}>退出 </span>
            </span>)
        }
        return <Link className="user" to="/login" />
    }
    
    return (
        <header id="header">
            <nav className="menu">
                {
                    path === "/login" ? <a 
                        className="header-btn-left iconfont icon-back" 
                        onClick={goBack}
                    ></a> : <a 
                        className="header-btn-left iconfont icon-hycaidan"
                        onClick={changeShowMenu}
                    ></a>
                }
            </nav>
            <h1 className="logo">miaov.com</h1>
            {getUser()}
        </header>
    )
}

export default connect(state => {
    return {user: state.getUser}
})(withRouter(Header))
