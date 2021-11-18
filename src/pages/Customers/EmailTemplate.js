/*import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/customerService";


import './styles.css'
const genderItems = [
    
]

const initialFValues = {
  
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmailTemplate() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
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
            employeeService.insertEmployee(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={6}>
                   
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Setup Followup Schedule"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                        className="Main_"
                    />
            
                 
                    <textarea
                      placeholder="“Hey [Customer name]! [Salesperson] here with [Company Name]. 
                      I am excited to let you know that I just sent over the estimate for the project we were discussing. Could you confirm you received it?”"
                      className="message"
                      name="message"
                      className="body_text"
                    />

                </Grid>
            </Grid>
        </Form>
    )
} */