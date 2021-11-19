import Dashboard from "../components/estimates/dashboard.component";
import View from "../components/estimates/view.components";
import MainEstimates from "../components/estimates/estimates.components";

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
];
export default routes;
