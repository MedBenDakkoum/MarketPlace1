import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {updateSeller,getCategories,getSellerById} from '../../services/adminService'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {BsCheckSquare, BsChevronDown, BsChevronRight, BsFileEarmarkFill, BsFillFileMinusFill, BsFillPlusSquareFill, BsFolder2Open, BsFolderFill, BsSquare} from 'react-icons/bs';

function AdminCategories() {
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
              console.log(cats);
              setCategories(cats);
            });

        }
        initialise();
        setLoading(false);
    },[]);  
    useEffect(()=>{
      if(categories.length>0){
        let aa = [];
        let all = [];
        let i = 0;
        categories.forEach(function(cat){
          aa.push(cat.reference)
          if(i==categories.length-1){
            setChecked(aa);
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
    }
    const handleSelectAll = (e)=>{
        setChecked(data);
    }
    const handleUnSelectAll = (e)=>{
        setChecked([]);
    }
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Categories</h3>
        </div>
        <CheckboxTree
            nodes={nodes}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => {setChecked(checked);console.log(checked);}}
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
            disabled
        />
    </main>
  )
}

export default AdminCategories;