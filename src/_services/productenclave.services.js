import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const productEnclaveServices = {
  addproductEnclave,
  getproductEnclave,
  getproductEnclaveSearch
}

function addproductEnclave(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.PRODUCT_ENV}`, requestOptions).then(response => response);
}


function getproductEnclave(data) {
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
function getproductEnclaveSearch() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.PRODUCT_ENV_GET}`, requestOptions).then(response => response.json());
}



