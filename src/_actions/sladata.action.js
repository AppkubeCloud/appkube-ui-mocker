import { status } from '../_constants';
import { slaDataGeneratorSearvices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const slaDataGeneratorAction = {
    addSlaDataGenerator,
    getSlaDataGenerator
};

function addSlaDataGenerator(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_sla_data_status: status.IN_PROGRESS,
                create_sla_data: null
            }
        }));
        slaDataGeneratorSearvices.addSlaDataGenerator(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_sla_data_status: status.SUCCESS,
                                create_sla_data: response
                            }
                        }));
                        alert.success("Save sla data Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_sla_data_status: status.FAILURE,
                                create_sla_data: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_sla_data_status: status.FAILURE,
                            create_sla_data: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getSlaDataGenerator(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                sla_data_status: status.IN_PROGRESS,
                sla_data_list: null
            }
        }));

        slaDataGeneratorSearvices.getSlaDataGenerator(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               sla_data_status: status.SUCCESS,
                               sla_data_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               sla_data_status: status.FAILURE,
                               sla_data_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           sla_data_status: status.FAILURE,
                           sla_data_list: error
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