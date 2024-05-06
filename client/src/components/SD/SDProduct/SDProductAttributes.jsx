import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate,useParams } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getProductAttributes} from "../../../services/dashboardService"

function SDProductAttributes() {
    const lang = localStorage.getItem("lang");
    const navigate= useNavigate();
    const params = useParams();
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    let attrs = {
        columns: [
          {
            label: 'Attribute Name',
            field: 'attrName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Attribute Value',
            field: 'attrValue',
            sort: 'asc',
            width: 270
          }
        ],
        rows:rows
    };
    useEffect(function(){
        async function init(){
            let att = await getProductAttributes(params.id);
            setData(att.attributes);
        }
        init();
    },[]);
    useEffect(function(){
        let newRows =[...data]
        let rowsToShow = [];
        newRows.map((item)=>{
            item.values.map((item1)=>{
                rowsToShow.push({attrName:item.name[lang],attrValue:item1[lang]})
            });
        })
        setRows([...rowsToShow])
    },[data,setData]);
    return (
        <div className="sd-singleproduct-section">
            
            <MDBDataTable
                striped
                small
                noBottomColumns={true}
                style={{color:"white"}}
                data={attrs}
                />
        </div>
    );
}

export default SDProductAttributes;
