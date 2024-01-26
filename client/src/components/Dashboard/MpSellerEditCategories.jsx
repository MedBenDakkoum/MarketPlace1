import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import {getSellerById} from '../../services/sellerData';
import {updateSeller} from '../../services/adminService'
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {BsCheckSquare, BsChevronDown, BsChevronRight, BsFileEarmark, BsFileEarmarkFill, BsFillFileMinusFill, BsFillFolderFill, BsFillPlusSquareFill, BsFolder, BsFolder2Open, BsFolderFill, BsSquare} from 'react-icons/bs';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
      { value: 'phobos', label: 'Phobos' ,children:[
        { value: 'test1', label: 'test1' },
        { value: 'test2', label: 'test2' }
      ]},
      { value: 'deimos', label: 'Deimos' },
    ],
  }];
const data = ['mars', 'phobos', 'test1', 'test2', 'deimos']
function MpSellerEditCategories() {
    const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
    const [loading, setLoading] = useState(false);

    // const [subscription, setSubscription] = useState({isActive:false});
    const handleSubmit = (e) => {
        // e.preventDefault();
        // setLoading(true);
        // store.categories = getCats();
        // let newData = {...data,store:store,address:address}
        // updateSeller(params.id,newData)
        // .then(res => {
        //     if (!res.error) {
        //         setLoading(false);
        //     } else {
        //         console.log(res.error);
        //     }
        // }).catch(err => console.error('error from register: ', err))
        // console.log(newData);
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