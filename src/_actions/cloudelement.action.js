import { status } from '../_constants';
import { cloudElementServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const cloudElementAction = {
    addCloudElement,
    getCloudElement,
    getAllCloudElement,
    getAutoSssociate,
};

function addCloudElement(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_cloud_element_status: status.IN_PROGRESS,
                create_cloud_element: null
            }
        }));
        cloudElementServices.addCloudElement(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_cloud_element_status: status.SUCCESS,
                                create_cloud_element: response
                            }
                        }));
                        alert.success("Save cloud element  Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_cloud_element_status: status.FAILURE,
                                create_cloud_element: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_cloud_element_status: status.FAILURE,
                            create_cloud_element: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getCloudElement(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                cloud_element_status: status.IN_PROGRESS,
                cloud_element_list: null
            }
        }));

        cloudElementServices.getCloudElement(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               cloud_element_status: status.SUCCESS,
                               cloud_element_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               cloud_element_status: status.FAILURE,
                               cloud_element_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           cloud_element_status: status.FAILURE,
                           cloud_element_list: error
                        }
                    }));
                    alert.error(error);
                }
            );
    };
}

function getAutoSssociate(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                cloud_element_status: status.IN_PROGRESS,
                cloud_element_list: null
            }
        }));

        cloudElementServices.getAutoSssociate(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               cloud_element_status: status.SUCCESS,
                               cloud_element_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               cloud_element_status: status.FAILURE,
                               cloud_element_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           cloud_element_status: status.FAILURE,
                           cloud_element_list: error
                        }
                    }));
                    alert.error(error);
                }
            );
    };
}

function getAllCloudElement(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                cloud_element_status: status.IN_PROGRESS,
                cloud_element_list: null
            }
        }));

        cloudElementServices.getAllCloudElement(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               cloud_element_status: status.SUCCESS,
                               cloud_element_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               cloud_element_status: status.FAILURE,
                               cloud_element_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           cloud_element_status: status.FAILURE,
                           cloud_element_list: error
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