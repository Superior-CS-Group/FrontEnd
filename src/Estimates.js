import React from 'react';
import './Dashboard.css';
import 'font-awesome/css/font-awesome.min.css';
import logo2 from './logo2.svg';
import clock from './clock.svg';

const Estimates = () => {

    function SwitchTabs(panelIndex, colorCode){
        var btn = document.querySelectorAll(".estimates_area .btnContainer button");
        var panels = document.querySelectorAll(".estimates_area .tabPanel");
        
            btn.forEach(function(node){
                node.style.backgroundColor="";
                node.style.color="";
            });
            btn[panelIndex].style.backgroundColor = colorCode;
            btn[panelIndex].style.color = "black";
        
            panels.forEach(function(node){
                node.style.display="none";
            });
                panels[panelIndex].style.display="block";
                panels[panelIndex].style.backgroundColor=colorCode;
        }

        SwitchTabs(0,'#ffff')

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
                <div className="estimates_area">
                        <div className="btnContainer">
                            <button onClick={SwitchTabs(0,'#FFFF')}>Upcoming Estimates</button>&nbsp; &nbsp;
                            <button onClick={SwitchTabs(1,'#FFFF')}>Estimates Sent</button>
                        </div>
                        <div className="tabPanel">Upcoming Estimates</div>
                        <div className="tabPanel">Estimates Sent</div>
                </div>
            </div>
        </div>
    )

}

export default Estimates;