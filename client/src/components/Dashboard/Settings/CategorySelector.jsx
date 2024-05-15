import React,{useEffect,useRef,useState} from 'react'
import {CButton} from '@coreui/react';
import { MDBDataTable } from 'mdbreact';
import {getCategories} from '../../../services/publicData';
import {getProdsByCatRef} from '../../../services/adminService';
import { BsXCircleFill } from "react-icons/bs";

export default function CategorySelector(props) {
  const lang = localStorage.getItem("lang");
  const [rows, setRows] = useState([]);
  const [cats, setCats] = useState([]);
  const [visibleCats, setVisibleCats] = useState(false);
  const hasPageBeenRendered = useRef(false);
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
    const data = {
        columns: [
          {
            label: 'Ref',
            field: 'reference',
            width: 150
          },
          {
            label: 'Category Name',
            field: 'nameText',
            width: 150
          },
          {
            label: 'Actions',
            field: 'actions',
            width: 100
          }
        ],
        rows:rows
      };
      const handleSelectProduct = (e)=>{
        setVisibleCats(true);
      }
      const getObjectById = (id)=>{
        let aa=[...cats];
        return aa.filter(a=> a._id==id)
      }
      const handleSelectCatToAdd = async (e)=>{
        let id=""
        if(e.target==e.currentTarget){
          id = e.target.getAttribute("id");
        }else{
          id = e.target.parentNode.getAttribute("id");
        }
        let theSelectedCat = getObjectById(id)[0];
        let prods = await getProdsByCatRef(theSelectedCat.reference);
        let newProds = [];
        prods.map((prod)=>{
          newProds.push({
            title:prod.initData.name,
            price:prod.newPrice,
            img:prod.images[0],
            link:"/products/"+prod._id
          });
        })
        props.passSelectedCat({
          title:theSelectedCat.name,
          ref:theSelectedCat.reference,
          prods:newProds,
          index:props.index
        })
        handleExitPopUp();
      }
      useEffect(function(){
        console.log(cats);
        let rows1 = [...cats];
        cats.map((element)=>{
          element.actions = (<CButton id={element._id} onClick={handleSelectCatToAdd}>Select</CButton>)
          element.nameText = element?.name[lang];
        })
        setRows(rows1)
      },[cats,setCats])
      useEffect(function(){
        async function init(){
          await getCategories()
          .then((cats)=>{
            setCats(cats);
          })
        }
        if(hasPageBeenRendered.current && visibleCats==true){
          init()
        }
        hasPageBeenRendered.current = true;
      },[visibleCats,setVisibleCats])
      const handleExitPopUp = (e)=>{
        setVisibleCats(false);
      }
  return (
    <>
      {visibleCats?
        <div style={{display:"flex",justifyContent:"center",position:"fixed",zIndex:99,height:"100vh",top:0,left:0,width:"100%",overflowY:"scroll"}}>
            <div onClick={handleExitPopUp}  className="exit-popup" style={{zIndex:100,cursor:"pointer",position:"absolute",top:"20px"}}>
              <BsXCircleFill style={{position:"relative",color:"red",fontSize:"24px"}}/>
            </div>
          <MDBDataTable
              striped
              small
              noBottomColumns={true}
              data={data}
              className='select-prods-list'
          />
        </div>
        : ""
        }
        <CButton onClick={handleSelectProduct}>
            Select Category
        </CButton>
    </>
  )
}
