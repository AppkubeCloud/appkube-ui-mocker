import { status } from '../_constants';
import { departmentServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const departmentAction = {
    addDepartment,
    getDepartment
};
function addDepartment(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_department_status: status.IN_PROGRESS,
                create_department: null
            }
        }));
        departmentServices.addDepartment(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_department_status: status.SUCCESS,
                                create_department: response
                            }
                        }));
                        alert.success("Save department Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_department_status: status.FAILURE,
                                create_department: response
                            }
                        }));
                        alert.error("Internal server error");

                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_department_status: status.FAILURE,
                            create_department: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getDepartment(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                department_status: status.IN_PROGRESS,
                department_list: null
            }
        }));

        departmentServices.getDepartment(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                department_status: status.SUCCESS,
                                department_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                department_status: status.FAILURE,
                                department_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            department_status: status.FAILURE,
                            department_list: error
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