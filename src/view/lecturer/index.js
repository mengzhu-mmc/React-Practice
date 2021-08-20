import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Footer from '../../common/component/footer';
import Frame from '../../common/component/frame';
import '../../common/css/teacher.css'
import getLecturers from '../../store/action/getLecturers'
import Join from './join';
import LecturerTab from './tab';
import LecturerAlert  from './lecturerAlert'

function Lecture(props) {
  let {data, dispatch} = props
  let [show, setShow] = useState(false)
  let [alertData, setAlertData] = useState("")
  let newData = []
  function showAlert(data) {
    setAlertData(data)
    setShow(true)
  }
  function hideAlert() {
    setShow(false)
  }
  for (let i = 0; i < data.length; i+=3) {
    let newArr = []
    data[i] && newArr.push(data[i])
    data[i+1] && newArr.push(data[i+1])
    data[i+2] && newArr.push(data[i+2])
    newData.push(newArr)
  }
  useEffect(() => {
    dispatch(getLecturers())
  }, [])
  return (
      <div>
        
        <Frame>
          <div>
            <div className="teacher_banner">
            <h2><span>妙味团队</span></h2>
            <LecturerTab
              newData={newData}
              showAlert={showAlert}
            />
            </div>
            <Join />
            <Footer />
          </div>
            </Frame>
            { show ? <LecturerAlert data={alertData} hideAlert={hideAlert}/> : "" }
      </div>
  );
}
export default connect(state=> {
  return {data: state.lecturers}
})(Lecture);
