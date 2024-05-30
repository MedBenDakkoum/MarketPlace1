import { useState, useContext, useEffect } from 'react';
import { Context } from '../../ContextStore';
import { BsFillPersonFill, BsGrid1X2Fill, BsCartFill, BsBagCheckFill, BsList } from 'react-icons/bs';
import { IoLogOut } from "react-icons/io5";
import LanguageSelector from '../LanguageSelector';
import { CButton, CForm } from '@coreui/react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import Retour from '../Retour/Retour';
import { getCategories, getMostSold } from "../../services/publicData";
import { useTranslation } from 'react-i18next';

function Header() {
    const { userData } = useContext(Context);
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [allCats, setAllCats] = useState([]);
    const [finalCats, setFinalCats] = useState({});
    const [allCatsHeight, setAllCatsHeight] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [mostSoldProduct, setMostSoldProduct] = useState("");

    const formatCategories = (categories) => {
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
        if (!rootCategories) {
            return [];
        }
        return rootCategories.map(rootCategory => formatCategory(rootCategory));
    };

    const formatFinalCategories = (arr) => {
        let rslt = {};
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.children) {
                rslt[element.value] = element.children.map(child => child.value);
            } else {
                rslt[element.value] = [element.value];
            }
        }
        return rslt;
    };

    useEffect(function () {
        async function init() {
            let cats = await getCategories();
            setFinalCats(formatFinalCategories(formatCategories(cats)));
            setAllCats(formatCategories(cats));
            let prod = await getMostSold();
            setMostSoldProduct(prod._id);
        }
        init();
    }, []);

    const toggleAllCatsDropDown = () => {
        setAllCatsHeight(allCatsHeight === "0" ? "auto" : "0");
    };

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <header className={styles['header-container']}>
                <div className={styles['header']}>
                    <div className={styles['logo-search-container']}>
                        <img
                            onClick={() => { navigate('/') }}
                            src="/assets/images/logo.png"
                            height="140"
                            alt="Logo"
                        />
                        <CForm className={styles["header-search"]} onSubmit={(e) => { e.preventDefault(); navigate("/search?q=" + searchValue) }}>
                            <input
                                type="text"
                                placeholder={t('Search...')}
                                name="search"
                                value={searchValue}
                                onChange={handleChangeSearchValue}
                            />
                            <CButton type='submit' className={styles["search-button"]}>{t('Search')}</CButton>
                        </CForm>
                    </div>
                    <div className={styles['cart-login']}>
                        {userData ?
                            <>
                                {userData?.isSeller ?
                                    <div onClick={() => { navigate('/dashboard') }} className={styles["single-icon"]}>
                                        <BsGrid1X2Fill style={{ color: "#8B96A5", width: '24px', height: '24px' }} />
                                        <p>{t('Dashboard')}</p>
                                    </div>
                                    : ""}
                                <div onClick={() => { navigate('/cd') }} className={styles["single-icon"]}>
                                    <BsFillPersonFill style={{ color: "#8B96A5", width: '24px', height: '24px' }} />
                                    <p>{t('Profile')}</p>
                                </div>
                                <div onClick={() => { navigate('/cd/orders') }} className={styles["single-icon"]}>
                                    <BsBagCheckFill style={{ color: "#8B96A5", width: '24px', height: '24px' }} />
                                    <p>{t('Orders')}</p>
                                </div>
                            </>
                            :
                            <CButton onClick={() => { navigate('/auth/login') }} style={{ height: "45px", backgroundColor: "rgb(0, 123, 255)", border: "none" }}>{t('Sign in')}</CButton>
                        }
                        <div onClick={() => { navigate('/cart') }} className={styles["single-icon"]}>
                            <BsCartFill style={{ color: "#8B96A5", width: '24px', height: '24px' }} />
                            <p>{t('My cart')}</p>
                        </div>
                        {userData ?
                            <div onClick={() => { window.location.href = '/auth/logout' }} className={styles["single-icon"]}>
                                <IoLogOut style={{ color: "#8B96A5", width: '24px', height: '24px' }} />
                                <p>{t('Log out')}</p>
                            </div>
                            :
                            ""}
                    </div>
                </div>
            </header>
            <div className={styles["nav-bar-container"]}>
                <div className={styles["nav-bar"]}>
                    <div className={styles["nav-bar-categories"]}>
                        <li>
                            <ul onClick={toggleAllCatsDropDown} style={{ position: "relative" }}><BsList style={{ fontSize: "25px" }} />{t('All Categories')}
                            </ul>
                            <ul onClick={() => { navigate("/contact-us") }}>{t('Contact us')}</ul>
                            <ul onClick={() => { navigate("/products/" + mostSoldProduct) }}>{t('Most sold product')}</ul>
                        </li>
                    </div>
                    <div className={styles["nav-bar-language"]}>
                        <LanguageSelector />
                    </div>
                </div>
                <div style={{ height: allCatsHeight }} className={styles["all-cats-dropdown-container"]}>
                    <div className={styles["all-cats-dropdown"]}>
                        {allCats ?
                            <>
                                {allCats.map((cat) => (
                                    <div key={cat.value} onClick={() => { navigate("/search?q=&cats=" + finalCats[cat.value].join(",")) }} className={styles["single-cat"]}>
                                        <p>{cat.label}</p>
                                    </div>
                                ))}
                            </>
                            : ""}
                    </div>
                </div>
            </div>
            <Retour />
        </>
    );
}

export default Header;
