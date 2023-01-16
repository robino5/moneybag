import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CAvatar,
  CButton,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CFormLabel,
  CFormInput,
  CContainer,
  CForm,
  CFormCheck,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";

const AppHeaderDropdown = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: "all" });

  const navigate = useNavigate();
  const [visible, setVisible] = useState();
  const [prevPass, setPreviousPass] = useState();
  const [newPass, setNewPass] = useState();
  const [conPass, setConPass] = useState();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return navigate("/login");
  };

  const openModal = () => {
    setVisible(true);
  };

  const changePass = (e) => {
    if (newPass != conPass) {
      swal({
        position: "top-end",
        text: "Don't New-password with Confirm-password",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    } else {
      let data = {
        current_pwd: e.Prev_password,
        new_pwd: e.new_password,
      };
      console.log(data);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .put(`${process.env.REACT_APP_API_URL}users/change-my-pwd`, data, {
          headers,
        })
        .then((responce) => {
          console.log(responce.data);
          swal({
            position: "top-end",
            text: responce.data.msg,
            icon: "success",
            button: false,
            timer: 1500,
          });
          setVisible(false);
          reset();
        })
        .catch((error) => {
          console.error("There was an error!", error);
          swal({
            position: "top-end",
            text: "Password Change Failed",
            icon: "error",
            button: false,
            timer: 1500,
          });
        });
    }
  };

  const showPassword = () => {
    var x = document.getElementById("password1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const showPassword2 = () => {
    var x = document.getElementById("password2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const showPassword3 = () => {
    var x = document.getElementById("password3");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const getPasswordMatchingMess = () => {
    if (conPass && conPass != newPass) {
      return "Password Mismatch";
    }
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUser} className="me-2" />
        {/* <CAvatar src={avatar8} size="md" /> */}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="fw-semibold py-2">
          <p>
            <strong>{localStorage.getItem("username")}</strong>
          </p>
        </CDropdownHeader>
        <CDropdownItem className="chang-password" onClick={openModal}>
          Change Password
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />

        <CButton color="justify-content-center w-100" onClick={Logout}>
          Log Out
        </CButton>
      </CDropdownMenu>
      <div>
        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false), reset();
          }}
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Change Password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer>
              <CCard onSubmit={handleSubmit(changePass)}>
                <CCardBody>
                  <CForm>
                  <CFormLabel className="mt-2">Previous Password</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="password"
                    id="password1"
                    {...register("Prev_password", {
                    })}
                  />
                  <span className="text-danger">
                        {errors.Prev_password?.message}
                      </span>
                      <CFormCheck
                        name="status"
                        onClick={showPassword}
                        label="Show Password"
                      />
                  <CFormLabel className="mt-2">New Password</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="password"
                    id="password2"
                    {...register("new_password", {
                      minLength: {
                        value: 6,
                        message: "Password will be Minimum 6 Characters",
                      },
                      validate: (value) => {
                        return (
                          [/[A-Z]/,/[a-z]/, /[0-9]/, /[#?!@$%^&*-]/].every((pattern) =>
                            pattern.test(value)
                          ) || "Password is weak! Please Follow [A-Z],[a-z],[0-9],[#?!@$%^&*-]"
                        );
                      },
                    })}
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                  />
                  <span className="text-danger">
                        {errors.new_password?.message}
                      </span>
                      <CFormCheck
                        name="status"
                        onClick={showPassword2}
                        label="Show Password"
                      />
                  <CFormLabel className="mt-2">Confirm Password</CFormLabel>
                  <CFormInput
                    size="sm"
                    type="password"
                    id="password3"
                    onChange={(e) => {
                      setConPass(e.target.value);
                    }}
                  />
                      <span className="text-danger">
                        {getPasswordMatchingMess()}
                      </span>
                       <CFormCheck
                        name="status"
                        onClick={showPassword3}
                        label="Show Password"
                      />
                  <div className="text-center mt-2">
                    <CButton color="primary" type="submit">
                      Change Password
                    </CButton>
                  </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CContainer>
          </CModalBody>
        </CModal>
      </div>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
