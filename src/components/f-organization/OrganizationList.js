import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Organization from './Organization.json'
import {
    CCol,
    CContainer,
    CRow,
    CButton,
} from '@coreui/react'

const OrganizationList = () => {

 const comumn= [
        {
            name: "Name",
            selector: (row) =>row.name,
        },
        {
            name: "Short Name",
            selector: (row) =>row.s_name,
        },
        {
            name: "Address",
            selector: (row) =>row.address,
        },
        {
            name: "Status",
            selector: (row) =>row.status,
        },
        {
            name: "Action",
            selector: (row) => <div><a>Edit</a><a>Delete</a></div>
        }    

 ]

    return (
    <div className="bg-light min-vh-100 d-flex flex-row">
        <CContainer>
            <div className="justify-content-centert mb-2">
            <Link to="/orgnization/add-orgnization">
                <CButton color="primary">Add New</CButton>
                </Link>
            </div>
            <CRow className="justify-content-center">
                <CCol md={12}>
                <DataTable columns={comumn}  data={Organization}/>
                </CCol>
            </CRow>
        </CContainer>
    </div>
    )
}
export default OrganizationList