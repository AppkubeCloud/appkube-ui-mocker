import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const securityOrganizationServices = {
  addSecurityOrganization,
  pushCmdSecurityOrganization,
  getSecurityOrganization
}

function addSecurityOrganization(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = "";
  url += `${url ? '&' : '?'}pushToCmdb=${data.pushToCmdb}`;
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.SECURITY_ORGANIZARION}${url}`, requestOptions).then(response => response);
}


function getSecurityOrganization() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
console.log("requestOptions",requestOptions)
  return fetch(`${apiEndPoint.SECURITY_ORGANIZARION_SEARCH}`, requestOptions).then(response => response.json());
}

function pushCmdSecurityOrganization(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, null);

  return fetch(`${apiEndPoint.SECURITY_ORGANIZARION_PUSH_CMDB}/${data.id}`, requestOptions).then(response => response.json());
}


