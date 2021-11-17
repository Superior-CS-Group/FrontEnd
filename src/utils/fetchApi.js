import axios from "axios";
const SERVER_URL = "http://digimonk.net:1629/api";

export const getData = async (api, data) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${SERVER_URL}/${api}`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data
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
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data
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
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data
    });
    return result;
  } catch (error) {
    return error;
  }
};
