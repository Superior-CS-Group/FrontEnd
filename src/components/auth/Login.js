import React, { Component } from "react";

import InputField from "../inputField/inputField.component";
import { Formik } from "formik";
import { Form, Button, Checkbox } from "antd";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import lock from "../../images/lock.png";
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const responseGoogle = (response) => {
  console.log(response);
};
export default class Login extends Component {
  render() {
    return (
      <>
        <div className="login-heading mb-2">
          <h1 className="mb-0">Log In</h1>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = <span>Required</span>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} layout="vertical">
              <InputField
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<img src={user} alt="" />}
                placeholder="Username/Email"
                label="Email Address"
                type="text"
                name="email"
                dclass="ant-icon-space mb-3"
              />

              {errors.email && touched.email && errors.email}

              <InputField
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<img src={lock} alt="" />}
                placeholder="password"
                label="Password"
                type="password"
                name="password"
                dclass="ant-icon-space mb-0"
              />
              {errors.password && touched.password && errors.password}
              <Form.Item className="ant-remember mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <Checkbox onChange={onChange} className="mt-2">
                    Remember me next time
                  </Checkbox>
                  <Link to="/forgot" className="forgot">
                    Forgot Password?
                  </Link>
                </div>
              </Form.Item>
              <Form.Item className="mb-0">
                <div className="v-line">
                  <span>Or</span>
                </div>
              </Form.Item>
              <Form.Item className="mb-3">
                <h2 className="mb-0 text-center text-sign">Sign Up </h2>
              </Form.Item>
              <div className="ant-social-icon text-center">
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button className="mb-3 " onClick={renderProps.onClick}>
                      Google
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                <button className="facebook-icon mb-4">Facebook</button>
              </div>
              <Link to="/auth/sign-up">
                <Button type="primary" type="submit" className="ant-btn-save">
                  Sign In
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
