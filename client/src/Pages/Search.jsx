import { useState, useContext,useEffect } from 'react';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import {searchKeyword,getCategoriesFromRefs} from '../services/publicData';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from "./Search.module.css"
import { CForm,CFormCheck,CFormInput,CButton,CRow,CFormSelect} from '@coreui/react';
import ReactStars from "react-rating-stars-component";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from 'react-icons/bs';  
  
function Search() {
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();
    const [priceRange, setPriceRange] = useState([1,999]); 
    const [loading,setLoading] = useState(false);
    const [queryParameters,setQueryParameters] = useSearchParams()
    const [searchProds,setSearchProds] = useState([]);
    const [allProds,setAllProds] = useState([]);
    const [sortByDorpDown,setSortByDorpDown] = useState("none");
    const [allCats,setAllCats] = useState({});
    const [allFeatures,setAllFeatures] = useState([]);
    const [paginationLevel,setPaginationLevel] = useState([]);
    const priceRangeSelector = (e, newPriceRange) => { 
        setPriceRange(newPriceRange); 
    }; 
    function valueRange(value) {
        return `${value}°C`;
    }
    const haveFeatureValue = (av,a)=>{
        for (let i = 0; i < a.initData.features.length; i++) {
            let c = a.initData.features[i];
            if(av.includes(c.value[lang])){
                return true;
            }
        }
        return false;
    }
    useEffect(function(){
        let keyword = queryParameters.get("q");
        let sortBy = queryParameters.get("sort") || ""
        async function init(){
            setLoading(true);
            await searchKeyword(keyword)
            .then(async (rslt)=>{
                let aa = [...rslt];
                let refs = [];
                let features = [];
                aa.forEach((prod)=>{
                    refs.push(prod.initData.category);
                    prod.initData.features.forEach((feature)=>{
                        if(!features.includes(feature.value[lang])){
                            features.push(feature.value[lang]);
                        }
                    });
                })
                setAllFeatures(features);
                await getCategoriesFromRefs(refs)
                .then((rsltCats)=>{
                    setAllCats(rsltCats);
                })
                if(sortBy=="name"){
                    aa.sort((a, b) => {
                        const nameA = a.initData.name[lang].toUpperCase(); // ignore upper and lowercase
                        const nameB = b.initData.name[lang].toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                        return -1;
                        }
                        if (nameA > nameB) {
                        return 1;
                        }
                        return 0;
                    })
                }else if(sortBy=="pricehl"){
                    aa.sort((a, b) => {
                        const prixA = a.newPrice; // ignore upper and lowercase
                        const prixB = b.newPrice; // ignore upper and lowercase
                        if (prixA > prixB) {
                        return -1;
                        }
                        if (prixA < prixB) {
                        return 1;
                        }
                        return 0;
                    })
                }else if(sortBy=="pricelh"){
                    aa.sort((a, b) => {
                        const prixA = a.newPrice; // ignore upper and lowercase
                        const prixB = b.newPrice; // ignore upper and lowercase
                        if (prixA < prixB) {
                        return -1;
                        }
                        if (prixA > prixB) {
                        return 1;
                        }
                        return 0;
                    })
                }
                if(queryParameters.get("cats")){
                    aa = aa.filter(a => queryParameters.get("cats").split(',').includes(a.initData.category));
                }
                if(queryParameters.get("features")){
                    aa = aa.filter(a => haveFeatureValue(queryParameters.get("features").split(','),a));
                }
                if(queryParameters.get("pricemin") && queryParameters.get("pricemax")){
                    aa = aa.filter(a => a.newPrice>=parseFloat(queryParameters.get("pricemin")) && a.newPrice<=parseFloat(queryParameters.get("pricemax")));
                }
                if(queryParameters.get("ratings")){
                    aa = aa.filter(a => queryParameters.get("ratings").split(',').includes(Math.round(a.review).toString()));
                }
                setAllProds(aa);
                let bb = [...aa];
                bb.splice(0, 5);
                setSearchProds(bb);
                setPaginationLevel(1);
                setLoading(false);
            })

        }
        init()
    },[queryParameters])
    useEffect(function(){
        console.log(paginationLevel);
        setLoading(true)
        let aa = allProds.slice((paginationLevel-1)*5, (paginationLevel)*5)
        setSearchProds(aa);
        setLoading(false)
    },[paginationLevel,setPaginationLevel])
    const handleChangePaginationLevel = (e)=>{
        if(paginationLevel!==parseInt(e.target.outerText)){
            setPaginationLevel(parseInt(e.target.outerText))
        }
    }
    const handleSortByDropDown = (e)=>{
        if(sortByDorpDown=="none"){
            setSortByDorpDown("block");
        }else{
            setSortByDorpDown("none");
        }
    }
    const handleChangeSortByOption = (e)=>{
        navigate("/search?q="+queryParameters.get("q")+"&sort="+e.target.getAttribute("name"))
    }
    const handleChangeFeatures = (e)=>{
        let featuresParam = queryParameters.get("features");
        if(!featuresParam){
            setQueryParameters(params => {
                params.set("features", e.target.value);
                return params;
            });
        }else{
            let features = featuresParam.split(",");
            if(e.target.checked){
                features.push(e.target.value)
                setQueryParameters(params => {
                    params.set("features", features.join(","));
                    return params;
                });
            }else{
                let newFeatures= features.filter(a => a !== e.target.value);
                setQueryParameters(params => {
                    params.set("features", newFeatures.join(","));
                    return params;
                });
            }
            
        }
    }
    const handleChangeCategories = (e)=>{
        let catParam = queryParameters.get("cats");
        if(!catParam){
            setQueryParameters(params => {
                params.set("cats", e.target.value);
                return params;
            });
        }else{
            let cats = catParam.split(",");
            if(e.target.checked){
                cats.push(e.target.value)
                setQueryParameters(params => {
                    params.set("cats", cats.join(","));
                    return params;
                });
            }else{
                let newCats = cats.filter(a => a !== e.target.value);
                setQueryParameters(params => {
                    params.set("cats", newCats.join(","));
                    return params;
                });
            }
            
        }
    }
    const handleApplyPriceRange = (e)=>{
        setQueryParameters(params => {
            params.set("pricemin", priceRange[0]);
            params.set("pricemax", priceRange[1]);
            return params;
        });
    }
    const handleChangeRatings = (e)=>{
        let ratingParam = queryParameters.get("ratings");
        if(!ratingParam){
            setQueryParameters(params => {
                params.set("ratings", e.target.value);
                return params;
            });
        }else{
            let ratings = ratingParam.split(",");
            if(e.target.checked){
                ratings.push(e.target.value)
                setQueryParameters(params => {
                    params.set("ratings", ratings.join(","));
                    return params;
                });
            }else{
                let newRating = ratings.filter(a => a !== e.target.value);
                setQueryParameters(params => {
                    params.set("ratings", newRating.join(","));
                    return params;
                });
            }
            
        }
    }
    const handleChangePriceRange = (e)=>{
        if(e.target.name=="minPrice"){
            setPriceRange([parseInt(e.target.value),priceRange[1]])
        }else{
            setPriceRange([priceRange[0],parseInt(e.target.value)])
        }
    }
    return (
        <section style={{padding:"0 8%",position:"relative",width:"100%",margin:"20px 0"}}>
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
            <div className={styles["search-results-container"]}>
                <div className={styles["search-results-sider"]}>
                    <div className={styles["sider-section"]}>
                        <h1 className={styles["sider-title"]}>
                            Categories
                        </h1>
                        <ul className={styles["sider-rslt"]}>
                            {Object.keys(allCats).map((cat)=>
                                (
                                    <li key={cat}><CFormCheck onChange={handleChangeCategories} className={styles['form-check-rslt']} id="categorieCheck" label={allCats[cat][lang]} value={cat} checked={queryParameters?.get("cats")?.includes(cat)}/></li>
                                )
                            )
                            }
                        </ul>
                    </div>
                    <div className={styles["sider-section"]}>
                        <h1 className={styles["sider-title"]}>
                            Features
                        </h1>
                        <ul className={styles["sider-rslt"]}>
                            {allFeatures.map((f,i)=>(
                                <li key={i}><CFormCheck className={styles['form-check-rslt']} onChange={handleChangeFeatures} id="featurecheck" value={f} label={f} checked={queryParameters?.get("features")?.includes(f)}/></li>
                            ))}
                        </ul>
                        <p>See all</p>
                    </div>
                    <div className={styles["sider-section"]}>
                        <h1 className={styles["sider-title"]}>
                            Price range
                        </h1>
                        <div>
                        <Box>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={priceRange}
                                onChange={priceRangeSelector}
                                valueLabelDisplay="auto"
                                getAriaValueText={valueRange}
                                min={1}
                                max={999} 
                            />
                        </Box>
                        <div className={styles["prices-min-max"]}>
                            <div className={styles["prices-min-max-input"]}>
                                <CFormInput value={priceRange[0]} onChange={handleChangePriceRange} name="minPrice" type="text" id="priceRange" label="Min" />
                            </div>
                            <div className={styles["prices-min-max-input"]}>
                                <CFormInput value={priceRange[1]} onChange={handleChangePriceRange} name="maxPrice" type="text" id="priceRange" label="Max" />
                            </div>
                        </div>
                        <CButton onClick={handleApplyPriceRange}>Apply</CButton>
                        </div>
                    </div>
                    <div className={styles["sider-section"]}>
                        <h1 className={styles["sider-title"]}>
                            Ratings
                        </h1>
                        <ul className={styles["sider-rslt"]}>
                            <div className={styles["ratings-input"]}>
                                <input id="ratingCheck" onChange={handleChangeRatings} checked={queryParameters?.get("ratings")?.includes("5")} value="5" type="checkbox" />
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={5}
                                    edit={false}
                                    activeColor="#FF9017"
                                />
                            </div>
                            <div className={styles["ratings-input"]}>
                                <input id="ratingCheck" onChange={handleChangeRatings} checked={queryParameters?.get("ratings")?.includes("4")} value="4" type="checkbox" />
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={4}
                                    edit={false}
                                    activeColor="#FF9017"
                                />
                            </div>
                            <div className={styles["ratings-input"]}>
                                <input id="ratingCheck" onChange={handleChangeRatings} checked={queryParameters?.get("ratings")?.includes("3")} value="3" type="checkbox" />
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={3}
                                    edit={false}
                                    activeColor="#FF9017"
                                />
                            </div>
                            <div className={styles["ratings-input"]}>
                                <input id="ratingCheck" onChange={handleChangeRatings} checked={queryParameters?.get("ratings")?.includes("2")} value="2" type="checkbox" />
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={2}
                                    edit={false}
                                    activeColor="#FF9017"
                                />
                            </div>
                        
                        </ul>
                    </div>
                </div>
                <div className={styles["search-results-prods-container"]}>
                    <div className={styles["search-result-info"]}>
                        <p>{allProds?.length} results for <span>"{queryParameters.get("q")}"</span></p>
                        <div className={styles["info-sort-by"]}>
                            <p style={{cursor:"pointer",position:"relative"}}onClick={handleSortByDropDown}><span>Sort by</span> <BsChevronDown /></p>
                            <div style={{display:sortByDorpDown}} className={styles["sort-by-dropdown"]}>
                                <p name="pricelh" onClick={handleChangeSortByOption}>Price low to high</p>
                                <p name="pricehl" onClick={handleChangeSortByOption}>Price high to low</p>
                                <p name="name" onClick={handleChangeSortByOption}>Name</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["prods-section"]}>
                    {searchProds?.length>0?
                        searchProds.map((prod)=>(
                        <div key={prod?._id} className={styles["single-prod"]}>
                            <img src={prod?.images[0]} alt="" />
                            <div className={styles["single-prod-info"]}>
                                <h5>{prod?.initData.name[lang]}</h5>
                                <h4>{prod?.newPrice} TND</h4>
                                <div className={styles["prod-info-further"]}>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={Math.round(prod?.review)}
                                        edit={false}
                                        activeColor="#FF9017"
                                    />
                                    <span id={styles["point"]}>•</span>
                                    <p style={{opacity:"0.5"}}>{prod?.verifiedOrders} orders</p>
                                    <span id={styles["point"]}>•</span>
                                    {prod?.initData?.isAvailable?
                                    <p style={{color:"#00B517",opacity:1}}>
                                        In Stock
                                    </p>
                                    : 
                                    <p style={{color:"red",opacity:1}}>
                                        Out of Stock
                                    </p>
                                }
                                </div>
                                <p>
                                    {prod?.initData?.description[lang]}
                                </p>
                                <a className='whatever' onClick={()=>{navigate("/products/"+prod?._id)}}>View details</a>
                            </div>
                        </div>
                        ))
                        : "No matching products"}
                        <div className={styles["prods-pagination"]}>
                            <p>Show {searchProds.length}</p>
                            <div className={styles["paginator"]}>
                                <div onClick={(e)=>{if((paginationLevel-1)>0){setPaginationLevel(paginationLevel-1)}}} className={styles["chevron-paginate"]} style={{borderRight:"none",borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}}>
                                    <BsChevronLeft />
                                </div>
                                {[...Array(Math.ceil(allProds.length/5)+1).keys()].splice(1).map((num)=>(
                                    <span onClick={handleChangePaginationLevel}>{num}</span>
                                ))}
                                <div onClick={(e)=>{if((paginationLevel+1)<(Math.ceil(allProds.length/5)+1)){setPaginationLevel(paginationLevel+1)}}} className={styles["chevron-paginate"]} style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                                    <BsChevronRight/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search;