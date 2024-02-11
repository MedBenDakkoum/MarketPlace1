import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCardList, BsCart, BsCartCheckFill, BsCartFill, BsCloudMoon, BsColumns, BsImageFill, BsImages, BsInfoSquareFill, BsList, BsListColumns, BsOption, BsStar, BsStarFill } from "react-icons/bs";
import SDProductAttributes from "./SDProduct/SDProductAttributes";
import SDProductImages from "./SDProduct/SDProductImages";
import SDProductInfo from "./SDProduct/SDProductInfo";
import SDProductOptions from "./SDProduct/SDProductOptions";
import SDProductSEO from "./SDProduct/SDProductSEO";
import SDProductPrice from "./SDProduct/SDProductPrice";

function SDSingleProduct() {
    const navigate= useNavigate();
    const [inter, setInter] = useState("info");
    const [classes,setClasses] = useState({
        info:"single-sd-section active",
        price:"single-sd-section",
        images:"single-sd-section",
        attributes:"single-sd-section",
        SEO:"single-sd-section",
        options:"single-sd-section"
    });
    useEffect(function(e){
        
    },[classes,setClasses])
    
    const handleChangeInter = (e)=>{
        setInter(e.target.getAttribute("name"));
        setClasses({
            info:"single-sd-section",
            price:"single-sd-section",
            images:"single-sd-section",
            attributes:"single-sd-section",
            SEO:"single-sd-section",
            options:"single-sd-section",
            [e.target.getAttribute("name")]:"single-sd-section active"
        });
    }

    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Edit Product</h1>
          </div>
          <div className="sd-section-main">
            <div className="sd-sections-nav">
                <div name="info" onClick={handleChangeInter} className={classes.info}>
                    Information
                </div>
                <div name="price" onClick={handleChangeInter} className={classes.price}>
                    Price
                </div>
                <div name="images" onClick={handleChangeInter} className={classes.images}>
                    Images
                </div>
                <div name="attributes" onClick={handleChangeInter} className={classes.attributes}>
                    Attributes
                </div>
                <div name="SEO" onClick={handleChangeInter} className={classes.SEO}>
                    SEO
                </div>
                <div name="options" onClick={handleChangeInter} className={classes.options}>
                    Options
                </div>
            </div>
            {
                inter=="info"?
                    <SDProductInfo/>
                : inter=="price"?
                    <SDProductPrice/>
                :inter=="images"?
                    <SDProductImages/>
                : inter=="attributes"?
                    <SDProductAttributes/>
                : inter=="SEO"?
                    <SDProductSEO/>
                : inter=="options"?
                    <SDProductOptions/>
                : <h1>Error 404</h1>
            }
          </div>
      </main>
    );
}

export default SDSingleProduct;