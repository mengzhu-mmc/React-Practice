import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'
import Frame from '../../common/component/frame'
import Skeleton from '../../common/component/skeleton'
import '../../common/css/miiaov.css'
import getMessageList from '../../store/action/getmessagelist'
import getWork from '../../store/action/getWork'
import Main from './main'
import Message from './message'

function Work(props) {
  let {data,loading,dispatch, match, user, history} = props
  let {id} = match.params
  let [showMessage, setShow] = useState(false)
  function getMessageData() {
    return dispatch(getMessageList(id))
  }
  /* useMemo 发生在组件挂在之前  */
  // useMemo(()=> {

  // }, [])

  /* useEffect 发生在组件挂载之后 */
  useEffect(() => {
    dispatch(getWork(id))
    dispatch(getMessageList(id))
    return () => {
      dispatch({
        type: "WORK_RESET"
      })
      dispatch({
        type: "MESSAGE_RESET"
      })
    }
  }, [])
  return (<div>
      <Frame
        pullUp={true}
        getData = {getMessageData}
      >
        <div>
          { 
          loading ? <Skeleton /> : <Main data={data}/>
        }
        </div>
        
      </Frame>
      <footer 
        className="miiapv_footer"
        onClick={() => {
          if (user) {
            setShow(true)
          } else {
            history.push('/login')
          }
          
      }}
      >回复本贴</footer>
      <Message 
        show={showMessage}
        setShow={setShow}
        id={id}
      />
    </div>);
}

export default connect(state => ({
  ...(state.work),
  user: state.getUser
}))(Work)
