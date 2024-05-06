
            // import { useContext } from 'react';
            // import { Context } from '../../ContextStore';
            // import { BsFillPersonFill, BsGrid1X2Fill, BsCart, BsCartFill } from 'react-icons/bs';
            // import { IoLogOut } from 'react-icons/io5'
            // import LanguageSelector from '../LanguageSelector';
            // import {CButton} from '@coreui/react'
            // import './Header.css';
            // import { useNavigate } from 'react-router-dom';
            // function Header() {
            //     const { userData, setUserData } = useContext(Context)
            //     const navigate = useNavigate();
            //     return (
                    // <Navbar collapseOnSelect bg="light" variant="light">
                    //     <div className="container nav-container">
                    //         <Navbar.Brand>
                    //             <NavLink className="navbar-brand" to="/">
                    //                 <img
                    //                     alt=""
                    //                     src="assets/images/logo.png"
                    //                     height="100"
                    //                 />{' '}
                    //             </NavLink>
                    //         </Navbar.Brand>
                    //         <LanguageSelector />
                    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    //         <Navbar.Collapse id="responsive-navbar-nav">
                    //             <Nav className="mr-auto">
                    //                 {/* <Nav.Link href="#features">Features</Nav.Link>
                    //                 <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    //             </Nav>
                    //             {userData?
                    //                 (<Nav>
                    //                     <NavLink className="nav-item" id="addButton" to="/cart">
                    //                         <OverlayTrigger key="bottom" placement="bottom"
                    //                             overlay={
                    //                                 <Tooltip id={`tooltip-bottom`}>
                    //                                     <strong>View</strong>  Cart.
                    //                                 </Tooltip>
                    //                             }
                    //                         > 
                    //                             <BsCartFill style={{fontSize:"30px"}}/>
                    //                         </OverlayTrigger>
                    //                     </NavLink>

                    //                     <NavDropdown title={<img id="navImg" src={userData.avatar} alt="user-avatar"/>} drop="left" id="collasible-nav-dropdown">
                    //                         <NavLink className="dropdown-item" to={`/seller/${userData._id}`}>
                    //                             <BsFillPersonFill />Profile
                    //                         </NavLink>

                    //                         <NavDropdown.Divider />
                    //                         {userData?.isSeller?
                    //                         <NavLink className="dropdown-item" to={`/dashboard/`}>
                    //                             <BsGrid1X2Fill />Dashboard
                    //                         </NavLink>
                    //                     :     <NavLink className="dropdown-item" to={`/cd`}>
                    //                     <BsGrid1X2Fill />Dashboard
                    //                 </NavLink>
                    //                     }
                    //                         {/* <NavLink className="dropdown-item" to="/your-sells">
                    //                             <BsFillGridFill />Sells
                    //                     </NavLink> */}
                    //                         {/* <NavLink className="dropdown-item" to="/wishlist">
                    //                             <BsFillHeartFill />Wishlist
                    //                     </NavLink> */}

                    //                         <NavDropdown.Divider />

                    //                         <NavLink className="dropdown-item" to="/auth/logout" onClick={() => {
                    //                             setUserData(null)
                    //                         }}>
                    //                             <IoLogOut />Log out
                    //                         </NavLink>
                    //                     </NavDropdown>
                    //                 </Nav>)
                    //                 :
                    //                 (<Nav>
                    //                     <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                    //                         Sign In
                    //                     </NavLink>
                    //                 </Nav>)
                    //             }
                    //         </Navbar.Collapse>
                    //     </div>
                    // </Navbar>

import { useState,useContext, useEffect } from 'react';
import { Context } from '../../ContextStore';
import { BsFillPersonFill, BsGrid1X2Fill, BsCart, BsCartFill, BsPerson, BsCart3, BsBackpack, BsBagCheckFill, BsList, BsCaretRight, BsCaretRightFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'
import LanguageSelector from '../LanguageSelector';
import {CButton} from '@coreui/react'
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import {getCategories} from "../../services/publicData";
function Header() {
    const { userData, setUserData } = useContext(Context);
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();
    const [allCats,setAllCats] = useState([]);
    const [allCatsHeight,setAllCatsHeight] = useState("")
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
        const formattedCategories = rootCategories.map(rootCategory => formatCategory(rootCategory));
        return formattedCategories;
      }
    useEffect(function(){
        async function init(){
            let cats = await getCategories();
            setAllCats(formatCategories(cats));
            console.log(formatCategories(cats))
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
                    <div className={styles["header-search"]}>
                        <input
                            type="text"
                            placeholder="Search..."
                            name="search"
                        />
                        <CButton className={styles["search-button"]}> Search</CButton>
                    </div>
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
                    {allCats.map((cat)=>(
                    <div className={styles["single-cat"]}>
                        <p>{cat.label}</p>
                    </div>  
                    ))}
                </div>
                <div className="single-cat-dropdown-container">

                </div>
            </div>
        </div>
        </>
    )
}

export default Header;