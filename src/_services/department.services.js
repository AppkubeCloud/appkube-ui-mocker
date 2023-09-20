import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const departmentServices = {
  addDepartment,
  getDepartment
}

function addDepartment(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.DEPARTMENT}`, requestOptions).then(response => response);
}


function getDepartment(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = "";
    if (data) {
        if (data.organizationId) {
            url += `${url ? '&' : '?'}organizationId=${data.organizationId}`;
        }
          
    }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.DEPARTMENT_SEAFRCH}${url}`, requestOptions).then(response => response.json());
}

