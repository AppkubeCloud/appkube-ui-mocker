import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const businessElementServices = {
  addBusinessElement,
  getBusinessElement
}

function addBusinessElement(data) {
  console.log("object",JSON.stringify(data))
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.BUSINSS_ELEMENT}`, requestOptions).then(response => response);
}


function getBusinessElement(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = "";
    if (data) {
        if (data.moduleId) {
            url += `${url ? '&' : '?'}moduleId=${data.moduleId}`;
        }
          
    }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.BUSINSS_ELEMENT_SEARCH}${url}`, requestOptions).then(response => response.json());
}

