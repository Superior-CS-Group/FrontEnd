import Dashboard from "../components/estimates/dashboard.component";
import View from "../components/estimates/view.components";
import MainEstimates from "../components/estimates/estimates.components";
import CustomerLeadInfo from "../components/estimates/customer/customerleadinfo.component";

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
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
];
export default routes;
