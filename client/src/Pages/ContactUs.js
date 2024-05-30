import { useState, useEffect } from 'react';
import { getSettings } from '../services/settingsService';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function init() {
            let s = await getSettings();
            setSettings(s);
        }
        init();
    }, []);

    return (
        <div className='contactForm'>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", borderRadius: "15px", border: "1px solid #DEE2E7", backgroundColor: "white", padding: "20px" }} className='single-contact-field'>
                <img style={{ maxWidth: "100px", border: "1px solid #0D6EFD", borderRadius: "50px", padding: "20px" }} src="https://icons.veryicon.com/png/o/miscellaneous/monochrome-linear-icon-library/address-90.png" alt="address icon"/>
                <h4>{t('Our Address')}</h4>
                <p style={{ textAlign: "center" }}>Tunisia, Monastir, Omrane 5000</p>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", borderRadius: "15px", border: "1px solid #DEE2E7", backgroundColor: "white", padding: "20px" }} className='single-contact-field'>
                <img style={{ maxWidth: "100px", border: "1px solid #0D6EFD", borderRadius: "50px", padding: "20px" }} src="https://i.ibb.co/1KWLG1V/phone.png" alt="phone icon"/>
                <h4>{t('Phone Number')}</h4>
                <p style={{ textAlign: "center" }}>+216 54 732 488</p>
            </div>
            <div style={{ flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", borderRadius: "15px", border: "1px solid #DEE2E7", backgroundColor: "white", padding: "20px" }} className='single-contact-field'>
                <img style={{ maxWidth: "100px", border: "1px solid #0D6EFD", borderRadius: "50px", padding: "20px" }} src="https://cdn2.iconfinder.com/data/icons/basic-thin-line-color/21/19-512.png" alt="email icon"/>
                <h4>{t('Email')}</h4>
                <p style={{ textAlign: "center" }}>{settings.supportEmail}</p>
            </div>
        </div>
    );
};

export default ContactUs;
