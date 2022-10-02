import React, { useState,useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios";
import {
    CCard,
    CCardBody,
    CFormCheck ,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CFormSelect,
    CButton,
} from '@coreui/react'


const SettelmentUpdate = () => {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        setValue,
    } = useForm({ mode: "all" });
    const location = useLocation();
    const navigate = useNavigate();
    const [bankbranchList, setBankBranchList] = useState();

    const upateSattelmentAccount = (e) => {
        const sattelementAccount = {
            bank_id: parseInt(e.select_bank_name),
            branch_id: parseInt(e.select_branch_name),
            account_name: e.account_name,
            account_id: e.account_id,
            note: e.note,
            is_active: e.status?1:0
        }
        console.log(sattelementAccount);
    }

    const getBankBranchList = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        axios
            .get(`${process.env.REACT_APP_API_URL}banks/`, {
                headers,
            })
            .then((responce) => {
                console.log(responce.data), setBankBranchList(responce.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const getBankOption = (e) => {
        let date = [];
        e &&
            e.map((element) => {
                if (element.bank_flag === 1 && element.is_active === 1) {
                    date.push({ id: element.id, branch_name: element.branch_name });
                }
            });
        return date;
    };

    const getBranchOption = (e) => {
        let date = [];
        e &&
            e.map((element) => {
                if (element.bank_flag === 0 && element.is_active === 1 && element.root_bank === 0) {
                    date.push({ id: element.id, branch_name: element.branch_name });
                }
            });
        return date;
    };

    useEffect(() => {
        getBankBranchList();
    }, []);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit(upateSattelmentAccount)}>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Bank Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example"
                                                {...register("select_bank_name")}
                                            >
                                                <option>select Bank</option>
                                                {getBankOption(bankbranchList) &&
                                                    getBankOption(bankbranchList).map((bank, index) => (
                                                        <option value={bank.id} key={index}>
                                                            {bank.branch_name}
                                                        </option>
                                                    ))}
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Branch Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example"
                                                {...register("select_branch_name")}
                                            >
                                                <option>select Branch</option>
                                                {getBranchOption(bankbranchList) &&
                                                    getBranchOption(bankbranchList).map((bank, index) => (
                                                        <option value={bank.id} key={index}>
                                                            {bank.branch_name}
                                                        </option>
                                                    ))}
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Service Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect aria-label="Default select example">
                                                <option>Open this select menu</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Account Name</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text"
                                                {...register("account_name")}
                                                defaultValue={location.state.account_name}
                                                placeholder="Account Name" />
                                            <span className="text-danger">
                                                {errors.account_name?.message}
                                            </span>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Account id</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text"
                                                {...register("account_id")}
                                                defaultValue={location.state.account_id}
                                                placeholder="Account id" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">Note</CFormLabel>
                                        <CCol sm={9}>
                                            <CFormInput type="text"
                                                {...register("note")}
                                                defaultValue={location.state.note}
                                                placeholder="Note" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">
                                            Status
                                        </CFormLabel>
                                        <CCol sm={9}>
                                            <CFormCheck label="Active" 
                                              defaultChecked={
                                                location.state.is_active == 1 ? true : false
                                              }
                                            {...register("status")} />
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/settelment">
                                            <CButton color="danger" className="mx-3" >Cancle</CButton>
                                        </Link>
                                        <CButton type='submit'   color="info" >Update</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default SettelmentUpdate
