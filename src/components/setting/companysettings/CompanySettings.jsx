import React, { useEffect, useState } from "react";
import BreadcrumbBar from "../../breadcrumb/Breadcrumb.pages";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import UploadFile from "./card/uploadFile.component";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

import {
  getOrganizationDetails,
  updateOrganizationDetails,
} from "../../../api/organization.js";

export default function CompanySettings() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    coverPhoto: "",
    logo: "",
    teamPhoto: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();

  const getAddressObject = (address_components) => {
    console.log(address_components);
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5",
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4",
      ],
      country: ["country"],
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      console.log("addressObject", addressObject);
      setAddressObj(addressObject);
    };
    func();
  }, [address]);

  const getUserOrganization = async () => {
    const details = await getOrganizationDetails();
    if (details.remote === "success") {
      setCompanyDetails(details.data);
    }
  };

  useEffect(() => {
    getUserOrganization();
  }, []);

  const handleChange = (value, name) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleRemove = (value, name) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    setIsLoading(true);
    // console.log(address.label, "addressxxxxxxx");

    const key = "updatable";
    message.loading({ content: "Saving...", key });
    const body = {
      name: companyDetails.name,
      address: address.label,
      phoneNumber: companyDetails.phoneNumber,
      logo: companyDetails.logo,
      teamPhoto: companyDetails.teamPhoto,
      estimationCoverPhoto: companyDetails.coverPhoto,
    };
    // console.log("body: ", body);
    if (!body.name) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }
    const response = await updateOrganizationDetails(body);
    if (response.remote === "success") {
      message.success({
        content: "Company Details Updated successfully",
        key,
        duration: 2,
      });
    } else {
      message.error({
        content: "Something went wrong",
        key,
        duration: 2,
      });
    }
    setIsLoading(false);
  };

  const layout = [
    {
      id: "logo",
      title: "Logo Upload",
      size: "109 x 234",
      image: companyDetails.logo,
    },
    {
      id: "coverPhoto",
      title: "Cover photo Upload",
      size: "1600 x 500",
      image: companyDetails.coverPhoto,
    },
    {
      id: "teamPhoto",
      title: "Meet The Team",
      size: "	6016 x 4016",
      image: companyDetails.teamPhoto,
    },
  ];
  return (
    <>
      <BreadcrumbBar
        name="Dashboard"
        subname="Settings"
        subtitle="Company Settings"
        link="/"
        sublink="#"
        breaclass="mb-3"
      />

      <Row gutter={[24, 0]}>
        <Col lg={12} className="mb-3">
          <Card bordered={false} className="radius-12 h-100">
            <Form layout="vertical">
              <Row gutter={[24, 0]}>
                <Col lg={24}>
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      size="large"
                      placeholder="Enter Company Name"
                      name="name"
                      value={companyDetails.name}
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.name)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item label="Address">
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyBC9O1b8JhFyUiE2kAU-ULbcio2siKePYU"
                      selectProps={{
                        isClearable: true,
                        value: address,
                        onChange: (val) => {
                          setAddress(val);
                        },
                      }}
                    />
                    <Input
                      type="text"
                      size="large"
                      placeholder="Enter Company Address"
                      name="address"
                      value={companyDetails.address}
                      // onChange={(e) =>
                      //   handleChange(e.target.value, e.target.name)
                      // }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        {layout.map((item, index) => {
          return (
            <Col lg={12} className="mb-3" key={index}>
              <UploadFile
                id={item.id}
                title={item.title}
                size={item.size}
                image={item.image}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            </Col>
          );
        })}
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Row>

      {/* <h1>Address</h1>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBC9O1b8JhFyUiE2kAU-ULbcio2siKePYU"
        selectProps={{
          isClearable: true,
          value: address,
          onChange: (val) => {
            setAddress(val);
          },
        }}
      />
      <pre style={{ textAlign: "left", background: "#f0f0f0", padding: 20 }}>
        {JSON.stringify(addressObj, 0, 2)}
      </pre> */}
    </>
  );
}
