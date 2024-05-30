import styles from './Footer.module.css';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <footer className={styles["footer-container"]}>
            <div className={styles["footer-top"]}>
                <div className={styles["footer-info"]}>
                    <img src='/assets/images/logo.png'/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae perspiciatis quam, unde cum fugit dignissimos non sapiente </p>
                    <div className={styles["footer-socials"]}>
                        <BsFacebook/>
                        <BsTwitter/>
                        <BsLinkedin/>
                        <BsInstagram/>
                        <BsYoutube/>
                    </div>
                </div>
                <div className={styles["footer-links"]}>
                    <div className={styles["single-footer-links"]}>
                        <h1>{t("About")}</h1>
                        <li>
                            <ul onClick={(e)=>{navigate('/about-us')}}>
                                {t("About us")}
                            </ul>
                            <ul onClick={(e)=>{navigate('/find-store')}}>
                                {t("Find store")}
                            </ul>
                            <ul onClick={(e)=>{navigate('/categories')}}>
                                {("Categories")}
                            </ul>
                        </li>
                    </div>
                    <div className={styles["single-footer-links"]}>
                        <h1>{t("Information")}</h1>
                        <li>
                            <ul onClick={(e)=>{navigate('/privacy-policy')}}>
                                {t("Privacy Policy")}
                            </ul>
                            <ul onClick={(e)=>{navigate('/terms-conditions')}}>
                                {t("Terms & Conditions")}
                            </ul>
                            <ul onClick={(e)=>{navigate('/contact-us')}}>
                                {t("Contact Us")}
                            </ul>
                        </li>
                    </div>
                    <div className={styles["single-footer-links"]}>
                        <h1>{t("For users")}</h1>
                        <li>
                            <ul onClick={(e)=>{navigate('/auth/login')}}>
                                {t('Login')}
                            </ul>
                            <ul onClick={(e)=>{navigate('/auth/register')}}>
                                {t('Register')}
                            </ul>
                            <ul onClick={(e)=>{navigate('/cart')}}>
                                {t('Cart')}
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
            <div className={styles["footer-bottom"]}>
                <p>© 2023 Adghal. </p>
            </div>
        </footer >
    )
}

export default Footer;