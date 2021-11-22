import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import Datatable from "./estimates.datatable.components";
import MainEstimates from "./estimates.components";


export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <MainEstimates>
        <Datatable />
      </MainEstimates>
    </div>
  );
}
