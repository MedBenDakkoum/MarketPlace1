import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import {updateSeller,getCategories} from '../../../services/adminService'
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {BsCheckSquare, BsChevronDown, BsChevronRight, BsFileEarmark, BsFileEarmarkFill, BsFillFileMinusFill, BsFillFolderFill, BsFillPlusSquareFill, BsFolder, BsFolder2Open, BsFolderFill, BsSquare} from 'react-icons/bs';

// const nodes = [
//   {
//     value: 'fashion',
//     label: 'Fashion',
//     children: [
//       { value: 'sunglasses',label: 'Sunglasses',},
//       { value: 'watches', label: 'Watches' },
//       { value: 'shoes', label: 'Shoes' },
//       { value: 'bags', label: 'Bags' },
//     ],
//   },
//   {
//     value: 'electronics',
//     label: 'Electronics',
//     children: [
//       { value: 'tvs',label: 'TVs',},
//       { value: 'computers', label: 'Computers' },
//       { value: 'cameras', label: 'Cameras' },
//     ],
//   },
//   {
//     value: 'entertainment',
//     label: 'Entertainment',
//     children: [
//       { value: 'movies',label: 'Movies',},
//       { value: 'video games', label: 'Video Games' },
//       { value: 'books', label: 'Books' },
//     ],
//   }
// ];
function MpSellerEditCategories() {
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
              label: category.name
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
     const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {store:{categories:[...checked]}}
        updateSeller(params.id,newData)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
        console.log(newData);
    }
    const handleSelectAll = (e)=>{
        setChecked(data);
    }
    const handleUnSelectAll = (e)=>{
        setChecked([]);
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={12}>
                    <CCol md={12}>
                        <CButton type="button" onClick={handleSelectAll}>Select all</CButton>
                        <CButton type="button" onClick={handleUnSelectAll}>Unselect all</CButton>
                    </CCol>
                    <CCol md={12}>
                    <CheckboxTree
                        nodes={nodes}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked) => {setChecked(checked);console.log(checked);}}
                        onExpand={(expanded) => setExpanded(expanded)}
                        showExpandAll={true}
                        checkModel="all"
                        icons={{
                            check: <BsCheckSquare style={{color:"white"}} className="rct-icon rct-icon-check"  />,
                            uncheck: <BsSquare style={{color:"white"}} className="rct-icon rct-icon-uncheck" />,
                            halfCheck: <BsCheckSquare style={{color:"white"}} className="rct-icon rct-icon-half-check"  />,
                            expandClose: <BsChevronRight style={{color:"white"}} className="rct-icon rct-icon-expand-close"  />,
                            expandOpen: <BsChevronDown style={{color:"white"}} className="rct-icon rct-icon-expand-open"  />,
                            expandAll: <BsFillPlusSquareFill style={{color:"white"}} className="rct-icon rct-icon-expand-all"  />,
                            collapseAll: <BsFillFileMinusFill style={{color:"white"}} className="rct-icon rct-icon-collapse-all" />,
                            parentClose: <BsFolderFill style={{color:"white"}} className="rct-icon rct-icon-parent-close"/>,
                            parentOpen: <BsFolder2Open style={{color:"white"}}  className="rct-icon rct-icon-parent-open"  />,
                            leaf: <BsFileEarmarkFill style={{color:"white"}} className="rct-icon rct-icon-leaf-close" />
                        }}
                    />
                    </CCol>
                    <CCol xs={12}>
                    <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol> 
            </CForm>
  )
}

export {MpSellerEditCategories};