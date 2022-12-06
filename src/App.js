import React, { Component, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Fees = React.lazy(() => import("./views/payment/Fees"));
const Payment = React.lazy(() => import("./views/payment/Payment"));
const Statement = React.lazy(() => import("./components/statement/Statement"));

// const OrganozationAdd = React.lazy(() => import('./views/pages/f-organization/OrganozationAdd'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/selected-fee" name="Page 500" element={<Fees />} />
            <Route exact path="/payment" name="Page 500" element={<Payment />} />
            <Route exact path="/statement" name="Page 500" element={<Statement />} />

            {/* <Route exact path="/add-orgnization" name="add orgnization" element={<OrganozationAdd />} /> */}
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
