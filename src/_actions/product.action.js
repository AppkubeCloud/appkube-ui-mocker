import { status } from '../_constants';
import { onboardingServices } from '../_services';
import { productServices } from '../_services/product.services';
import { alert, commonFunctions } from '../_utilities';

export const productAction = {
    addProduct,
    getProduct
};
function addProduct(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_product_status: status.IN_PROGRESS,
                create_product: null
            }
        }));
        productServices.addProduct(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_product_status: status.SUCCESS,
                                create_product: response
                            }
                        }));
                        alert.success("Save product Successfully");
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_product_status: status.FAILURE,
                                create_product: response
                            }
                        }));
                        alert.error("Internal server error");
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_product_status: status.FAILURE,
                            create_product: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getProduct(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                product_status: status.IN_PROGRESS,
                product_list: null
            }
        }));

        productServices.getProduct(data)
            .then(
                response => {
                    if (response) {

                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                product_status: status.SUCCESS,
                                product_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                product_status: status.FAILURE,
                                product_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            product_status: status.FAILURE,
                            product_list: error
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