import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
// const Typography = React.lazy(() =>
//   import("./views/theme/typography/Typography")
// );

// Base
// const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
// const Breadcrumbs = React.lazy(() =>
//   import("./views/base/breadcrumbs/Breadcrumbs")
// );
// const Cards = React.lazy(() => import("./views/base/cards/Cards"));
// const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
// const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
// const ListGroups = React.lazy(() =>
//   import("./views/base/list-groups/ListGroups")
// );
// const Navs = React.lazy(() => import("./views/base/navs/Navs"));
// const Paginations = React.lazy(() =>
//   import("./views/base/paginations/Paginations")
// );
// const Placeholders = React.lazy(() =>
//   import("./views/base/placeholders/Placeholders")
// );
// const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
// const Progress = React.lazy(() => import("./views/base/progress/Progress"));
// const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
// const Tables = React.lazy(() => import("./views/base/tables/Tables"));
// const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// // Buttons
// const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
// const ButtonGroups = React.lazy(() =>
//   import("./views/buttons/button-groups/ButtonGroups")
// );
// const Dropdowns = React.lazy(() =>
//   import("./views/buttons/dropdowns/Dropdowns")
// );

// //Forms
// const ChecksRadios = React.lazy(() =>
//   import("./views/forms/checks-radios/ChecksRadios")
// );
// const FloatingLabels = React.lazy(() =>
//   import("./views/forms/floating-labels/FloatingLabels")
// );
// const FormControl = React.lazy(() =>
//   import("./views/forms/form-control/FormControl")
// );
// const InputGroup = React.lazy(() =>
//   import("./views/forms/input-group/InputGroup")
// );
// const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
// const Range = React.lazy(() => import("./views/forms/range/Range"));
// const Select = React.lazy(() => import("./views/forms/select/Select"));
// const Validation = React.lazy(() =>
//   import("./views/forms/validation/Validation")
// );

// const Charts = React.lazy(() => import("./views/charts/Charts"));

// // Icons
// const CoreUIIcons = React.lazy(() =>
//   import("./views/icons/coreui-icons/CoreUIIcons")
// );
// const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
// const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// // Notifications
// const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
// const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
// const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
// const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

// const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const OrganizationAdd = React.lazy(() =>
  import("./components/f-organization/OrganizationAdd")
);
const OrganizationUpdate = React.lazy(() =>
  import("./components/f-organization/OrganizationUpdate")
);
const OrganizationList = React.lazy(() =>
  import("./components/f-organization/OrganizationList")
);
const CatagoryServicesAdd = React.lazy(() =>
  import("./components/catagory-services/CatagoryServicesAdd")
);
const CatagoryServicesUpdate = React.lazy(() =>
  import("./components/catagory-services/CatagoryServicesUpdate")
);
const CatagoryServicesList = React.lazy(() =>
  import("./components/catagory-services/CatagoryServicesList")
);
const PartnerAdd = React.lazy(() => import("./components/partner/PartnerAdd"));
const PartnerUpdate = React.lazy(() =>
  import("./components/partner/PartnerUpdate")
);
const PartnerList = React.lazy(() =>
  import("./components/partner/PartnerList")
);
const Userist = React.lazy(() => import("./components/users/UserList"));
const UserAdd = React.lazy(() => import("./components/users/UserAdd"));
const UserUpdate = React.lazy(() => import("./components/users/UserUpdate"));

const FintechList = React.lazy(() =>
  import("./components/fintech/FintechList")
);
const FintechAdd = React.lazy(() => import("./components/fintech/FintechAdd"));
const FintechUpdate = React.lazy(() =>
  import("./components/fintech/FintechUpdate")
);
const SettelmentList = React.lazy(() =>
  import("./components/settelment-account/SettelmentList")
);
const SettelmentAdd = React.lazy(() =>
  import("./components/settelment-account/SettelmentAdd")
);
const SettelmentUpdate = React.lazy(() =>
  import("./components/settelment-account/SettelmentUpdate")
);

const PartnerBranchList = React.lazy(() =>
  import("./components/partner-branch/PartnerBranchList")
);
const PartnerBranchAdd = React.lazy(() =>
  import("./components/partner-branch/PartnerBranchAdd")
);
const PartnerBranchUpdate = React.lazy(() =>
  import("./components/partner-branch/PartnerBranchUpdate")
);

const StoreList = React.lazy(() => import("./components/store/StoreList"));
const StoreAdd = React.lazy(() => import("./components/store/StoreAdd"));
const StoreUpdate = React.lazy(() => import("./components/store/StoreUpdate"));

const BankAccountList = React.lazy(() =>
  import("./components/bank-account/BankAccountList")
);
const BankAccountAdd = React.lazy(() =>
  import("./components/bank-account/BankAccountAdd")
);
const BankAccountUpdate = React.lazy(() =>
  import("./components/bank-account/BankAccountUpdate")
);

