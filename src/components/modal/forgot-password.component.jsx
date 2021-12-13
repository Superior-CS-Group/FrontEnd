import { React, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { resetPassword } from "../../api/user";

export default function ForgotPassword(props) {
  // console.log(props);
  const [state, setState] = useState({
    email: "",
    message: "",
    errors: {},
    isModalForgot: false,
  });

  const validateFields = () => {
    const errors = {};
    if (!state.email) {
      errors.email = "Email id  is required";
      message.error(errors.email, 5);
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };
  const resetPasswordHandle = async (event) => {
    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 5);
      return;
    }
    const { email } = state;
    const body = {
      email,
    };
    console.log(body);

    try {
      const responseData = await resetPassword(body);

      if (responseData.errors) {
        message.error("Email does not exists", 5);
      } else {
        setState({
          ...state,
          email: "",
        });
      }
      console.log(responseData.errors, "responseData.errors");
      if (responseData.remote === "success") {
        setState({ email: "" });
        message.success(
          "Reset Password link sent  to your registered email id"
        );
        props.handleCancel();
      }
    } catch (error) {
      console.log("error", error);

      setState({
        ...state,
        message: error.response?.data?.errors,
      });
    }
  };
  const handleAllChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errors: [],
    });
  };

  return (
    <>
      <Modal
        className="modal-radius"
        title="Forgot Password"
        visible={props.isModalForgot}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input
              name="email"
              type="email"
              value={state.email}
              onChange={handleAllChange}
            />
          </Form.Item>

          <div className="text-right">
            <Button onClick={props.handleCancel} className="radius-30 me-3">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={resetPasswordHandle}
              className="radius-30"
            >
              Send
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
