import { status } from '../_constants';
import { organizationServices } from '../_services';
import { alert } from '../_utilities';

export const organizationAction = {
    addOrganization,
    getOrganization
};
function addOrganization(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_organization_status: status.IN_PROGRESS,
                create_organization: null
            }
        }));
        organizationServices.addOrganization(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_organization_status: status.SUCCESS,
                                create_organization: response
                            }
                        }));
                        alert.success("Save organization Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_organization_status: status.FAILURE,
                                create_organization: response
                            }
                        }));
                        alert.error("internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_organization_status: status.FAILURE,
                            create_organization: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getOrganization(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                organization_status: status.IN_PROGRESS,
                organization_list: null
            }
        }));

        organizationServices.getOrganization(data)
            .then(
                response => {
                    if (response) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                organization_status: status.SUCCESS,
                                organization_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                organization_status: status.FAILURE,
                                organization_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            organization_status: status.FAILURE,
                            organization_list: error
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