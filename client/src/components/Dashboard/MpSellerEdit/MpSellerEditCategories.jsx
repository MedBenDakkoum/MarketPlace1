import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import {updateSeller} from '../../../services/adminService'
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {BsCheckSquare, BsChevronDown, BsChevronRight, BsFileEarmark, BsFileEarmarkFill, BsFillFileMinusFill, BsFillFolderFill, BsFillPlusSquareFill, BsFolder, BsFolder2Open, BsFolderFill, BsSquare} from 'react-icons/bs';

const nodes = [
  {
    value: 'fashion',
    label: 'Fashion',
    children: [
      { value: 'sunglasses',label: 'Sunglasses',},
      { value: 'watches', label: 'Watches' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'bags', label: 'Bags' },
    ],
  },
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      { value: 'tvs',label: 'TVs',},
      { value: 'computers', label: 'Computers' },
      { value: 'cameras', label: 'Cameras' },
    ],
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
    children: [
      { value: 'movies',label: 'Movies',},
      { value: 'video games', label: 'Video Games' },
      { value: 'books', label: 'Books' },
    ],
  }
];
function MpSellerEditCategories() {
    const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [data,setData] = useState(['electronics', 'tvs', 
  'computers', 'cameras', 'entertainment','movies',
  'video games','books','fashion','sunglasses','watches','shoes','bags']);
    const [loading, setLoading] = useState(false);

    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setChecked([...seller.store.categories]);
        }
        initialise();
        setLoading(false);
    },[]);    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // store.categories = getCats();
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
  //   const [categoriesList,setCategories]= useState([
  //     { key: "Shoes", cat: "Group 1" },
  //     { key: "Electronics", cat: "Group 1" },
  //     { key: "Shirts", cat: "Group 1" },
  //   ]);
  // const [selectedCategories,setSelectedCategories]= useState([
  //   ]);
  // const addCategorie = (selectedList, selectedItem)=> {
  //     setSelectedCategories([...selectedCategories,selectedItem]);
  // }
  // const removeCategorie = (selectedList, selectedItem)=> {
  //     setSelectedCategories(selectedCategories.filter(function(item) {
  //         return item !== selectedItem
  //     }))
  //     let arr=selectedCategories;
  //     for (let i = 0; i < arr.length; i++) { 
  //         if ((arr[i].key === selectedItem.key) && (arr[i].cat === selectedItem.cat)) { 
  //             arr.splice(i, 1); 
  //         } 
  //     }
  //     setSelectedCategories(arr);


  // }
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
                            check: <BsCheckSquare className="rct-icon rct-icon-check"  />,
                            uncheck: <BsSquare className="rct-icon rct-icon-uncheck" />,
                            halfCheck: <BsCheckSquare className="rct-icon rct-icon-half-check"  />,
                            expandClose: <BsChevronRight className="rct-icon rct-icon-expand-close"  />,
                            expandOpen: <BsChevronDown className="rct-icon rct-icon-expand-open"  />,
                            expandAll: <BsFillPlusSquareFill className="rct-icon rct-icon-expand-all"  />,
                            collapseAll: <BsFillFileMinusFill className="rct-icon rct-icon-collapse-all" />,
                            parentClose: <BsFolderFill className="rct-icon rct-icon-parent-close"/>,
                            parentOpen: <BsFolder2Open className="rct-icon rct-icon-parent-open"  />,
                            leaf: <BsFileEarmarkFill className="rct-icon rct-icon-leaf-close" />
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