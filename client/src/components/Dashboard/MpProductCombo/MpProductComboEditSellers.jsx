import React, {useEffect,useState} from 'react';
import { CForm,CCol,CButton} from '@coreui/react';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';

const seller = [
    {
        _id:"123",
        userId:1,
        name:"Seller 1",
        storeName:"Store 1",
        productSales: 14,
        productPrice: 55.2
    }
]

function MpProductComboEditSellers() {
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = seller.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.userId}</CTableDataCell>
                <CTableDataCell>{element.name}</CTableDataCell>
                <CTableDataCell>{element.storeName}</CTableDataCell>
                <CTableDataCell>{element.productSales}</CTableDataCell>
                <CTableDataCell>{element.productPrice}</CTableDataCell>
                <CTableDataCell><a href={"/admin/mp/seller/"+element._id}>More Info</a></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
            <CForm className="row g-3">

                <CCol md={12}>
                    <CCol md={12}>
                    <CTable>
                        <CTableHead>
                            <CTableRow color='light'>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Store Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Product Sales</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Product Price</CTableHeaderCell>
                                <CTableHeaderCell scope="col">More Info</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {rows}
                        </CTableBody>
                    </CTable>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpProductComboEditSellers};