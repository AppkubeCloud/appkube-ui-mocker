import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const cloudElementServices = {
  addCloudElement,
  getCloudElement,
  getAllCloudElement
}

function addCloudElement(data) {
//   const extraHeaders = {
//     "Content-Type": "application/json"
// };
//   const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
//   return fetch(`${apiEndPoint.ORGANIZARION}`, requestOptions).then(response => response);
}


function getCloudElement(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = "";
  if (data.newPenv) {
    if (data.newPenv.organizationId) {
      url += `${url ? '&' : '?'}organizationId=${data.newPenv.organizationId}`;
    }
    if (data.newPenv.departmentId) {
      url += `${url ? '&' : '?'}departmentId=${data.newPenv.departmentId}`;
    }
    if (data.newPenv.landingZone) {
      url += `${url ? '&' : '?'}landingZone=${data.newPenv.landingZone}`;
    }
    if (data.newPenv.elementType) {
      url += `${url ? '&' : '?'}elementType=${data.newPenv.elementType}`;
    }
    if (data.newPenv.awsRegion) {
      url += `${url ? '&' : '?'}awsRegion=${data.newPenv.awsRegion}`;
    }
  }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.PRODUCT_ENV_SEARCH}${url}`, requestOptions).then(response => response.json());
}


function getAllCloudElement() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.CLOUD_ELEMENT}`, requestOptions).then(response => response.json());
}

