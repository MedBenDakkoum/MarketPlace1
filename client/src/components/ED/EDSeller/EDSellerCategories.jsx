import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol} from '@coreui/react';
import {getCategories,getSellerById} from '../../../services/employeeService'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {BsCheckSquare, BsChevronDown, BsChevronRight, BsFileEarmarkFill, BsFillFileMinusFill, BsFillPlusSquareFill, BsFolder2Open, BsFolderFill, BsSquare} from 'react-icons/bs';

function EDSellerCategories() {
    const lang = localStorage.getItem("lang");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [categories, setCategories] = useState([]);
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nodes,setNodes]= useState([])
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
      console.log(categoryDict);
      console.log(rootCategories);
      const formattedCategories = rootCategories.map(rootCategory => formatCategory(rootCategory));
    
      return formattedCategories;
    }
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            await getCategories().then(function(cats){
              setCategories(cats);
            });
            setChecked([...seller.store.categories]);
        }
        initialise();
        setLoading(false);
    },[]);  
    useEffect(()=>{
      if(categories.length>0){
        let aa = [];
        let i = 0;
        categories.forEach(function(cat){
          aa.push(cat.reference)
          if(i==categories.length-1){
            setData(aa);
          }
          i++;
        })
        setNodes(formatCategories(categories))
      }
    },[categories,setCategories]) 

    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CCol md={12}>
                        <CheckboxTree
                            disabled={true}
                            nodes={nodes}
                            checked={checked}
                            expanded={expanded}
                            onExpand={(expanded) => setExpanded(expanded)}
                            showExpandAll={true}
                            checkModel="all"
                            icons={{
                                check: <BsCheckSquare style={{color:"#1c1c1c"}} className="rct-icon rct-icon-check"  />,
                                uncheck: <BsSquare style={{color:"#1c1c1c"}} className="rct-icon rct-icon-uncheck" />,
                                halfCheck: <BsCheckSquare style={{color:"#1c1c1c"}} className="rct-icon rct-icon-half-check"  />,
                                expandClose: <BsChevronRight style={{color:"#1c1c1c"}} className="rct-icon rct-icon-expand-close"  />,
                                expandOpen: <BsChevronDown style={{color:"#1c1c1c"}} className="rct-icon rct-icon-expand-open"  />,
                                expandAll: <BsFillPlusSquareFill style={{color:"#1c1c1c"}} className="rct-icon rct-icon-expand-all"  />,
                                collapseAll: <BsFillFileMinusFill style={{color:"#1c1c1c"}} className="rct-icon rct-icon-collapse-all" />,
                                parentClose: <BsFolderFill style={{color:"#1c1c1c"}} className="rct-icon rct-icon-parent-close"/>,
                                parentOpen: <BsFolder2Open style={{color:"#1c1c1c"}}  className="rct-icon rct-icon-parent-open"  />,
                                leaf: <BsFileEarmarkFill style={{color:"#1c1c1c"}} className="rct-icon rct-icon-leaf-close" />
                            }}
                        />
                    </CCol>
                </CCol> 
            </CForm>
  )
}

export {EDSellerCategories};