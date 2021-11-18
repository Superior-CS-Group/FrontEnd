import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as customerService from "../../services/customerService";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import logo2 from "./logo2.svg"



import './styles.css'
const genderItems = [
    
]

const initialFValues = {
  
    CustomerId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function FollowUpForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        
        if ('CustomerId' in fieldValues)
            temp.CustomerId = fieldValues.CustomerId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            customerService.insertCustomer(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
                    <div>
                    <h1 className="follow_">
                        Setup Followup Schedule
                        </h1>
                        <hr></hr>
                        </div>

                        <div>

                    <Controls.Select
                        name="CustomerId"
                        label="Choose Template"
                        value={values.CustomerId}
                        onChange={handleInputChange}
                        options={customerService.getTemplateCollection()}
                        error={errors.CustomerId}
                        className="template_"
                        
                    />
                    </div>

                 <div>
                    <Controls.RadioGroup
                    name="gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderItems}
                />
                </div>

                <div>
                <Controls.Select
                    name="CustomerId"
                    label="Text Subject"
                    value={values.CustomerId}
                    onChange={handleInputChange}
                    options={customerService.getTemplateCollection()}
                    error={errors.CustomerId}

                />
                </div>

                   {/* <Controls.DatePicker
                        name="hireDate"
                        label="Schedule a follow up"
                        value={values.hireDate}
                        onChange={handleInputChange}
                        className="choose_date"
                   />  */}
              
            
                        


                    
                    <h2 >

                    <div align="center">
                    <img src={logo2} className="HomeLogo" alt="logo" />
                   
                      
                    <p>"Good Time of day, morning, afternoon etc], [Customer Name], 
                    we are just checking in if you are still wanting to proceed with the 
                    landscaping/pool project you reached out to us about?"</p>
                    </div>
                 

              </h2>
              <div>
                        <Controls.Button
                            type="Follow up"
                            text="Submit" 
                            className="follow_button"
                            />
                        <Controls.Button
                            text="Cancel"
                            color="default"
                            onClick={resetForm} 
                            className="cancel_followUp"
                            />
                            
                    </div>
            
        </Form>
    )
}
