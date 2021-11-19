import axios from "axios";
// http://digimonk.net:1629/api
// http://localhost:5001/api
const baseURL = "http://localhost:5001/api";
const axiosInstance = async () => {
  const instance = axios.create({
    baseURL: baseURL,
  });
  return instance;
};

const parseResponse = (response) => {
  const data = JSON.parse(response);
  console.log("data: ", data);
  if (data?.errors) {
    return {
      remote: "failure",
      error: {
        errors: data.errors,
      },
    };
  }
  return {
    remote: "success",
    data: data,
  };
};

const request = async (config) => {
  try {
    const token = localStorage.getItem("auth-token");
    const instance = await axiosInstance();
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers["Authorization"] = token;
    const response = await instance.request({
      ...config,
      transformResponse: (res) => {
        console.log("beforeResp: ", res);
        const resp = parseResponse(res);
        console.log("resppp: ", resp);
        return resp.remote === "success" ? resp.data : resp;
      },
    });
    console.log("resqu: ", response, response.data);
    return {
      remote: "success",
      data: response.data,
    };
  } catch (error) {
    if (error) {
      if (error.response) {
        const axiosError = error;
        if (axiosError.response?.data) {
          let errorMessage = axiosError.response.data.errors;
          if (axiosError.response.status === 500) {
            errorMessage = "Internal Server Error";
          } else if (axiosError.response.status === 401) {
            errorMessage = "Forbiden";
          } else {
            errorMessage = error.response.data.error.errors;
          }
          return {
            remote: "failure",
            errors: {
              status: axiosError.response.status,
              errors: errorMessage,
            },
          };
        }
      }
    } else {
      const axiosError = error;
      let errorMessage = axiosError.message;
      if (errorMessage === "Network Error") {
        errorMessage = "No internet connection";
      }
      return {
        remote: "failure",
        errors: {
          errors: errorMessage,
        },
      };
    }
    throw error;
  }
};
const toExport = {
  request,
  parseResponse,
};

export default toExport;
