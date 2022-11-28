import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import axios from "axios";
import {
    CCard,
    CCardBody,
    CFormTextarea,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CFormCheck,
    CButton,
    CFormSelect
} from "@coreui/react";

const MerchantUpdate = () => {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        setValue,
    } = useForm({ mode: "all" });
    const location = useLocation();
    const [lookupList, setLooupList] = useState();

    console.log(location);

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

    const getCountryOption = (e) => {
        let Date = [];
        e.forEach((element) => {
            if (element.lov_id === 1001 && element.is_active === 1) {
                Date.push({ id: element.id, name: element.name });
            }
        });
        return Date;
    };

    const getBusinessOption = (e) => {
        let Date = [];
        e.forEach((element) => {
            if (element.lov_id === 2001 && element.is_active === 1) {
                Date.push({ id: element.id, name: element.name });
            }
        });
        return Date;
    };

    const getStateOption = (e) => {
        let Date = [];
        e.forEach((element) => {
            if (element.lov_id === 3001 && element.is_active === 1) {
                Date.push({ id: element.id, name: element.name });
            }
        });
        return Date;
    };

    const getIndustryOption = (e) => {
        let Date = [];
        e.forEach((element) => {
            if (element.lov_id === 4001 && element.is_active === 1) {
                Date.push({ id: element.id, name: element.name });
            }
        });
        return Date;
    };

    const updateMerchat = (e) => {
        console.log(e);
    }

    useEffect(() => {
        getLookupList();
    }, []);

    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit(updateMerchat)}>
                                    <CRow>
                                        <CCol md={6}>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Merchant ID
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        readOnly
                                                        defaultValue={location.state.marchant_id}
                                                        {...register("merId")}
                                                        placeholder="Merchant ID"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Registered business address
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormSelect
                                                        aria-label="Default select example"
                                                        type="number"
                                                        {...register("Reg_business_address")}
                                                    >
                                                        <option>Select Country</option>
                                                        {lookupList &&
                                                            getCountryOption(lookupList).map((country, index) => (
                                                                <option value={country.id}
                                                                    selected={
                                                                        country.id === location.state.country_no
                                                                            ? "selected"
                                                                            : ""
                                                                    }
                                                                    key={index}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Type of business
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormSelect
                                                        aria-label="Default select example"
                                                        type="number"
                                                        {...register("type_of_business")}
                                                    >
                                                        <option>Type of Business</option>
                                                        {lookupList &&
                                                            getBusinessOption(lookupList).map((country, index) => (
                                                                <option value={country.id}
                                                                    selected={
                                                                        country.id === location.state.business_type
                                                                            ? "selected"
                                                                            : ""
                                                                    }
                                                                    key={index}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Business Name
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.business_name}
                                                        {...register("business_name")}
                                                        placeholder="Business Name"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Business No.
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.bin}
                                                        {...register("business_no")}
                                                        placeholder="Business No"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Address
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.business_address1}
                                                        {...register("b_address_line_1")}
                                                        placeholder="Address Line 1"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.business_address2}
                                                        {...register("b_address_line_2")}
                                                        placeholder="Address Line 2"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    City
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.business_city}
                                                        {...register("b_city")}
                                                        placeholder="City"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    State
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormSelect
                                                        aria-label="Default select example"
                                                        {...register("b_state")}
                                                        type="number"
                                                    >
                                                        <option>Select State</option>
                                                        {lookupList &&
                                                            getStateOption(lookupList).map((country, index) => (
                                                                <option value={country.id}
                                                                    selected={
                                                                        country.id == location.state.business_state
                                                                            ? "selected"
                                                                            : ""
                                                                    }
                                                                    key={index}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                    </CFormSelect>
                                                    <span className="text-danger">{errors.state?.message}</span>
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label text-right">
                                                    Postal Code
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.business_postal_code}
                                                        {...register("b_postel_code")}
                                                        placeholder="Postal Code"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Merchant cetagory code
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.category_code}
                                                        {...register("cat_code")}
                                                        placeholder="Merchant cetagory code"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Business website
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.website}
                                                        {...register("bussiness_website")}
                                                        placeholder="Business website"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Status
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormCheck
                                                        label="Active"
                                                        {...register("status")}
                                                        defaultChecked={
                                                            location.state.status == 1 ? true : false
                                                        }
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol md={6}>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Legal Name Of Person
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.first_name}
                                                        {...register("first_name")}
                                                        placeholder="First Name"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.last_name}
                                                        {...register("last_name")}
                                                        placeholder="Last Name"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Email Address
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.email}
                                                        {...register("email")}
                                                        placeholder="Email Address"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Date of Birth
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="date"
                                                        {...register("dob")}
                                                        placeholder=" Date of Birth"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">City</CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.city}
                                                        {...register("city")}
                                                        placeholder="City"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">Address</CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.address1}
                                                        {...register("address_line_1")}
                                                        placeholder="Address Line 1"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label"></CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.address2}
                                                        {...register("address_line_1")}
                                                        placeholder="Address Line 1"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">State</CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormSelect
                                                        aria-label="Default select example"
                                                        {...register("state")}
                                                        type="number"
                                                    >
                                                        <option>Select State</option>
                                                        {lookupList &&
                                                            getStateOption(lookupList).map((country, index) => (
                                                                <option value={country.id}
                                                                    selected={
                                                                        country.id == location.state.state
                                                                            ? "selected"
                                                                            : ""
                                                                    }
                                                                    key={index}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Postal Code
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.postal_code}
                                                        {...register("postal_code")}
                                                        placeholder="Postal Code"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    National Id
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        defaultValue={location.state.nid_number}
                                                        {...register("national_id")}
                                                        placeholder="Nationnal Id"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">Industry</CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormSelect
                                                        aria-label="Default select example"
                                                        {...register("industry")}
                                                        type="number"
                                                    >
                                                        <option>Select industry</option>
                                                        {lookupList &&
                                                            getIndustryOption(lookupList).map((country, index) => (
                                                                <option value={country.id}
                                                                    selected={
                                                                        country.id === location.state.industry_no
                                                                            ? "selected"
                                                                            : ""
                                                                    }
                                                                    key={index}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CFormLabel className="col-sm-4 col-form-label">
                                                    Product description
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormTextarea type="text" defaultValue={location.state.product_desc} {...register("Product_desc")} />
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    <div className="text-center">
                                        <CButton color="info" type="submit" className="mx-3">Updata</CButton>
                                        <CButton color="danger">Cancle</CButton>
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
export default MerchantUpdate;