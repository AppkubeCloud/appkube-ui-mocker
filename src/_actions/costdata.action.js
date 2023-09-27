import { status } from '../_constants';
import { costDataGeneratorServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const costDataGeneratorAction = {
    addCostDataGenerator,
    getCostDataGenerator
};

function addCostDataGenerator(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_cost_data_status: status.IN_PROGRESS,
                create_cost_data: null
            }
        }));
        costDataGeneratorServices.addCostDataGenerator(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_cost_data_status: status.SUCCESS,
                                create_cost_data: response
                            }
                        }));
                        alert.success("Save cost data Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_cost_data_status: status.FAILURE,
                                create_cost_data: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_cost_data_status: status.FAILURE,
                            create_cost_data: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getCostDataGenerator(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                cost_data_status: status.IN_PROGRESS,
                cost_data_list: null
            }
        }));

        costDataGeneratorServices.getCostDataGenerator(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               cost_data_status: status.SUCCESS,
                               cost_data_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               cost_data_status: status.FAILURE,
                               cost_data_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           cost_data_status: status.FAILURE,
                           cost_data_list: error
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