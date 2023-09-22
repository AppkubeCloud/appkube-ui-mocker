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


// function getCloudElement(data) {
//   const extraHeaders = {
//     "Content-Type": "application/json"
//   };
//   let url = "";
//   if (data.newPenv) {
//     if (data.newPenv.organizationId) {
//       url += `${url ? '&' : '?'}organizationId=${data.newPenv.organizationId}`;
//     }
//     if (data.newPenv.departmentId) {
//       url += `${url ? '&' : '?'}departmentId=${data.newPenv.departmentId}`;
//     }
//     if (data.newPenv.landingZone) {
//       url += `${url ? '&' : '?'}landingZone=${data.newPenv.landingZone}`;
//     }
//     if (data.newPenv.elementType) {
//       url += `${url ? '&' : '?'}elementType=${data.newPenv.elementType}`;
//     }
//     if (data.newPenv.awsRegion) {
//       url += `${url ? '&' : '?'}awsRegion=${data.newPenv.awsRegion}`;
//     }
//   }
//   console.log("personName",data)
//   const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
//   return fetch(`${apiEndPoint.PRODUCT_ENV_SEARCH}${url}`, requestOptions).then(response => response.json());
// }

function getCloudElement(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  let url = ""
  if (data.newPenv) {
    if (data.newPenv.elementType && data.newPenv.elementType.length > 0) {
      data.newPenv.elementType.forEach(elementType => {
        const queryParams = [];

        if (data.newPenv.organizationId) {
          queryParams.push(`organizationId=${data.newPenv.organizationId}`);
        }
        if (data.newPenv.departmentId) {
          queryParams.push(`departmentId=${data.newPenv.departmentId}`);
        }
        if (data.newPenv.landingZone) {
          queryParams.push(`landingZone=${data.newPenv.landingZone}`);
        }
        queryParams.push(`elementType=${elementType}`);
        if (data.newPenv.awsRegion) {
          queryParams.push(`awsRegion=${data.newPenv.awsRegion}`);
        }

        const queryString = queryParams.join('&');
        // console.log("queryString",queryString)
        // const url = `/infra-discovery/organization/1/aws?${queryString}`;
        // console.log("queryParams", url);
        const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
        fetch(`${apiEndPoint.INFRA_DISCOVERY_API + "?"}${queryString}`, requestOptions).then(response => response.json());
      });
    }
  }

}


function getAllCloudElement() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.CLOUD_ELEMENT}`, requestOptions).then(response => response.json());
}

