import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const dbCategoryServices = {
  addDbCategory,
  getDbCategory
}

function addDbCategory(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
  return fetch(`${apiEndPoint.DB_CATEGORY}`, requestOptions).then(response => response);
}


function getDbCategory(data) {
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
  return fetch(`${apiEndPoint.DB_CATEGORY_SEARCH}${url}`, requestOptions).then(response => response.json());
}

