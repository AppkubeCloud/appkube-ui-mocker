import { status } from '../_constants';
import { securityOrganizationServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const securityOrganizationAction = {
    addSecurityOrganization,
    pushCmdSecurityOrganization,
    getSecurityOrganization   
};
function addSecurityOrganization(data){
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_security_organization_status: status.IN_PROGRESS,
                create_security_organization: null
            }
        }));
        securityOrganizationServices.addSecurityOrganization(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_security_organization_status: status.SUCCESS,
                                create_security_organization: response
                            }
                        }));
                        alert.success("Save organization Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_security_organization_status: status.FAILURE,
                                create_security_organization: response
                            }
                        }));
                        alert.error("internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_security_organization_status: status.FAILURE,
                            create_security_organization: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function pushCmdSecurityOrganization(data){
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                push_security_organization_status: status.IN_PROGRESS,
                push_security_organization: null
            }
        }));
        securityOrganizationServices.pushCmdSecurityOrganization(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                push_security_organization_status: status.SUCCESS,
                                push_security_organization: response
                            }
                        }));
                        alert.success("Save organization push to cmdb Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                push_security_organization_status: status.FAILURE,
                                push_security_organization: response
                            }
                        }));
                        alert.error("internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            push_security_organization_status: status.FAILURE,
                            push_security_organization: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getSecurityOrganization(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                security_organization_status: status.IN_PROGRESS,
                security_organization_list: null
            }
        }));

        securityOrganizationServices.getSecurityOrganization(data)
            .then(
                response => {
                    if (response) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                security_organization_status: status.SUCCESS,
                                security_organization_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                security_organization_status: status.FAILURE,
                                security_organization_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            security_organization_status: status.FAILURE,
                            security_organization_list: error
                        }
                    }));
                    alert.error(error);
                }
            );
    };
}

function dispatchFunction(data) {
    return {
        type: data.type,
        data: data.data
    };
}