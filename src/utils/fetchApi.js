import axios from "axios";
import { SERVER_URL as backend_url } from "../config";
// const SERVER_URL = "http://digimonk.net:1629/api";
const SERVER_URL = backend_url;

export const getData = async (api, data) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${SERVER_URL}/${api}`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const postData = async (api, data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${SERVER_URL}/${api}`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const putData = async (api, data) => {
  try {
    const result = await axios({
      method: "put",
      url: `${SERVER_URL}/${api}`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
