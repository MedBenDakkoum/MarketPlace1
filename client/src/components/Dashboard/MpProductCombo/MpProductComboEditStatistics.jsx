import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea, CRow} from '@coreui/react';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller,getSellerById} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';
import {LineChart,PieChart} from '@mui/x-charts';


function MpProductComboEditStatistics() {
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
        console.log(e.target.value)
        setChartTime(e.target.value);
    }
    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CCol md={12}>
                        Show statistics for last:
                        <CFormSelect onChange={handleChangeTime} name="time" value={chartTime}>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                        </CFormSelect>
                    </CCol>
                    <CRow>
                        <CCol md={6}>
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
                            width={500}
                            height={300}
                            />                   
                        </CCol>
                        <CCol md={6}>
                            <label htmlFor="weekly-chart">
                                Best buying states  
                            </label>
                            <PieChart
                                series={[
                                    {
                                    data: chartData.locations,
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </CCol>
                    </CRow>
                </CCol>
            </CForm>
  )
}

export {MpProductComboEditStatistics};