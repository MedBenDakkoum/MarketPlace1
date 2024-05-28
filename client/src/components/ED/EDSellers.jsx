import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch"
import { getUnVerifiedSellers} from '../../services/employeeService';
import { ThreeDots } from 'react-loader-spinner'
import { MDBDataTable } from 'mdbreact';

function EDSellers() {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [sellers,setSellers] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'userId',
            width: 150
          },
          {
            label: 'Name',
            field: 'name',
            width: 150
          },
          {
            label: 'Email',
            field: 'email',
            width: 200
          },
          {
            label: 'Store Name',
            field: 'storeName',
            width: 100
          },
          {
            label: 'Phone Number',
            field: 'phoneNumber',
            width: 100
          },
          {
            label: 'Verified',
            field: 'verified',
            width: 100
          },
          {
            label: 'Created At',
            field: 'createdAt',
            width: 100
          },
          {
            label: '--',
            field: 'verifyProfile',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function sellersGet(){
            let sellersData = await getUnVerifiedSellers();
            setSellers(sellersData);
        }
        sellersGet()
    },[])
    useEffect(()=>{
        let rows1 = [...sellers];
        let i =0;
        rows1.map((element) => {
            element.verified  =(<Switch id={i} checked={element.isVerified} disabled/>);
            element.createdAt  = moment(element.createdAt).format('YYYY-MM-DD');
            element.verifyProfile = (<a onClick={(e)=>navigate('/employee/sellers/'+element._id)} style={{cursor:"pointer",color:"blue"}}>Verify Profile</a>)
            i++;
        });
        setRows(rows1);
    },[sellers,setSellers])
    return (
    <main className='main-container'>
        <ThreeDots
            visible={loading}
            height="100"
            width="100"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="overlay-spinner"
        />
        <div className='main-title'>
            <h3>Sellers</h3>
        </div>
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
            className='mdbdatatableclass'
        />
    </main>
  )
}

export default EDSellers;