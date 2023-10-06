import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const cloudElementServices = {
  addCloudElement,
  getCloudElement,
  getAutoSssociate,
  getAllCloudElement,
  getAutoSssociateLambda,
  getAutoSssociateS3
}

function addCloudElement(data) {
  
}


function getAutoSssociateLambda() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.GET_AUTO_SSOCIATE_LAMBDA}`, requestOptions).then(response => response.json());
}

function getAutoSssociateS3() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.GET_AUTO_SSOCIATE_S3}`, requestOptions).then(response => response.json());
}

function getAutoSssociate(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.GET_AUTO_SSOCIATE}/${data.newAutoSssociate.orgId}/cloud/${data.newAutoSssociate.cloud}`, requestOptions).then(response => response.json());
}

function getCloudElement(data) {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const promises = []; 

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
        const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
        let uniqueIdCounter = 0;
        function generateUniqueId() {
          return `row-${uniqueIdCounter++}`;
        }
        promises.push(
          fetch(`${apiEndPoint.INFRA_DISCOVERY_API + "?"}${queryString}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              data.id = generateUniqueId();
              return data;
            })
        );
      });
    }
  }
  return Promise.all(promises);
}



function getAllCloudElement() {
  const extraHeaders = {
    "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
  return fetch(`${apiEndPoint.CLOUD_ELEMENT}`, requestOptions).then(response => response.json());
}

