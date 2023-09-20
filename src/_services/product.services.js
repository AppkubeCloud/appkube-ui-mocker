import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const productServices = {
  addProduct,
  getProduct
}

function addProduct(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.PRODUCT}`, requestOptions).then(response => response);
}


function getProduct(data) {
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
          
    }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.PRODUCT_SEARCH}${url}`, requestOptions).then(response => response.json());
}

