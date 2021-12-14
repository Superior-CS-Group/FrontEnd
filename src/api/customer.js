import api from "./api";

export async function updateCustomerDetails(data) {
  const response = await api.request({
    url: "/customer/update-info",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}

export async function isExistsLeadEmail(email) {
  console.log("email; ", email);
  const response = await api.request({
    url: `/customer/is-exist-lead-email?email=${email}`,
    method: "GET",
  });
  console.log("response: ", response);

  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: true,
    };
  }
  return {
    remote: response.remote,
    data: false,
  };
}


export async function getDistance(data) {
  const response = await api.request({
    url: "/customer/google-address",
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: response.remote,
      data: response.data,
    };
  }
  return response;
}