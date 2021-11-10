import React from "react";
import { Form, Input } from "antd";

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type,
  name,
  dclass,
  showIcon,
}) {
  return (
    <>
      <Form.Item className={dclass}>
        <label className="ant-label-login">{label}</label>
        <Input
          id={label}
          //   value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          prefix={icon}
          size="large"
          className="ant-login-input"
          name=""
          suffix={showIcon}
        />
      </Form.Item>
    </>
  );
}
