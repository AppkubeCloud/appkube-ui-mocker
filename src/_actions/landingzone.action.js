import { status } from '../_constants';
import {landingzoneServices } from '../_services';

import { alert, commonFunctions } from '../_utilities';

export const landingzoneAction = {
    addLandingzone,
    getLandingzone
};
function addLandingzone(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_landingzone_status: status.IN_PROGRESS,
                create_landingzone: null
            }
        }));
        landingzoneServices.addLandingzone(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_landingzone_status: status.SUCCESS,
                                create_landingzone: response
                            }
                        }));
                        alert.success("Save landingzone Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_landingzone_status: status.FAILURE,
                                create_landingzone: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_landingzone_status: status.FAILURE,
                            create_landingzone: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getLandingzone(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                landingzone_status: status.IN_PROGRESS,
                landingzone_list: null
            }
        }));

        landingzoneServices.getLandingzone(data)
            .then(
                response => {
                    if (response) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                landingzone_status: status.SUCCESS,
                                landingzone_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                landingzone_status: status.FAILURE,
                                landingzone_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            landingzone_status: status.FAILURE,
                            landingzone_list: error
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