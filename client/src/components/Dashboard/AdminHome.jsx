import React,{useState,useEffect} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import {getBasicInfo} from '../../services/adminService'
function AdminHome() {
  const [basicInfo,setBasicInfo]=useState();
  useEffect(function(){
    async function init(){
      let bI = await getBasicInfo();
      setBasicInfo(bI);
    }
    init();
  },[])
    // const data = [
    //     {
    //       name: 'Page A',
    //       sales: 4000,
    //       revenue: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'Page B',
    //       sales: 3000,
    //       revenue: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'Page C',
    //       sales: 2000,
    //       revenue: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'Page D',
    //       sales: 2780,
    //       revenue: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'Page E',
    //       sales: 1890,
    //       revenue: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'Page F',
    //       sales: 2390,
    //       revenue: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'Page G',
    //       sales: 3490,
    //       revenue: 4300,
    //       amt: 2100,
    //     },
    //   ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Dashboard</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{basicInfo?.numProds}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{basicInfo?.numCats}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{basicInfo?.numCustomers}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Orders</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{basicInfo?.numOrders}</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={basicInfo?.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={basicInfo?.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default AdminHome