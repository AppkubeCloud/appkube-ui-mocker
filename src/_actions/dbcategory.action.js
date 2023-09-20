import { status } from '../_constants';
import {dbCategoryServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const dbCategoryAction = {
    addDbCategory,
    getDbCategory
};
function addDbCategory(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                db_category_status: status.IN_PROGRESS,
                db_category: null
            }
        }));
        dbCategoryServices.addDbCategory(data)
            .then(
                response => {
                    if (response.status === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                db_category_status: status.SUCCESS,
                                db_category: response
                            }
                        }));
                        alert.success("Save db category Successfully");
                        
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                db_category_status: status.FAILURE,
                                db_category: response
                            }
                        }));
                        alert.error("Internal server error");

                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            db_category_status: status.FAILURE,
                            db_category: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


function getDbCategory(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
               db_category_status: status.IN_PROGRESS,
               db_category_list: null
            }
        }));

        dbCategoryServices.getDbCategory(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                              db_category_status: status.SUCCESS,
                              db_category_list: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                              db_category_status: status.FAILURE,
                              db_category_list: response
                            }
                        }));
                        alert.error(response);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                          db_category_status: status.FAILURE,
                          db_category_list: error
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