import Dashboard from "../components/home/dashboard.component";
import View from "../components/home/view.components";


const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/view",
    exact: true,
    name: "view",
    component: <View />,
  },
];
export default routes;
