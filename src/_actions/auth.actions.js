import { status } from '../_constants';
import { authServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const authActions = {
    login,
    //logOut
};

function login(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                user_login_status: status.IN_PROGRESS,
                user: null
            }
        }));
        authServices.login(data)
            .then(
                response => {
                    if (response.Status == true) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                user_login_status: status.SUCCESS,
                                user: response
                            }
                        }));
                        localStorage.setItem("userData", JSON.stringify(response.UserData[0]));
                        alert.success(response.Message);
                        setTimeout(() => {
                            window.location.href = "/postlogin/dashboard";
                        }, 500);
                    } else {

                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                user_login_status: status.FAILURE,
                                user: response
                            }
                        }));
                        alert.error(response.Message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            user_login_status: status.FAILURE,
                            user: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


// function logOut() {
//     commonFunctions.onLogout();
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: authConstants.USER_LOGOUT,
//             data: null
//         }));
//     };
// }

function dispatchFunction(data) {
    // if (data.data && data.data.code === 401) {
    //     commonFunctions.onLogout();
    //     return {
    //         type: authConstants.USER_LOGOUT,
    //         data: null
    //     };
    // }
    return {
        type: data.type,
        data: data.data
    };
}