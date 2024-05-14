import { useState,useContext, useEffect } from 'react';
import { Context } from '../../ContextStore';
import { BsFillPersonFill, BsGrid1X2Fill, BsCart, BsCartFill, BsPerson, BsCart3, BsBackpack, BsBagCheckFill, BsList, BsCaretRight, BsCaretRightFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'
import LanguageSelector from '../LanguageSelector';
import {CButton,CForm} from '@coreui/react'
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import {getCategories} from "../../services/publicData";
function Header() {
    const { userData, setUserData } = useContext(Context);
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();
    const [allCats,setAllCats] = useState([]);
    const [allCatsHeight,setAllCatsHeight] = useState("")
    const [searchValue,setSearchValue] = useState("")
    const formatCategories = (categories)=> {
        const categoryDict = {};
        categories.forEach(category => {
            const parent = category.parent;
            if (!categoryDict[parent]) {
                categoryDict[parent] = [];
            }
            categoryDict[parent].push(category);
        });
        function formatCategory(category) {
            const formattedCategory = {
                value: category.reference,
                label: category.name[lang]
            };
            if (categoryDict[category.reference]) {
                formattedCategory.children = categoryDict[category.reference].map(child => formatCategory(child));
            }
      
            return formattedCategory;
        }
  
        const rootCategories = categoryDict[''];
        if(!rootCategories){
            return [];
        }
        const formattedCategories = rootCategories.map(rootCategory => formatCategory(rootCategory));
        return formattedCategories;
      }
    useEffect(function(){
        async function init(){
            let cats = await getCategories();
            setAllCats(formatCategories(cats));
        }
        init();
    },[])
    const toggleAllCatsDropDown = (e)=>{
        if(allCatsHeight=="0"){
            setAllCatsHeight("auto")
        }else{
            setAllCatsHeight("0")
        }
    }
    const handleChangeSearchValue = (e)=>{
        setSearchValue(e.target.value)
    }
    return (
        <>
        <header className={styles['header-container']}>
            <div className={styles['header']}>
                <div className={styles['logo-search-container']}>
                    <img
                        onClick={(e)=>{navigate('/')}} 
                        src="/assets/images/logo.png"
                        height="140"
                    />
                    <CForm className={styles["header-search"]} onSubmit={(e)=>{e.preventDefault();navigate("/search?q="+searchValue)}}>
                        <input
                            type="text"
                            placeholder="Search..."
                            name="search"
                            value={searchValue}
                            onChange={handleChangeSearchValue}
                        />
                        <CButton type='submit' className={styles["search-button"]}> Search</CButton>
                    </CForm>
                </div>
                <div className={styles['cart-login']}>
                    {userData?
                    <>
                        {userData?.isSeller? 
                            <div onClick={(e)=>{navigate('/dashboard')}} className={styles["single-icon"]}>
                                <BsGrid1X2Fill style={{ color:"#8B96A5",width:'24px',height:'24px'}}/>    
                                <p>Dashboard</p>
                            </div>
                        : ""}
                        <div onClick={(e)=>{navigate('/cd')}} className={styles["single-icon"]}>
                            <BsFillPersonFill style={{color:"#8B96A5",width:'24px',height:'24px'}}/>    
                            <p>Profile</p>
                        </div>
                        <div onClick={(e)=>{navigate('/cd/orders')}} className={styles["single-icon"]}>
                            <BsBagCheckFill style={{color:"#8B96A5",width:'24px',height:'24px'}}/>    
                            <p>Orders</p>
                        </div>
                    </>
                    :  
                        <CButton onClick={(e)=>{navigate('/auth/login')}} style={{height:"45px",backgroundColor:"rgb(0, 123, 255)" , border:"none"}}>Sign in</CButton>
                    }
                    <div onClick={(e)=>{navigate('/cart')}} className={styles["single-icon"]}>
                        <BsCartFill style={{color:"#8B96A5",width:'24px',height:'24px'}}/>    
                        <p>My cart</p>
                    </div>
                    
                </div>
            </div>
        </header>
        <div className={styles["nav-bar-container"]}>
            <div className={styles["nav-bar"]}>
                <div className={styles["nav-bar-categories"]}>
                    <li>
                        <ul onClick={toggleAllCatsDropDown} style={{position:"relative"}}><BsList style={{fontSize:"25px"}}/>All Categories
                        </ul>
                        <ul>Clothes</ul>
                        <ul>Electronics</ul>
                        <ul>Kitchen</ul>
                        <ul>Health & Beauty</ul>
                    </li>
                </div>
                <div className={styles["nav-bar-language"]}>
                    <LanguageSelector />
                </div>
            </div>
            <div style={{height:allCatsHeight}}  className={styles["all-cats-dropdown-container"]}>
                <div className={styles["all-cats-dropdown"]}>
                    {allCats?
                    <> 
                        {allCats.map((cat)=>(
                        <div key={cat.value} className={styles["single-cat"]}>
                            <p>{cat.label}</p>
                        </div>  
                        ))}
                    </>
                    : ""}
                </div>
                <div className="single-cat-dropdown-container">

                </div>
            </div>
        </div>
        </>
    )
}

export default Header;