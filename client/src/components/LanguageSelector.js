import React, {useState} from "react";
import i18n from '../i18n';
import Flag from 'react-world-flags'

const LanguageSelector = () => {
    
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
    function refreshPage() {
        window.location.reload(false);
    }
    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
        setSelectedLanguage(e.target.value);
        localStorage.setItem("lang", e.target.value);
        refreshPage();
    }
    return (
        <select style={{border:"none",background:"none"}} defaultValue={selectedLanguage} onChange={chooseLanguage}>  
            <option value="fr"><span>French</span></option>
            <option value="ar"><span>Arabic</span></option>
            <option value="en"><span>English</span></option>
        </select>
    );
};

export default LanguageSelector;
