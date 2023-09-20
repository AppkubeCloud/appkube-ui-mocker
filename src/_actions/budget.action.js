import { status } from '../_constants';
import {budgetServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const budgetAction = {
    addBudget,
    getBudget
};
function addBudget(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_budget_status: status.IN_PROGRESS,
                create_budget: null
            }
        }));
        budgetServices.addBudget(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_budget_status: status.SUCCESS,
                                create_budget: response
                            }
                        }));
                        alert.success("Save budget Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_budget_status: status.FAILURE,
                                create_budget: response
                            }
                        }));
                        alert.error("Internal server error");

                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_budget_status: status.FAILURE,
                            create_budget: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getBudget(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                budget_status: status.IN_PROGRESS,
                budget_list: null
            }
        }));

        budgetServices.getBudget(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               budget_status: status.SUCCESS,
                               budget_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               budget_status: status.FAILURE,
                               budget_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           budget_status: status.FAILURE,
                           budget_list: error
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