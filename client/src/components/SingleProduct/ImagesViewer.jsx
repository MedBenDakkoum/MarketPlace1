import React,{useState,useEffect} from 'react';
import styles from "./Product.module.css"
function ImagesViewer({ imgs=[""] }) {
    const [currentImg, setCurrentImg] = useState(imgs[0]);
    const handleChangeViewedImage = (e)=>{
        let imgSrc = e.target.src;
        if(!imgs.includes(imgSrc)) return;
        setCurrentImg(imgSrc);

    }
    return (
        <div className={styles["images-navigation-viewer"]}>
            <div className={styles["current-image"]}>
                <img src={currentImg} alt="" />
            </div>
            <div className={styles["list-images"]}>
                {imgs.map((img)=>(
                    <img key={img} onClick={handleChangeViewedImage} style={{cursor:"pointer"}} className={img==currentImg?"active" :""} src={img} alt="" />
                ))}
            </div>
        </div>
    )
}
export default ImagesViewer