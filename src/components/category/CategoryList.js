import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {
    CCol,
    CContainer,
    CRow,
    CButton,
} from '@coreui/react'



const CategoryList = () => {

 const comumn= [
        {
            name: "Name",
            selector: (row) =>row.name,
        },
        {
            name: "Action",
            selector: (row) => <div><a>Edit</a><a>Delete</a></div>
        }    

 ]

    return (
    <div className="bg-light min-vh-100 d-flex flex-row">
        <CContainer>
            <CRow className="justify-content-center mb-2">
            <CCol md={6}>
            <Link to="/category/add-category">
                <CButton color="primary">Add New</CButton>
                </Link>
                </CCol>
            </CRow>
            <CRow className="justify-content-center">
                <CCol md={6}>
                <DataTable columns={comumn} />
                </CCol>
            </CRow>
        </CContainer>
    </div>
    )
}
export default CategoryList