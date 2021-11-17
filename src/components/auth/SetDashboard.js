import React, { useEffect, useState } from "react";

import { Form, Upload, Button, message, Select } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import arrow from "../../images/arrow.png";
import upload from "../../images/upload.png";
import arrowDwon from "../../images/chevron-down.png";
import dollor from "../../images/dollor.png";
import timezone from "../../images/timezone.png";

import { signup } from "../../api/auth";
import { fileToBase64 } from "../../utils/fileBase64";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function SetDashboard() {
  const location = useLocation();
  const [redirect, setRedirect] = useState(null);
  useEffect(() => {
    console.log("history: ", location);
    if (!location.state) {
      setRedirect("/auth/sign-up");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup({});
    console.log("result: ", result);
  };

  const handleFileUpload = async (file) => {
    const result = await fileToBase64(file);
    console.log("result: ", result);
    return result;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
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
        <Form.Item className="mb-3">
          <label className="ant-label-login">
            Upload Profile Image <small>(max. 5MB)</small>
          </label>
          <Upload
            {...props}
            size="large"
            className="d-block upload-input"
            onChange={(e) => console.log("event: ", e)}
          >
            <Button
              className="w-100 text-start"
              icon={<img src={upload} alt="" />}
            >
              <span>
                Upload file <small>(i.e. png, jpg)</small>
              </span>
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item className="mb-3">
          <label className="ant-label-login">
            Upload Company Logo <small>(max. 5MB)</small>
          </label>
          <Upload {...props} size="large" className="d-block upload-input">
            <Button
              className="w-100 text-start"
              icon={<img src={upload} alt="" />}
            >
              <span>
                Upload file <small>(i.e. png, jpg)</small>
              </span>
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item className="mb-3">
          <label className="ant-label-login">Select Currency</label>
          <div className="position-relative">
            <div className="dollor-icon">
              <img src={dollor} alt="" />
            </div>
            <Select
              size="large"
              defaultValue="Select Currency"
              onChange={handleChange}
              suffixIcon={<img src={arrowDwon} alt="" />}
              className="ant-select-box"
            >
              <Option value="usd">USD</Option>
              <Option value="inr">Inr</Option>
              <Option value="euro">Euro</Option>
            </Select>
          </div>
        </Form.Item>
        <Form.Item className="mb-5">
          <label className="ant-label-login">Select Timezone</label>
          <div className="position-relative">
            <div className="dollor-icon">
              <img src={timezone} alt="" />
            </div>
            <Select
              size="large"
              defaultValue="Choose a City"
              onChange={handleChange}
              suffixIcon={<img src={arrowDwon} alt="" />}
              className="ant-select-box"
            >
              <Option value="Etc/GMT+12">
                (GMT-12:00) International Date Line West
              </Option>
              <Option value="Pacific/Midway">
                (GMT-11:00) Midway Island, Samoa
              </Option>
              <Option value="Pacific/Honolulu">(GMT-10:00) Hawaii</Option>
              <Option value="US/Alaska">(GMT-09:00) Alaska</Option>
              <Option value="America/Los_Angeles">
                (GMT-08:00) Pacific Time (US & Canada)
              </Option>
              <Option value="America/Tijuana">
                (GMT-08:00) Tijuana, Baja California
              </Option>
              <Option value="US/Arizona">(GMT-07:00) Arizona</Option>
              <Option value="America/Chihuahua">
                (GMT-07:00) Chihuahua, La Paz, Mazatlan
              </Option>
              <Option value="US/Mountain">
                (GMT-07:00) Mountain Time (US & Canada)
              </Option>
              <Option value="America/Managua">
                (GMT-06:00) Central America
              </Option>
              <Option value="US/Central">
                (GMT-06:00) Central Time (US & Canada)
              </Option>
              <Option value="America/Mexico_City">
                (GMT-06:00) Guadalajara, Mexico City, Monterrey
              </Option>
              <Option value="Canada/Saskatchewan">
                (GMT-06:00) Saskatchewan
              </Option>
              <Option value="America/Bogota">
                (GMT-05:00) Bogota, Lima, Quito, Rio Branco
              </Option>
              <Option value="US/Eastern">
                (GMT-05:00) Eastern Time (US & Canada)
              </Option>
              <Option value="US/East-Indiana">
                (GMT-05:00) Indiana (East)
              </Option>
              <Option value="Canada/Atlantic">
                (GMT-04:00) Atlantic Time (Canada)
              </Option>
              <Option value="America/Caracas">
                (GMT-04:00) Caracas, La Paz
              </Option>
              <Option value="America/Manaus">(GMT-04:00) Manaus</Option>
              <Option value="America/Santiago">(GMT-04:00) Santiago</Option>
              <Option value="Canada/Newfoundland">
                (GMT-03:30) Newfoundland
              </Option>
              <Option value="America/Sao_Paulo">(GMT-03:00) Brasilia</Option>
              <Option value="America/Argentina/Buenos_Aires">
                (GMT-03:00) Buenos Aires, Georgetown
              </Option>
              <Option value="America/Godthab">(GMT-03:00) Greenland</Option>
              <Option value="America/Montevideo">(GMT-03:00) Montevideo</Option>
              <Option value="America/Noronha">(GMT-02:00) Mid-Atlantic</Option>
              <Option value="Atlantic/Cape_Verde">
                (GMT-01:00) Cape Verde Is.
              </Option>
              <Option value="Atlantic/Azores">(GMT-01:00) Azores</Option>
              <Option value="Africa/Casablanca">
                (GMT+00:00) Casablanca, Monrovia, Reykjavik
              </Option>
              <Option value="Etc/Greenwich">
                (GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon,
                London
              </Option>
              <Option value="Europe/Amsterdam">
                (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
              </Option>
              <Option value="Europe/Belgrade">
                (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
              </Option>
            </Select>
          </div>
        </Form.Item>
        <Button type="submit" className="ant-btn-save" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default SetDashboard;
