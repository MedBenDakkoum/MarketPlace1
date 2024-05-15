import React,{useState,useEffect,useRef} from 'react'
import 
 {BsFillBellFill, BsBoxArrowRight, BsJustify}
 from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { getNotifications,setNotificationsToRead } from '../../services/adminService';

function AdminHeader({OpenSidebar}) {
  const navigate = useNavigate();
  const notDropMenu = useRef(null)
  const [notifications,setNotifications] = useState([]);
  const [notiDropHeight,setNotiDropHeight] = useState({height:"0"});
  const [heartBeat,setHeartBeat]=useState({})
  useEffect(function(){
    async function init(){
      await getNotifications()
      .then((nots)=>{
        setNotifications(nots);
        let unReadNots = nots.filter(not=>!not.read);
        if(unReadNots.length>0){
          setHeartBeat({animation: "heartbeat 1s infinite",
          fill: "red",
          color: "red",
          opacity: 1,
          transition: "opacity 500ms"
        })
        }
      })
    }
    init()
  },[])
  const closeOpenMenus = (e)=>{
    if(notiDropHeight.height!=="0" && !notDropMenu.current?.contains(e.target)){
      setNotiDropHeight({height:"0"});
    }
  } 

  const openNotificationDropDown = async (e)=>{
    if(notiDropHeight.height=="0"){
      setNotiDropHeight({height:"auto"});
      setHeartBeat({});
      await setNotificationsToRead()
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-right'>
        <BsFillBellFill onClick={openNotificationDropDown} className='icon' style={{...heartBeat,cursor:"pointer"}} />
            <div className="notifications-dropdown" ref={notDropMenu} style={notiDropHeight}>
              {notifications.length<=0? 
                <div className="single-notification-drop">
                    <p style={{textAlign:"center",color:"blue",cursor:"pointer"}}>No notifications yet</p>
                </div>
              : ""}
              {notifications.map((notification,index)=>(
                <div key={index} style={{backgroundColor:notification.read? "white" : "#DEE2E7"}} className="single-notification-drop">
                  <p>{notification.message}</p>
                </div>  
              ))}
              {notifications.length>5?
                <div className="single-notification-drop">
                  <p style={{textAlign:"center",color:"blue",cursor:"pointer"}}>See more</p>
                </div>  
              :""}
            </div>
            <BsBoxArrowRight onClick={(e)=>{navigate("/admin/logout")}} style={{cursor:"pointer"}} className='icon'/>
        </div>
    </header>
  )
}

export default AdminHeader