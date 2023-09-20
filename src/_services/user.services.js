import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const userServices = {
  addUser,
  getUser
}

function addUser(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
};
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.USER}`, requestOptions).then(response => response);
}


function getUser() {
  const extraHeaders = {
      "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);

  return fetch(`${apiEndPoint.USER_SEARCH}`, requestOptions).then(response => response.json());
}

