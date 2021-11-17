import React, { useState, useEffect } from "react";
import InputField from "../inputField/inputField.component";
import user from "../../images/user.png";
import { Form, Input, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import arrow from "../../images/arrow.png";
import company from "../../images/company.png";
import lock from "../../images/lock.png";
import { signUpStepOneSchema } from "../../validators/auth/auth.validator";
function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(null);

  const handleAllChange = (e) => {
    console.log("e.target: ", e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const { isValid, errors } = signUpStepOneSchema(form);
    if (!isValid) {
      console.log("errors: ", errors);
      setErrors(errors);
    } else {
      setRedirect("/auth/set-dashboard");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} state={{ ...form }} />;
  }

  return (
    <>
      <div className="login-heading mb-4">
        <h1 className="mb-0 text-center position-relative">
          <Link to="/auth" className="ant-arrow">
            <img src={arrow} alt="" />
          </Link>{" "}
          Sign Up
        </h1>
      </div>
      <Form>
        <InputField
          icon={<img src={user} alt="" />}
          placeholder="Username / Email"
          label="Email Address"
          type="text"
          name="email"
          dclass="ant-icon-space mb-3"
          onChange={handleAllChange}
        />
        <div role="alert" class="text-danger">
          {errors.email}
        </div>
        <InputField
          value=""
          icon={<img src={company} alt="" />}
          placeholder="Company Name"
          label="company"
          type="text"
          name="companyName"
          dclass="ant-icon-space mb-3"
          onChange={handleAllChange}
        />

        <div role="alert" class="text-danger">
          {errors.companyName}
        </div>
        <Form.Item className="mb-3">
          <label className="ant-label-login">Password</label>
          <Input.Password
            size="large"
            className="ant-login-input"
            prefix={<img src={lock} alt="" />}
            placeholder="Password"
            name="password"
            onChange={handleAllChange}
          />
          <div role="alert" class="text-danger">
            {errors.password}
          </div>
        </Form.Item>
        <Form.Item className="mb-5">
          <label className="ant-label-login">Confirm Password</label>
          <Input.Password
            size="large"
            className="ant-login-input"
            prefix={<img src={lock} alt="" />}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleAllChange}
          />
          <div role="alert" class="text-danger">
            {errors.confirmPassword}
          </div>
        </Form.Item>

        <Button type="submit" className="ant-btn-save" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default SignUp;
