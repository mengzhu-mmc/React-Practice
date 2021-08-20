import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import Tab from '../../common/component/tab'
import '../../common/css/index.css'
import Course from './course'
import Vip from './vip'
import Miaov from './miaov'
import Works from './works'
import Frame from '../../common/component/frame'
import getWorks from '../../store/action/getWorks'

let imgData = [
  require("../../common/images/tab/img1.png"),
  require("../../common/images/tab/img2.png"),
  require("../../common/images/tab/img3.png"),
  require("../../common/images/tab/img4.png"),
]

function Index(props) {
  let {dispatch} = props
  function getWorksData() {
    return dispatch(getWorks())
  }
  useEffect(() => {
    getWorksData()
  }, [])
  return (
    <Frame 
      pullUp={true}
      getData={getWorksData}
    >
      <div>        
          <Tab 
            data={imgData}
            render={(data) => {
              return <img src={data} />
            }}
          />
          <section className="index_content">
            <Course />
            <Vip />
            <Miaov />
            <Works {...props}/>
          </section>
      </div>
    </Frame>
  );
}

export default connect(props =>  ({...props.works}))(Index);
