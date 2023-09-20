import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const organizationServices = {
  addOrganization,
  getOrganization
}

function addOrganization(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
};
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.ORGANIZARION}`, requestOptions).then(response => response);
}


function getOrganization() {
  const extraHeaders = {
      "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);

  return fetch(`${apiEndPoint.ORGANIZARION}`, requestOptions).then(response => response.json());
}

