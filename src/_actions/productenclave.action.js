import { status } from '../_constants';
import { productEnclaveServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const productEnclaveAction = {
    addproductEnclave,
    getproductEnclave
};

function addproductEnclave(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_product_enclave_status: status.IN_PROGRESS,
                create_product_enclave: null
            }
        }));
        productEnclaveServices.addproductEnclave(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_product_enclave_status: status.SUCCESS,
                                create_product_enclave: response
                            }
                        }));
                        alert.success("Save product enclave Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_product_enclave_status: status.FAILURE,
                                create_product_enclave: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_product_enclave_status: status.FAILURE,
                            create_product_enclave: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getproductEnclave(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                product_enclave_status: status.IN_PROGRESS,
                product_enclave_list: null
            }
        }));

        productEnclaveServices.getproductEnclave(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                               product_enclave_status: status.SUCCESS,
                               product_enclave_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                               product_enclave_status: status.FAILURE,
                               product_enclave_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                           product_enclave_status: status.FAILURE,
                           product_enclave_list: error
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