const BankBranchList = React.lazy(() =>
  import("./components/Banks/BankBranchList")
);
const BankBranchAdd = React.lazy(() =>
  import("./components/Banks/BankBranchAdd")
);
const BankBranchUpdate = React.lazy(() =>
  import("./components/Banks/BankBranchUpdate")
);

const ServiceList = React.lazy(() =>
  import("./components/services/ServiceList")
);
const ServiceAdd = React.lazy(() => import("./components/services/ServiceAdd"));
const ServiceUpdate = React.lazy(() =>
  import("./components/services/ServiceUpdate")
);
const MerchantList = React.lazy(() =>
  import("./components/merchant management/MerchantList")
);

const MerchantManagement = React.lazy(() =>
  import("./components/merchant management/MerchantManagement")
);

const BankDetailsUpdate = React.lazy(() =>
  import("./components/merchant management/bank details/BankDetailsUpdate")
);
const MerchantStore = React.lazy(() =>
  import("./components/merchant management/merchant store/MerchantStoreList")
);
const MerchantStoreAdd = React.lazy(() =>
  import("./components/merchant management/merchant store/MerchantStoreAdd")
);

const MerchantStoreUpdate = React.lazy(() =>
  import("./components/merchant management/merchant store/MerchantStoreUpdate")
);

const PaymetBank = React.lazy(() => import("./components/payment/PaymetBank"));

const PaymentDetail = React.lazy(() =>
  import("./components/payment/PaymentDetail")
);

const DefaultService = React.lazy(() =>
  import("./components/default-service/DefaultService")
);

const DefaultServiceList = React.lazy(() =>
  import("./components/default-service/DefaultServiceList")
);

const DefaultServiceUpdate = React.lazy(() =>
  import("./components/default-service/DefaultServiceUpdate")
);

const MerchantServiceList = React.lazy(() =>
  import(
    "./components/merchant management/merchant service/MerchantServiceList"
  )
);

const MerchantServiceAdd = React.lazy(() =>
  import("./components/merchant management/merchant service/MerchantServiceAdd")
);

const MerchantServiceUpdate = React.lazy(() =>
  import(
    "./components/merchant management/merchant service/MerchantServiceUpdate"
  )
);

