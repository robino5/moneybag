import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import {
    CCard,
    CCardBody,
    CFormSelect,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CFormCheck,
    CButton,
} from "@coreui/react";

const MerchantServiceAdd = () => {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        setValue,
    } = useForm({ mode: "all" });
    const navigate = useNavigate();
    const [merchantList, setmerchantList] = useState();
    const [bankList, setBankList] = useState();
    const [lookupList, setLooupList] = useState();
    const [merchantService, setMerchantServicee] = useState([]);

    const getMertchant = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        axios
            .get(`${process.env.REACT_APP_API_URL}marchants/`, {
                headers,
            })
            .then((responce) => {
                console.log(responce.data), setmerchantList(responce.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const getBankList = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        axios
            .get(`${process.env.REACT_APP_API_URL}banks/`, {
                headers,
            })
            .then((responce) => {
                console.log(responce.data), setBankList(responce.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const getLookupList = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        axios
            .get(`${process.env.REACT_APP_API_URL}lookups/detail-list`, {
                headers,
            })
            .then((responce) => {
                console.log(responce.data), setLooupList(responce.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const getServiceOption = (e) => {
        let Date = [];
        e.forEach((element) => {
            if (element.lov_id === 6001 && element.is_active === 1) {
                Date.push({ id: element.id, name: element.name });
            }
        });
        return Date;
    };

    const getBankOption = (e) => {
        let date = [];
        e &&
            e.map((element) => {
                if (element.bank_flag === 1 && element.is_active) {
                    date.push({ id: element.id, branch_name: element.branch_name });
                }
            });
        return date;
    };

    useEffect(() => {
        getMertchant();
        getBankList();
        getLookupList();
    }, []);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit()}>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">
                                            Merchant Name
                                        </CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                {...register("merchant_name", {
                                                    required: "Please select Merchant Name",
                                                })}
                                            >
                                                <option>select Merchant Name</option>
                                                {merchantList &&
                                                    merchantList.map((merchant, index) => (
                                                        <option value={merchant.id} key={index}>
                                                            {merchant.first_name + " " + merchant.last_name}
                                                        </option>
                                                    ))}
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CFormLabel className="col-sm-3 col-form-label">
                                            Settlement Account Name
                                        </CFormLabel>
                                        <CCol sm={9}>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                {...register("branch_name", {
                                                    required: "Please select Industry",
                                                })}
                                            >
                                                <option>select Branch</option>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol sm={3}>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                {...register("bank_name", {
                                                    required: "Please select Bannk name",
                                                })}
                                            >
                                                <option>select Bank</option>
                                                {getBankOption(bankList) &&
                                                    getBankOption(bankList).map((bank, index) => (
                                                        <option value={bank.id} key={index}>
                                                            {bank.branch_name}
                                                        </option>
                                                    ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol sm={3}>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                {...register("service_name", {
                                                    required: "Please select Service name",
                                                })}
                                            >
                                                <option>select Service</option>
                                                {lookupList &&
                                                    getServiceOption(lookupList).map((service, index) => (
                                                        <option value={service.id} key={index}>
                                                            {service.name}
                                                        </option>
                                                    ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol sm={2}>
                                            <CFormInput
                                                type="text"
                                                {...register("percentage")}
                                                placeholder="Percentage"
                                            />
                                        </CCol>
                                        <CCol sm={3}>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                {...register("type", {
                                                    required: "Please select Type",
                                                })}
                                            >
                                                <option >Select Type</option>
                                                <option value={'F'}>Fixed</option>
                                                <option value={'P'}>Percentage </option>
                                                <option value={'S'}>Slab </option>
                                                <option value={'C'}>Combination </option>

                                            </CFormSelect>
                                        </CCol>
                                        <CCol sm={1}>
                                            <CButton>Add</CButton>
                                        </CCol>
                                    </CRow>
                                    <div className="text-center ">
                                        <Link to="/merchant-service">
                                            <CButton color="danger" className="mx-3">
                                                Cancle
                                            </CButton>
                                        </Link>
                                        <CButton color="success">
                                            Save
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default MerchantServiceAdd;
