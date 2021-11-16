import View from "../components/estimates/view.components";
import MainEstimates from "../components/estimates/estimates.components";
import Catalog from "../components/estimates/catalog.component";
import AddEstimates from "../components/estimates/add.estimates.components";

const routes = [
  {
    path: "/Catalog",
    exact: true,
    name: "catalog",
    component: <Catalog />,
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
    path: "/add-estimates",
    exact: true,
    name: "AddEstimates",
    component: <AddEstimates />,
  },
];
export default routes;
