import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const costDataGeneratorServices = {
  addCostDataGenerator,
  getCostDataGenerator
}

function addCostDataGenerator(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.COST_DATA_GENERATOR}`, requestOptions).then(response => response);
}


function getCostDataGenerator(data) {
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
    if (data.startDate) {
      url += `${url ? '&' : '?'}startDate=${data.startDate}`;
    }
    if (data.endDate) {
      url += `${url ? '&' : '?'}endDate=${data.endDate}`;
    }

  }
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);

  return fetch(`${apiEndPoint.COST_DATA_GENERATOR}${url}`, requestOptions).then(response => response.json());
}

