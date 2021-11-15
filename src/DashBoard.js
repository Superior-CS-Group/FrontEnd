import React from 'react';
import logo2 from './logo2.svg';
import clock from './clock.svg';
import msgbox from './msgBox.png'
import bellicon from './bell-icon.png'
import tab from './tab.svg';
import vis from './vis.svg';
import './HomeDashboard.css'

const DashBoard = () => {
    function addColumn() {
        alert('I am called!!');
    }

    return (
        <div className="BBDashBoard__">
            <div className="DashBoardSideBar__">
            </div>
            <div className="TopBarNav___">
                <img src={logo2} className="betaLogo__" alt="logo" /><span className="NameSpecHolder__"> Welcome, <strong className="DisplayName__">John</strong> &nbsp;<button className="DispAminName__">Admin</button><img src={msgbox} className="MessageAreaBox__" /><img src={bellicon} className="BellIcon__" /></span>
            </div>
            <div>
                <h4 className="MainPageExTap__">Estimates</h4>
            </div>
            <div>
                <h4 className="MainPageExTap__2__">Recently added</h4>
            </div>
            <div className="BoxSliderView__">
                <div className="TabBoxSlideEx__">
                    <table className="MajorBox___">
                        <p className="movingFwdArea1__">Moving FWD</p>
                        <p className="EstimateHeaderTxt__">Estimate
                        <h5 className="BoldDescText__">#00001</h5></p>
                        <p className="EstimateHeaderTxt__">Costumer Name
                        <h5 className="BoldDescText__">Leslie Alexander</h5></p>
                        <p className="EstimateHeaderTxt__">Adress
                            <h5 className="BoldDescText__">11 West 53 Street, <br/>
                            Manhattan</h5></p><span className="PushLine__"><p className="EstimateHeaderTxt__2__">Distance
                               <h5 className="BoldDescText__2__"> 6.3 km</h5></p></span>

                    </table>
                    <table className="Majorbox2__">                        
                    <p className="movingFwdArea1__">Moving FWD</p>
                        <p className="EstimateHeaderTxt__">Estimate
                        <h5 className="BoldDescText__">#00001</h5></p>
                        <p className="EstimateHeaderTxt__">Costumer Name
                        <h5 className="BoldDescText__">Leslie Alexander</h5></p>
                        <p className="EstimateHeaderTxt__">Adress
                            <h5 className="BoldDescText__">11 West 53 Street, <br/>
                            Manhattan</h5></p><span className="PushLine__"><p className="EstimateHeaderTxt__2__">Distance
                               <h5 className="BoldDescText__2__"> 6.3 km</h5></p></span>
                    </table>
                </div>
            </div>
            <div>
                <h4 className="Default_View_Text___">Default View</h4>
            </div>
            <div>
                <div className="TableCustomersBleBg__">
                    <img src={tab} className="blueBg__" />
                </div>
                <div className="TablesCustomerWhiteBg__">
                    <img src={vis} className="whiteBg__" />
                    <input type="button" onClick={addColumn} value="Add Column" className="AddColumn__" /><span><input type="text" placeholder="  &#xF002;    Search customer by name" className="SearchBox__" /></span>
                </div>
                <div className="dataTableInfos__">
                    <table className="displayTableInfos__">
                        <tr>
                            <th>Estimate</th>
                            <th>Customer Name</th>
                            <th>Software Followup</th>
                            <th>Status</th>
                            <th>Estimate Date</th>
                        </tr>
                        <tr>
                        <td align="center">mmmm</td>
                        <td align="center">mmmm</td>
                        <td align="center">mmm</td>
                        <td align="center">mm</td>
                        <td align="center">mm</td>
                        </tr>
                        <tr>
                        <td align="center">mmmm</td>
                        <td align="center">mmmm</td>
                        <td align="center">mmm</td>
                        <td align="center">mm</td>
                        <td align="center">mm</td>
                        </tr>
                        <tr>
                        <td align="center">mmmm</td>
                        <td align="center">mmmm</td>
                        <td align="center">mmm</td>
                        <td align="center">mm</td>
                        <td align="center">mm</td>
                        </tr>
                        <tr>
                        <td align="center">mmmm</td>
                        <td align="center">mmmm</td>
                        <td align="center">mmm</td>
                        <td align="center">mm</td>
                        <td align="center">mm</td>
                        </tr>
                    </table>
                </div>
                <div className="actionDropDown__">
                    <p className="DropDownEx__">Action&nbsp;&nbsp;<select className="ComBoBox__"><option> What do you want to do?</option></select></p>
                </div>
                <div>
                    <table border="0" width="100%">
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;