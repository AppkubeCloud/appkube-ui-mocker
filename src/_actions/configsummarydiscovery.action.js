import { status } from '../_constants';
import { configSummaryDiscoveryServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const configSummaryDiscoveryAction = {
    addConfigSummaryDiscovery,
    getConfigSummaryDiscovery,
    getAllConfigSummaryDiscovery
};

function addConfigSummaryDiscovery(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_config_summary_discovery_status: status.IN_PROGRESS,
                create_config_summary_discovery: null
            }
        }));
        configSummaryDiscoveryServices.addConfigSummaryDiscovery(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_config_summary_discovery_status: status.SUCCESS,
                                create_config_summary_discovery: response
                            }
                        }));
                        alert.success("Save App Config Successful");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_config_summary_discovery_status: status.FAILURE,
                                create_config_summary_discovery: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_config_summary_discovery_status: status.FAILURE,
                            create_config_summary_discovery: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getConfigSummaryDiscovery(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                config_summary_discovery_status: status.IN_PROGRESS,
                config_summary_discovery_list: null
            }
        }));

        configSummaryDiscoveryServices.getConfigSummaryDiscovery(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               config_summary_discovery_status: status.SUCCESS,
                               config_summary_discovery_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               config_summary_discovery_status: status.FAILURE,
                               config_summary_discovery_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           config_summary_discovery_status: status.FAILURE,
                           config_summary_discovery_list: error
                        }
                    }));
                    alert.error(error);
                }
            );
    };
}


function getAllConfigSummaryDiscovery(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                config_summary_discovery_status: status.IN_PROGRESS,
                config_summary_discovery_list: null
            }
        }));

        configSummaryDiscoveryServices.getAllConfigSummaryDiscovery(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               config_summary_discovery_status: status.SUCCESS,
                               config_summary_discovery_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               config_summary_discovery_status: status.FAILURE,
                               config_summary_discovery_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           config_summary_discovery_status: status.FAILURE,
                           config_summary_discovery_list: error
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