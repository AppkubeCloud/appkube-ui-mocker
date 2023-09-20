import { status } from '../_constants';
import { businessElementServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const businessElementAction = {
    addBusinessElement,
    getBusinessElement
};


function addBusinessElement(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_business_element_status: status.IN_PROGRESS,
                create_business_element: null
            }
        }));
        businessElementServices.addBusinessElement(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_business_element_status: status.SUCCESS,
                                create_business_element: response
                            }
                        }));
                        alert.success("Save business element Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_business_element_status: status.FAILURE,
                                create_business_element: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_business_element_status: status.FAILURE,
                            create_business_element: error
                        }
                    }));
                    alert.error(error);
                }
            );
    };
}
function getBusinessElement(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                business_element_status: status.IN_PROGRESS,
                business_element_list: null
            }
        }));

        businessElementServices.getBusinessElement(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                business_element_status: status.SUCCESS,
                                business_element_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                business_element_status: status.FAILURE,
                                business_element_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            business_element_status: status.FAILURE,
                            business_element_list: error
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