import React from 'react';
import './Dashboard.css';
import 'font-awesome/css/font-awesome.min.css';
import logo2 from './logo2.svg';
import clock from './clock.svg';

const Dashboard = () => {
    return (
        <div className="dashboardHome">
            <div className="SideBar">
                <div className="logo">
                    <img src={logo2} className="dashlogo" alt="logo" />
                </div>
            </div>
            <div className="headerArea">
                <div>
                    <p><img src={clock} className="clock" alt="clock" /><font className="headerAreaDir"><h4>Estimating</h4></font></p>
                </div>
            </div>
            <div className="dataArea">
                <div>
                    <input type="text" placeholder=" &#xF002;  Search customers by name" className="searchBox" /> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<p className="SearchFilterClass">Filter by: &nbsp; <select className="MySelector">
                        <option>7 Days</option>
                        <option>14 Days</option>
                        <option>21 Days</option>
                    </select></p>
                </div>
                
            </div>
        </div>
    )

}

export default Dashboard;