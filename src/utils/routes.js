import View from "../components/estimates/view.components";
import MainEstimates from "../components/estimates/estimates.components";
import CustomerLeadInfo from "../components/estimates/customer/customerleadinfo.component";
import Catalog from "../components/estimates/catalog.component";
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

const routes = [
  {
    path: "/Catalog",
    exact: true,
    name: "catalog",
    component: <Catalog />,
  },
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
    path: "/services",
    exact: true,
    name: "services",
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
    path: "/new-catalog",
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
];
export default routes;
