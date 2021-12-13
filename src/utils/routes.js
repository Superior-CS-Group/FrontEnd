import View from "../components/estimates/view.components";
import MainEstimates from "../components/estimates/estimates.components";
import CustomerLeadInfo from "../components/estimates/customer/customerleadinfo.component";
import AddEstimates from "../components/estimates/add.estimates.components";
import EmailSend from "../components/email/email.component";

import Services from "../components/estimates/services/Services.components";
import FormullaTree from "../components/tree/formullaTree.components";
import EstimatePreview from "../components/estimates/estimatepreview.component";
import ContractPreview from "../components/estimates/contractpreview.component";
import Dashboard from "../components/dashboard.component";
// import Formula from "../components/formula/formula.component";

import Formula from "../components/formula/v1/formula.component";
import FormulaV2 from "../components/formula/v2/formula.v2.component";
import Catlog from "../components/estimates/catlog/Catlog";
import EmailSetting from "../components/setting/emailsetting.component";
import UserList from "../components/setting/userList.component";
import UserProfile from "../components/user/userprofile/UserProfile";

import PaymentTerm from "../components/setting/paymentTerms/PaymentTerm";
import TermsAndConditions from "../components/setting/termsandconditions/TermsAndConditions";
import CompanySettings from "../components/setting/companysettings/CompanySettings";
import ProductionRates from "../components/setting/productionrates/ProductionRates";

const routes = [
  // {
  //   path: "/Catalog",
  //   exact: true,
  //   name: "catalog",
  //   component: <Catalog />,
  // },
  {
    path: "/dashboard",
    excat: true,
    name: "dashbaord",
    component: <Dashboard />,
  },
  {
    path: "/estimating",
    exact: true,
    name: "estimates",
    component: <MainEstimates />,
  },

  {
    path: "/view",
    exact: true,
    name: "view",
    component: <View />,
  },
  {
    path: "/customer-lead",
    exact: true,
    name: "customer-lead",
    component: <CustomerLeadInfo />,
  },
  {
    path: "/customer-lead/:id",
    exact: false,
    name: "customer-lead",
    component: <CustomerLeadInfo />,
  },
  {
    path: "/add-estimates",
    exact: true,
    name: "AddEstimates",
    component: <AddEstimates />,
  },
  {
    path: "/view-email",
    exact: true,
    name: "EmailSend",
    component: <EmailSend />,
  },
  {
    path: "/tree",
    exact: true,
    name: "tree",
    component: <FormullaTree />,
  },
  {
    path: "/estimate-templates",
    exact: true,
    name: "estimate-templates",
    component: <Services />,
  },
  {
    path: "/estimate-preview",
    exact: true,
    name: "estimate-preview",
    component: <EstimatePreview />,
  },
  {
    path: "/contract-preview",
    exact: true,
    name: "contract-preview",
    component: <ContractPreview />,
  },
  {
    path: "/contract-preview/:id",
    exact: false,
    name: "contract-preview",
    component: <ContractPreview />,
  },
  {
    path: "/v1/formula-tree",
    exact: true,
    name: "Formula Tree",
    component: <Formula />,
  },
  {
    path: "/v2/formula-tree",
    exact: true,
    name: "Formula Tree v2",
    component: <FormulaV2 />,
  },
  {
    path: "/catalog",
    exact: true,
    name: "catalog",
    component: <Catlog />,
  },
  {
    path: "/email-setting",
    exact: true,
    name: "email-setting",
    component: <EmailSetting />,
  },
  {
    path: "/userlist",
    exact: true,
    name: "userlist",
    component: <UserList />,
  },
  {
    path: "/user-profile",
    exact: true,
    name: "userprofile",
    component: <UserProfile />,
  },

  {
    path: "/company-settings",
    exact: true,
    name: "companysettings",
    component: <CompanySettings />,
  },
  {
    path: "/payment-terms",
    exact: true,
    name: "paymentterms",
    component: <PaymentTerm />,
  },
  {
    path: "/term-and-conditions",
    exact: true,
    name: "termsandconditions",
    component: <TermsAndConditions />,
  },
  {
    path: "production-rates",
    exact: true,
    name: "productionrates",
    component: <ProductionRates />,
  },
];
export default routes;
