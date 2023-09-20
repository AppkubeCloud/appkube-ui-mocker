import { status } from '../_constants';
import { authServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const tabAction = {
    add,
    //logOut
};

function add(data, tabName) {

    return {

        type: status.SUCCESS,
        data: {
            tab_Data: {
                tabs: data,
                currentTab: tabName
            },
        }
    }

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