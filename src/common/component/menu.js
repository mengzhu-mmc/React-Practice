import React from 'react'
import {NavLink} from 'react-router-dom'
import Router from '../../router/router-list'

export default function Menu(props) {
    let {nav} = Router
    let {menuHide} = props
    return (
        <nav id="menu">
            {nav.map((item, index) => {
                return  (<NavLink 
                    className={item.className} 
                    to={item.path}
                    key={index}
                    exact={item.exact}
                    activeClassName={"active"}
                    onTouchEnd={() => {
                        menuHide()
                    }}
                >{item.name}</NavLink>)
                })}
        </nav>
    )
}