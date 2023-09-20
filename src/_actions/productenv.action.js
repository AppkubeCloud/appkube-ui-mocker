import { status } from '../_constants';
import { productEnvServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const productEnvAction = {
    addProductEnv,
    getProductEnv
};

function addProductEnv(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_product_env_status: status.IN_PROGRESS,
                create_product_env: null
            }
        }));
        productEnvServices.addProductEnv(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_product_env_status: status.SUCCESS,
                                create_product_env: response
                            }
                        }));
                        alert.success("Save product env Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_product_env_status: status.FAILURE,
                                create_product_env: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_product_env_status: status.FAILURE,
                            create_product_env: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getProductEnv(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                product_env_status: status.IN_PROGRESS,
                product_env_list: null
            }
        }));

        productEnvServices.getProductEnv(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               product_env_status: status.SUCCESS,
                               product_env_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               product_env_status: status.FAILURE,
                               product_env_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           product_env_status: status.FAILURE,
                           product_env_list: error
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