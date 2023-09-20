import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const moduleServices = {
  addModule,
  getModule
}

function addModule(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.MODULE}`, requestOptions).then(response => response);
}


function getModule(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = "";
  if (data) {
    if (data.organizationId) {
      url += `${url ? '&' : '?'}organizationId=${data.organizationId}`;
    }
    if (data.departmentId) {
      url += `${url ? '&' : '?'}departmentId=${data.departmentId}`;
    }
    if (data.productId) {
      url += `${url ? '&' : '?'}productId=${data.productId}`;
    }
    if (data.productEnvId) {
      url += `${url ? '&' : '?'}productEnvId=${data.productEnvId}`;
    }
  }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);

  return fetch(`${apiEndPoint.MODULE_SEARCH}${url}`, requestOptions).then(response => response.json());
}

