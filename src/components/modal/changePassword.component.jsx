import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updatePassword } from "../../api/user";
export default function ChangePasswordUser(props) {
  console.log(props);
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    message: "",
    errors: {},
    isModalForgot:false
  });

  const validateFields = () => {
    const errors = {};
    if (!state.password) {
      errors.password = "New Password is required";
      message.error(errors.password, 5);
    }
    if (!state.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      message.error(errors.confirmPassword, 5);
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };
  const changePasswordHandle = async (event) => {
    event.preventDefault();
    setState({ ...state, errors: {} });
    const { errors, isValid } = validateFields();
    if (!isValid) {
      setState({ ...state, errors });
      // message.success(errors, 5);
      return;
    }
    // console.log(props.userId);
    // console.log(state.password);
    // console.log(state.confirmPassword);
    if (state.password !== state.confirmPassword) {
      message.error("New Password or Confirm Password not match");
    }
    const { password, confirmPassword } = state;
    const body = {
      id: props.userId,
      password,
      confirmPassword,
    };
    try {
      const responseData = await updatePassword(body);
      if (responseData.remote === "success") {
        setState({ password: "", confirmPassword: "" });
        message.success("New Password Updated");
        props.handleCancel();
      }
    } catch (error) {
      console.log("error", error, error.response);

      setState({
        ...state,
        message: error.response?.data?.errors,
        isLoading: false,
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
        title="Reset Password"
        visible={props.isModalShow}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
        changePasswordHandle={props.changePasswordHandle}
      >
        <Form layout="vertical">
          <Form.Item label="New Password">
            <Input
              name="password"
              type="password"
              value={state.password}
              onChange={handleAllChange}
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input
              name="confirmPassword"
              type="password"
              value={state.confirmPassword}
              onChange={handleAllChange}
            />
          </Form.Item>
          <div className="text-right">
            <Button onClick={props.handleCancel} className="radius-30 me-3">
              Cancel
            </Button>
            <Button
              type="primary"
              className="radius-30"
              onClick={changePasswordHandle}
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
