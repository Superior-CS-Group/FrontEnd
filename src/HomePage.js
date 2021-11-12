import React from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import logo2 from './logo2.svg';


const HomePage = () => {
    return (
        <div className="mainPage">
            <div align="center" className="WelcomeTextArea">
                <p className="IntroText">Welcome to <font color="#1A73E8">ONE PERCENT SOFTWARE</font></p>
            </div>
            <div className="loginArea">
                <div align="center">
                    <img src={logo2} className="HomeLogo" alt="logo" />
                </div>
                <div className="headerLoginArea">
                    <h2><b>Log In</b></h2>
                    <p className="labelText">Username or email</p>
                    <input type="text" placeholder=" &#xF007; Username / email" className="inputText" />
                    <p className="labelText">Password</p>
                    <input type="password" placeholder=" &#xF023;  Password" className="inputText" />
                    <p><input type="checkbox" className="chekckBoxInput" /><font size="1" className="checkboxTxt">Remember Me</font><a href="https://google.com" className="fgPassUnderline">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Forgot Password</a></p>

                    <p />
                    <p />
                    <p align="center" className="SignUpText">Sign Up</p>
                    <div>
                        <input type="submit" value="Google" className="signUpChooseBtnClass" />
                        <input type="submit" value="Facebook" className="signUpChooseBtnClass" />
                    </div>
                    <div>
                        <input type="submit" value="Log In" className="LoginBtn" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;