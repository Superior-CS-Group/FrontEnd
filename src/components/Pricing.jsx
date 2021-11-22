import React from 'react'
import './pricing.css'

import logo2 from './images/logo2.svg'



function pricing() {
    return (
        <div className="pricing-table-container">
       


        <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <img src ={logo2}/>
          </div>
          <div className="topRight">
           
          <h1 className="plans">Choose Your Plan Below.</h1>
          </div>
        </div>
      </div>





        <div className="pricing-header">

            <div className="plans-switch-container">
                <input type="checkbox" className="plans-switch"/>
                <span className="monthly">Monthly</span>
                <span className="yearly">Yearly</span>
            </div>
        </div>


        <div className="pricing-table">
            <div className="table">
                <div className="content">
                    <h3>Free or forever</h3>

                   

                    <div className="description">
                      
                    </div>

                    <ul className="features">
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    </ul>

                    <a href="#" className="btn">Try for free</a>
                </div>

                <img className="table-bg" src="images/bg-shape1.svg" alt=""/>
            </div>



            <div className="table best-value">

                <span className="value"></span>

                <div className="content">
                    <h3>Best!</h3>

                    <div className="price-container">
                        <span className="price professional-price">$24</span>
                        <span className="plan-duration">/ month</span>
                    </div>

                    <div className="description">
                    </div>

                    <ul className="features">
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    </ul>

                    <a href="#" className="btn">Regular license</a>
                </div>

                <img className="table-bg" src="images/bg-shape2.svg" alt=""/>
            </div>

          

            <div className="table">
                <div className="content">
                    <h3>Corporate</h3>

                    <div className="price-container">
                        <span className="price business-price">$12</span>
                        <span className="plan-duration">/ month/ Employee</span>
                    </div>

                    <div className="description">
                       
                    </div>

                    <ul className="features">
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    <li>Lorem ipsum dolor sit amet,</li>
                    </ul>

                    <a href="#" className="btn">Extended License</a>
                </div>

                <img className="table-bg" src="images/bg-shape1.svg" alt=""/>
            </div>
        </div>
    </div>
    )
}

export default pricing
