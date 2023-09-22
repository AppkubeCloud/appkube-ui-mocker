import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const configSummaryDiscoveryServices = {
  addConfigSummaryDiscovery,
  getConfigSummaryDiscovery,
  getAllConfigSummaryDiscovery
}

function addConfigSummaryDiscovery(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.PRODUCT_ENV}`, requestOptions).then(response => response);
}


function getConfigSummaryDiscovery(data) {
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
  return fetch(`${apiEndPoint.INFRA_DISCOVERY_API}${url}`, requestOptions).then(response => response.json());
}
function getAllConfigSummaryDiscovery() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.CONFIG_SUMMERY_DISCOVERY}`, requestOptions).then(response => response.json());
}



