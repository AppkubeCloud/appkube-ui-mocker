import { status } from '../_constants';
import { moduleServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const moduleAction = {
    addModule,
    getModule
};
function addModule(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_module_status: status.IN_PROGRESS,
                create_module: null
            }
        }));
        moduleServices.addModule(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_module_status: status.SUCCESS,
                                create_module: response
                            }
                        }));
                        alert.success("Save module Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_module_status: status.FAILURE,
                                create_module: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_module_status: status.FAILURE,
                            create_module: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getModule(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                module_status: status.IN_PROGRESS,
                module_list: null
            }
        }));

        moduleServices.getModule(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               module_status: status.SUCCESS,
                               module_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               module_status: status.FAILURE,
                               module_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           module_status: status.FAILURE,
                           module_list: error
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