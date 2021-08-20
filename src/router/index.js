import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Router from './router-list'

function IndexRoute() {
    let {routerList} = Router
    return (
        <Switch>
            {
                routerList.map((item,index) => {
                    return <Route 
                        path={item.path} 
                        exact={item.exact} 
                        render={item.render}
                        key={index} 
                    />
                })
            }
        </Switch>
    )
}

export default IndexRoute