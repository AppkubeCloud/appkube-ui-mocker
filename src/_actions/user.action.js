import { status } from '../_constants';
import { userServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const userAction = {
    addUser,
    getUser
};
function addUser(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_user_status: status.IN_PROGRESS,
                create_user: null
            }
        }));
        userServices.addUser(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_user_status: status.SUCCESS,
                                create_user: response
                            }
                        }));
                        alert.success("Save user Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_user_status: status.FAILURE,
                                create_user: response
                            }
                        }));
                        alert.error("internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_user_status: status.FAILURE,
                            create_user: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getUser(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                user_status: status.IN_PROGRESS,
                user_list: null
            }
        }));

        userServices.getUser(data)
            .then(
                response => {
                    if (response) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                user_status: status.SUCCESS,
                                user_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                user_status: status.FAILURE,
                                user_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            user_status: status.FAILURE,
                            user_list: error
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