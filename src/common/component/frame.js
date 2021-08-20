import React, {useState, useEffect, useRef} from 'react'
import BScroll from 'better-scroll'
import hook from '../hook/index'
import Header from './header'
import Menu from './menu'
import "../css/reset.css"
import "../css/common.css"

export default function Frame(props) {
    const [showMenu, setShowMenu] = useState(false)
    let {useInnerHeight} = hook
    let innerHeight = useInnerHeight()
    const wrap = useRef()
    let {pullUp, getData} = props
    function changeShowMenu() { 
        setShowMenu(!showMenu)
    }
    function menuHide() {
        setShowMenu(false)
    }
    useEffect(() => {
        window.pageScroll= new BScroll(wrap.current, {
            preventDefaultException:{
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/,
                className: /(^|\s)work_a(\s|$)/ 
            },
            pullUpLoad: pullUp ? {threshold: 200} : false,
            bounce: true
        })
        window.pageScroll.on("pullingUp", () => {
            getData().then(res => {
                if (res) {
                    window.pageScroll.finishPullUp()
                    window.pageScroll.refresh() 
                } else {
                    window.pageScroll.closePullUp()
                }
                
            })
        })
        return () => {
            window.pageScroll = null
        } 
    }, [])
    return (
        <div>
            <Header changeShowMenu={changeShowMenu} />
            <Menu menuHide={menuHide} />
            <div id="main" style={{
                transform: `translateX(${showMenu ? 4.5 : 0}rem)`,
                height: innerHeight
            }}
                onTouchStart={menuHide}
            >
                <div className="pageWrap" ref={wrap}>
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}