const routes = [
  // { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  // { path: "/theme", name: "Theme", element: Colors, exact: true },
  // { path: "/theme/colors", name: "Colors", element: Colors },
  // { path: "/theme/typography", name: "Typography", element: Typography },
  // { path: "/base", name: "Base", element: Cards, exact: true },
  // { path: "/base/accordion", name: "Accordion", element: Accordion },
  // { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  // { path: "/base/cards", name: "Cards", element: Cards },
  // { path: "/base/carousels", name: "Carousel", element: Carousels },
  // { path: "/base/collapses", name: "Collapse", element: Collapses },
  // { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  // { path: "/base/navs", name: "Navs", element: Navs },
  // { path: "/base/paginations", name: "Paginations", element: Paginations },
  // { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  // { path: "/base/popovers", name: "Popovers", element: Popovers },
  // { path: "/base/progress", name: "Progress", element: Progress },
  // { path: "/base/spinners", name: "Spinners", element: Spinners },
  // { path: "/base/tables", name: "Tables", element: Tables },
  // { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  // { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  // { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  // { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  // {
  //   path: "/buttons/button-groups",
  //   name: "Button Groups",
  //   element: ButtonGroups,
  // },
  // { path: "/charts", name: "Charts", element: Charts },
  // { path: "/forms", name: "Forms", element: FormControl, exact: true },
  // { path: "/forms/form-control", name: "Form Control", element: FormControl },
  // { path: "/forms/select", name: "Select", element: Select },
  // {
  //   path: "/forms/checks-radios",
  //   name: "Checks & Radios",
  //   element: ChecksRadios,
  // },
  // { path: "/forms/range", name: "Range", element: Range },
  // { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  // {
  //   path: "/forms/floating-labels",
  //   name: "Floating Labels",
  //   element: FloatingLabels,
  // },
  // { path: "/forms/layout", name: "Layout", element: Layout },
  // { path: "/forms/validation", name: "Validation", element: Validation },
  // { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  // { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  // { path: "/icons/flags", name: "Flags", element: Flags },
  // { path: "/icons/brands", name: "Brands", element: Brands },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   element: Alerts,
  //   exact: true,
  // },
  // { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  // { path: "/notifications/badges", name: "Badges", element: Badges },
  // { path: "/notifications/modals", name: "Modals", element: Modals },
  // { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  // { path: "/widgets", name: "Widgets", element: Widgets },

  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/orgnization", name: "orgnization", element: OrganizationList },
  {
    path: "/orgnization/add-orgnization",
    name: "add-orgnization",
    element: OrganizationAdd,
  },
  {
    path: "/orgnization/update-orgnization",
    name: "update-orgnization",
    element: OrganizationUpdate,
  },
  {
    path: "/category-services",
    name: "orgnization",
    element: CatagoryServicesList,
  },
  {
    path: "/category-services/add-category-services",
    name: "add-orgnization",
    element: CatagoryServicesAdd,
  },
  {
    path: "/category-services/update-category-services",
    name: "update-orgnization",
    element: CatagoryServicesUpdate,
  },
  { path: "/partner", name: "orgnization", element: PartnerList },
  {
    path: "/partner/add-partner",
    name: "add-partner",
    element: PartnerAdd,
  },
  {
    path: "/partner/update-partner",
    name: "update-partner",
    element: PartnerUpdate,
  },
  { path: "/users", name: "users", element: Userist },
  {
    path: "/users/add-user",
    name: "add-user",
    element: UserAdd,
  },
  {
    path: "/users/update-user",
    name: "update-user",
    element: UserUpdate,
  },

  { path: "/fintech", name: "fintech", element: FintechList },
  { path: "/fintech/add-fintech", name: "add-fintech", element: FintechAdd },
  {
    path: "/fintech/update-fintech",
    name: "update-fintech",
    element: FintechUpdate,
  },
  { path: "/settelment", name: "settelment", element: SettelmentList },
  {
    path: "/settelment/add-settelment",
    name: "add-settelment",
    element: SettelmentAdd,
  },
  {
    path: "/settelment/update-settelment",
    name: "update-settelment",
    element: SettelmentUpdate,
  },

  {
    path: "/partner-branch",
    name: "partner-branch",
    element: PartnerBranchList,
  },
  {
    path: "/partner-branch/add-partner-branch",
    name: "add-partner-branch",
    element: PartnerBranchAdd,
  },
  {
    path: "/partner-branch/update-partner-branch",
    name: "update-partner-branch",
    element: PartnerBranchUpdate,
  },

  {
    path: "/store",
    name: "store",
    element: StoreList,
  },
  {
    path: "/store/add-store",
    name: "add-store",
    element: StoreAdd,
  },
  {
    path: "/store/update-store",
    name: "update-store",
    element: StoreUpdate,
  },

  {
    path: "/bank-account",
    name: "bank-account",
    element: BankAccountList,
  },
  {
    path: "/bank-account/add-bank-account",
    name: "add-bank-account",
    element: BankAccountAdd,
  },
  {
    path: "/bank-account/update-bank-account",
    name: "update-bank-account",
    element: BankAccountUpdate,
  },

  {
    path: "/bank-branch",
    name: "Bank Branch List",
    element: BankBranchList,
  },
  {
    path: "/bank-branch/add-bank-branch",
    name: "add-bank-branch",
    element: BankBranchAdd,
  },
  {
    path: "/bank-branch/update-bank-branch",
    name: "update-bank-branch",
    element: BankBranchUpdate,
  },
  {
    path: "/service",
    name: "Service",
    element: ServiceList,
  },
  {
    path: "/service/add-service",
    name: "add-sevice",
    element: ServiceAdd,
  },
  {
    path: "/service/update-service",
    name: "update-service",
    element: ServiceUpdate,
  },
  {
    path: "/merchant_management",
    name: "merchant_management",
    element: MerchantManagement,
  },
  {
    path: "/merchant",
    name: "merchant",
    element: MerchantList,
  },
  {
    path: "/update-bank-details",
    name: "merchant_management",
    element: BankDetailsUpdate,
  },
  {
    path: "/bank-payment",
    name: "bank-payment",
    element: PaymetBank,
  },
  {
    path: "/payment-details",
    name: "payment-details",
    element: PaymentDetail,
  },
  {
    path: "/merchant-store",
    name: "merchant-store",
    element: MerchantStore,
  },
  {
    path: "/add-merchant-store",
    name: "add-merchant-store",
    element: MerchantStoreAdd,
  },
  {
    path: "/merchant-store/update-merchant-store",
    name: "update-merchant-store",
    element: MerchantStoreUpdate,
  },
  {
    path: "/default-servic/add-default-service",
    name: "add-default-service",
    element: DefaultService,
  },
  {
    path: "/default-servic/update-default-service",
    name: "update-default-service",
    element: DefaultServiceUpdate,
  },
  {
    path: "/default-service",
    name: "default-service",
    element: DefaultServiceList,
  },
  {
    path: "/merchant-service",
    name: "merchant-service",
    element: MerchantServiceList,
  },
  {
    path: "/add-merchant-service",
    name: "add-merchant-service",
    element: MerchantServiceAdd,
  },
  {
    path: "/merchant-service/update-merchant-service",
    name: "add-merchant-service",
    element: MerchantServiceUpdate,
  },

  MerchantServiceUpdate,
];

export default routes;
