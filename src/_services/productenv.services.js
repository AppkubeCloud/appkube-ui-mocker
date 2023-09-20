import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const productEnvServices = {
  addProductEnv,
  getProductEnv
}

function addProductEnv(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.PRODUCT_ENV}`, requestOptions).then(response => response);
}


function getProductEnv(data) {
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

  }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);

  return fetch(`${apiEndPoint.PRODUCT_ENV_SEARCH}${url}`, requestOptions).then(response => response.json());
}

