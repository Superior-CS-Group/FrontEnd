import React from 'react';
import './Home.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import logo2 from './logo2.svg';


const Register = () =>{
    return(
        <div className="mainPage">
            <div align="center" className="WelcomeTextArea">
                <p className="IntroText">Welcome to <font color="#1A73E8">ONE PERCENT SOFTWARE</font></p>
            </div>
            <div className="loginArea">
                <div align="center">
                <img src={logo2} className="HomeLogo" alt="logo" />
                </div>
                <div className="headerLoginArea">
                   <h2><b>Sign Up</b></h2>
                   <p className="labelText">Username or email</p>
                   <input type="text" placeholder="  &#xF007; Username / email" className="inputText" />
                   <p className="labelText">Company </p>
                   <input type="text" placeholder="  &#xF007; Company Name" className="inputText" />
                   <p className="labelText">Password</p>
                   <input type="password" placeholder="  &#xF023; Password" className="inputText" />
                   <p className="labelText">Confirm Password</p>
                   <input type="password" placeholder="  &#xF023; Confirm Password" className="inputText" />
                    <div>
                    </div>
                    <div>
                    <input type ="submit" value="Sign Up" className="LoginBtn"/>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Register;