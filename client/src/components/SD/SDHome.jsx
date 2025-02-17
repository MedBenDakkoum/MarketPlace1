import React,{useState,useEffect,useContext,useRef} from "react";
import { Context } from '../../ContextStore';
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import { getDashboardInfo,getNotifications,setNotificationsToRead } from "../../services/dashboardService";
import { Spinner } from 'react-bootstrap';
import 
 {BsFillBellFill, BsBoxArrowRight, BsJustify}
 from 'react-icons/bs';

function SDHome() {

    const navigate= useNavigate();
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(Context);
    const notDropMenu = useRef(null)
    const [notifications,setNotifications] = useState([]);
    const [notiDropHeight,setNotiDropHeight] = useState({height:"0",marginTop:"35px"});
    const [heartBeat,setHeartBeat]=useState({color:"white",fill:"white",marginTop:"10px"})
    const [dashInfo, setDashInfo] = useState({
        orders: {
            Pending: 0,
            Completed: 0,
            Processing: 0,
            Cancelled: 0,
            Refunded: 0,
            Total: 0
        },
        products: {
            Live: 0,
            Offline: 0,
            Pending: 0,
            Total: 0
        },
        info: {
            earnings: 0,
            sales: 0
        }
    })
    const [chartTime, setChartTime] = useState("week")
    const [chartData, setChartData] = useState({
        sales:{
            xData:["D 1", "D 2", "D 3", "D 4", "D 5", "D 6", "D 7"],
            yData:[0, 3, 2, 7, 2, 5, 4]
        },
        locations:[
            { id: 0, value: 10, label: 'Monastir' },
            { id: 1, value: 15, label: 'Sfax' },
            { id: 2, value: 20, label: 'Tunis' },
        ]
    });
    useEffect(function(){
        async function initData(){
            setLoading(true)
            let newDashInfo = await getDashboardInfo();
            setDashInfo({
                orders: newDashInfo.orders,
                products: newDashInfo.products,
                info: newDashInfo.info
            });
            await getNotifications()
            .then((nots)=>{
                setNotifications(nots);
                let unReadNots = nots.filter(not=>!not.read);
                if(unReadNots.length>0){
                setHeartBeat({animation: "heartbeat 1s infinite",
                fill: "red",
                color: "red",
                opacity: 1,
                transition: "opacity 500ms",
                marginTop:"10px"
                })
                }
            })
            setLoading(false)
        }
        initData();
    },[Context]);
    const closeOpenMenus = (e)=>{
        if(notiDropHeight.height!=="0" && !notDropMenu.current?.contains(e.target)){
          setNotiDropHeight({height:"0",marginTop:"35px"});
        }
      }
      document.addEventListener('mousedown',closeOpenMenus)
    useEffect(function(){
      switch(chartTime){
          case "week":
              setChartData({
                  sales:{
                      xData:["D 1", "D 2", "D 3", "D 4", "D 5", "D 6", "D 7"],
                      yData:[0, 3, 2, 7, 2, 5, 4]
                  },
                  locations:[
                      { id: 0, value: 10, label: 'Monastir' },
                      { id: 1, value: 15, label: 'Sfax' },
                      { id: 2, value: 20, label: 'Tunis' },
                  ]
              });
              break;
          case "month":
              setChartData({
                  sales:{
                      xData:["W 1", "W 2", "W 3", "W 4"],
                      yData:[20, 17, 26, 19]
                  },
                  locations:[
                      { id: 0, value: 6, label: 'Beja' },
                      { id: 1, value: 32, label: 'Monastir' },
                      { id: 2, value: 57, label: 'Sfax' },
                      { id: 3, value: 78, label: 'Tunis' },
                  ]
              });
              break;
          case "year":
              setChartData({
                  sales:{
                      xData:["M 1", "M 2", "M 3", "M 4", "M 5", "M 6", "M 7", "M 8", "M 9", "M 10", "M 11", "M 12"],
                      yData:[82, 101, 95, 76, 71, 86, 90, 95, 104, 110, 127, 135]
                  },
                  locations:[
                      { id: 0, value: 72, label: 'Beja' },
                      { id: 1, value: 340, label: 'Monastir' },
                      { id: 2, value: 570, label: 'Sfax' },
                      { id: 3, value: 846, label: 'Tunis' },
                  ]
              });
              break;
          default:
              setChartTime("week");   
      }
  },[chartTime,setChartTime]);
    const handleChangeTime = (e)=>{
        setChartTime(e.target.value);
    }
    const openNotificationDropDown = async (e)=>{
        if(notiDropHeight.height=="0"){
          setNotiDropHeight({height:"auto",marginTop:"35px"});
          setHeartBeat({color:"white",fill:"white",marginTop:"10px"});
          await setNotificationsToRead()
        }
      }
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Dashboard</h1>
            <BsFillBellFill onClick={openNotificationDropDown} className='icon sd' style={{...heartBeat,cursor:"pointer"}} />
            <div className="notifications-dropdown sd" ref={notDropMenu} style={notiDropHeight}>
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
          </div>
          <div className="sd-section-main">
          {!loading? <>
            <h5>Hello, {userData?.name}!</h5>
            <div className="analytics">
                <div className="analytics-info sales">
                    <span>Sales</span>
                    <p>{dashInfo.info.sales.toFixed(2)} TND</p> 
                </div>
                <div className="analytics-info earnings">
                    <span>Earnings</span>
                    <p>{dashInfo.info.earnings.toFixed(2)} TND</p> 
                </div>
                <div className="analytics-info earnings">
                    <span>Orders</span>
                    <p>{dashInfo.orders.Total}</p> 
                </div>
            </div>
            <div className="orders-prods">
                <div className="orders-analytics pr-analytics">
                    <h3><BsCartFill/><span>Orders</span></h3>
                    <ul>
                        <li>
                            <span>Total</span><span>{dashInfo.orders.Total}</span>
                        </li>
                        <li>
                            <span>Completed</span><span>{dashInfo.orders.Completed}</span>
                        </li>
                        <li>
                            <span>Pending</span><span>{dashInfo.orders.Pending}</span>
                        </li>
                        <li>
                            <span>Processing</span><span>{dashInfo.orders.Processing}</span>
                        </li>
                        <li>
                            <span>Cancelled</span><span>{dashInfo.orders.Cancelled}</span>
                        </li>
                        <li>
                            <span>Refunded</span><span>{dashInfo.orders.Refunded}</span>
                        </li>
                    </ul>
                </div>
                <div className="prods-analytics pr-analytics">
                    <h3><BsCartFill/><span>Products</span></h3>
                    <ul>
                        <li>
                            <span>Total</span><span>{dashInfo.products.Total}</span>
                        </li>
                        <li>
                            <span>Live</span><span>{dashInfo.products.Live}</span>
                        </li>
                        <li>
                            <span>Offline</span><span>{dashInfo.products.Offline}</span>
                        </li>
                    </ul>
                </div>
            </div>
                <div className="sales-orders">
                    <div >
                        Show statistics for last:
                        <CFormSelect onChange={handleChangeTime} name="time" value={chartTime}>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                        </CFormSelect>
                    </div>
                    <div className="charts-container">
                        <div>
                            <label htmlFor="weekly-chart">
                                Sales per time  
                            </label>
                            <LineChart
                                name="weekly-chart"
                                xAxis={[{ scaleType: 'point',
                                    data: chartData.sales.xData
                                }]}
                                series={[
                                    {
                                    data: chartData.sales.yData,
                                    },
                                ]}
                                className="weekly-linechart"
                            />                   
                        </div>
                        <div>
                        <label htmlFor="weekly-chart">
                                Orders per time  
                            </label>
                            <LineChart
                                name="weekly-chart"
                                xAxis={[{ scaleType: 'point',
                                    data: chartData.sales.xData
                                }]}
                                series={[
                                    {
                                    data: chartData.sales.yData,
                                    },
                                ]}
                                className="weekly-linechart"
                            /> 
                        </div>
                    </div>
                </div>
                </>
                :
                <div className="spinner">
                    <Spinner animation="border" />
                </div> 
                }
          </div>
      </main>
    );
}

export default SDHome;