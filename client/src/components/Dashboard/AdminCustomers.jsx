import React, {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getCustomers,changeUserActive} from '../../services/adminService';
import moment from 'moment';
import Switch from 'react-switch';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'

function AdminCustomers() {
    const navigate = useNavigate();
    const [customers,setCustomers] = useState([]);
    const [loading,setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'userId',
            width: 150
          },
          {
            label: 'Type',
            field: 'userType',
            width: 150
          },
          {
            label: 'Name',
            field: 'name',
            width: 200
          },
          {
            label: 'Orders',
            field: 'orders',
            width: 100
          },
          {
            label: 'Last Order At',
            field: 'lastOrderAt',
            width: 100
          },
          {
            label: 'Active',
            field: 'activeSwitch',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let customers = await getCustomers();
            setCustomers(customers);
        }
        init();
    },[])

    useEffect(()=> {
        let rows1 = [...customers];
        let i=0;
        rows1.map((item)=>{
            let t = 0;
            if(item.isSeller){
                if(item.sellerType=="business"){
                    item.userType = "Business";
                }else{
                    item.userType = "Personal Seller";
                }
            }else{
                item.userType = "Client";
            }
            item.activeSwitch = (<Switch id={i.toString()} checked={item.active} onChange={handleChangeCustomerActive}/>);
            if(item.lastOrderAt && item.lastOrderAt!=="#"){
                item.lastOrderAt=moment(item.lastOrderAt).format("YYYY-MM-DD")
            }else{
                item.lastOrderAt="#"
            }
            i++;
            // item.total=t+ " TND";
            // item.nbrProducts= item.items.length;
            // item.lastUpdated = moment(item.cart.updatedAt).format("YYYY-MM-DD") || "";
        })
        setRows(rows1);
    },[customers,setCustomers])
    const handleChangeCustomerActive = async (c,e,id)=>{        
        setLoading(true);  
        await changeUserActive(customers[id]._id).then((rslt)=>{
            let newCustomers = [...customers]
            customers[parseInt(id)].active=c;
            setCustomers(newCustomers);
            setLoading(false); 
            Swal.fire({
                icon: "success",
                title: "Customer activity is changed",
                showConfirmButton: false,
                timer: 1000
            });
        }).catch((e)=>{
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: e.message,
            });
        })
        
    }
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Customers</h3>
        </div>
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
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
        />
    </main>
  )
}

export default AdminCustomers;