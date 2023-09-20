import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import "simplebar/dist/simplebar.min.css";
import '../../assets/login.css';
import Tooltip from "@material-ui/core/Tooltip";
import '../../assets/newEmployee.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OnBoardingFormData from '../../_json/OnBoardingForm';
import { alert } from '../../_utilities';
import { constantErr } from "../../Constant";
import { Container } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { businessElementAction, departmentAction, moduleAction, organizationAction, productAction, productEnvAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'
class BusinessElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            department: "",
            product: "",
            productEnv: "",
            orgList: [],
            productList: [],
            productEnvList: [],
            isSubmitted: false,
            businessElementCloumn: [
                {
                    field: 'departmentId', headerName: 'Department', width: 160,
                },
                {
                    field: 'productId', headerName: 'Product', width: 160,
                },
                {
                    field: 'productEnvId', headerName: 'Product Env', width: 160,
                },
                {
                    field: 'moduleId', headerName: 'Module', width: 160,
                },
                {
                    field: 'serviceName', headerName: 'Business Element', width: 160,
                }
            ],
            rowData: []
        };
    }

    handleStateChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    };

    handleOrgChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
        this.props.dispatch(departmentAction.getDepartment({ organizationId: value }))
    };

    handleDepChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

        this.props.dispatch(productAction.getProduct({ departmentId: value }))
    };

    handleProductChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        this.props.dispatch(productEnvAction.getProductEnv({ productId: value }))
    }
    hadleProductEnvChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        this.props.dispatch(moduleAction.getModule({ productEnvId: value }))
    }




    validateBusinessElement = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            product: validObj,
            productEnv: validObj,
            module: validObj,
            businessElement: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { product, module, productEnv, businessElement } = this.state;
            if (!product) {
                retData.product = {
                    isValid: false,
                    message: alert.error(constantErr.PRODUCT)
                };
                isValid = false;
            }
            if (!productEnv) {
                retData.productEnv = {
                    isValid: false,
                    message: alert.error(constantErr.PRODUCT_ENV)
                };
                isValid = false;
            }
            if (!module) {
                retData.module = {
                    isValid: false,
                    message: alert.error(constantErr.MODULE)
                };
                isValid = false;
            }
            if (!businessElement) {
                retData.businessElement = {
                    isValid: false,
                    message: alert.error(constantErr.BUSSINESS_ELEMENT)
                };
                isValid = false;
            }
        }
        retData.isValid = isValid;
        return retData;
    };



    handleBusinessElement = async (event) => {
        const { productEnv, product, module, department, businessElement } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateBusinessElement(true);
        if (newErrorData.isValid) {
            var newBusinessElement = {
                "departmentId": department,
                "productId": product,
                "productEnvId": productEnv,
                "moduleId": module,
                "serviceName": businessElement,
                "serviceNature": "",
                "serviceType": ""
            };
            this.props.dispatch(businessElementAction.addBusinessElement(newBusinessElement));
        }
    }

    componentDidMount = () => {
        this.props.dispatch(organizationAction.getOrganization({}))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.organization_status !== prevProps.organization_status && this.props.organization_status == status.SUCCESS) {
            if (this.props.organization_list && this.props.organization_list.length > 0) {
                this.setState({
                    orgList: this.props.organization_list
                })
            }
        }
        if (this.props.department_status !== prevProps.department_status && this.props.department_status == status.SUCCESS) {

            if (this.props.department_list && this.props.department_list.length > 0) {
                this.setState({
                    depList: this.props.department_list
                })
            }
        }
        if (this.props.product_status !== prevProps.product_status && this.props.product_status == status.SUCCESS) {
            if (this.props.product_list && this.props.product_list.length > 0) {
                this.setState({
                    productList: this.props.product_list
                })
            }
        }
        if (this.props.product_env_status !== prevProps.product_env_status && this.props.product_env_status == status.SUCCESS) {
            if (this.props.product_env_list && this.props.product_env_list.length > 0) {
                this.setState({
                    productEnvList: this.props.product_env_list
                })
            }
        }
        if (this.props.module_status !== prevProps.module_status && this.props.module_status == status.SUCCESS) {
            if (this.props.module_list && this.props.module_list.length > 0) {
                this.setState({
                    moduleList: this.props.module_list
                })
            }
        }
        if (this.props.business_element_status !== prevProps.business_element_status && this.props.business_element_status == status.SUCCESS) {
            if (this.props.business_element_list && this.props.business_element_list.length > 0) {
                this.setState({
                    businessElementList: this.props.business_element_list
                })
            }
        }
    }

    refreshBuniessElement = () => {
        this.props.dispatch(businessElementAction.getBusinessElement({}))
    }



    render() {
        const { orgList, businessElementCloumn } = this.state;


        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.business_element.map(businessElementDeatils => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {businessElementDeatils.business_element_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                businessElementDeatils.fields.map(fieldsData => {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group form-group-common">
                                                                                                {
                                                                                                    fieldsData.html_element === "textbox" ?
                                                                                                        <>
                                                                                                            <label className="d-block">{fieldsData.lable}</label>
                                                                                                            <input type={fieldsData.html_element} name={fieldsData.name} required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                                                                                placeholder="" className="form-control" />
                                                                                                        </>
                                                                                                        : fieldsData.html_element === "email" ?
                                                                                                            <>
                                                                                                                <label className="d-block">{fieldsData.lable}</label>
                                                                                                                <input type={fieldsData.html_element} name={fieldsData.name} required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                                                                                    placeholder="" className="form-control" />
                                                                                                            </> : fieldsData.html_element === "select" && fieldsData.name === "organization" ?
                                                                                                                <>
                                                                                                                    <label className="d-block">{fieldsData.lable}</label>
                                                                                                                    <FormControl className="select">
                                                                                                                        <NativeSelect name={fieldsData.name} onChange={this.handleOrgChange} >
                                                                                                                            <option value="">-Select-</option>
                                                                                                                            {orgList && orgList.map((optionData) => (
                                                                                                                                <option key={optionData.id} value={optionData.id}>
                                                                                                                                    {optionData.name}
                                                                                                                                </option>
                                                                                                                            ))}
                                                                                                                        </NativeSelect>
                                                                                                                    </FormControl>
                                                                                                                </> : fieldsData.html_element === "select" && fieldsData.name === "department" ?
                                                                                                                    <>
                                                                                                                        <label className="d-block">{fieldsData.lable}</label>
                                                                                                                        <FormControl className="select">
                                                                                                                            <NativeSelect name={fieldsData.name} onChange={this.handleDepChange} >
                                                                                                                                <option value="">-Select-</option>
                                                                                                                                {this.props.department_list && this.props.department_list.map((optionData) => (
                                                                                                                                    <option key={optionData.id} value={optionData.id}>
                                                                                                                                        {optionData.name}
                                                                                                                                    </option>
                                                                                                                                ))}
                                                                                                                            </NativeSelect>
                                                                                                                        </FormControl>
                                                                                                                    </> :
                                                                                                                    fieldsData.html_element === "select" && fieldsData.name === "product" ?
                                                                                                                        <>
                                                                                                                            <label className="d-block">{fieldsData.lable}</label>
                                                                                                                            <FormControl className="select">
                                                                                                                                <NativeSelect name={fieldsData.name} onChange={this.handleProductChange} >
                                                                                                                                    <option value="">-Select-</option>
                                                                                                                                    {this.props.product_list && this.props.product_list.map((optionData) => (
                                                                                                                                        <option key={optionData.id} value={optionData.id}>
                                                                                                                                            {optionData.name}
                                                                                                                                        </option>
                                                                                                                                    ))}
                                                                                                                                </NativeSelect>
                                                                                                                            </FormControl>
                                                                                                                        </> : fieldsData.html_element === "select" && fieldsData.name === "productEnv" ?
                                                                                                                            <>
                                                                                                                                <label className="d-block">{fieldsData.lable}</label>
                                                                                                                                <FormControl className="select">
                                                                                                                                    <NativeSelect name={fieldsData.name} onChange={this.hadleProductEnvChange} >
                                                                                                                                        <option value="">-Select-</option>
                                                                                                                                        {this.props.product_env_list && this.props.product_env_list.map((optionData) => (
                                                                                                                                            <option key={optionData.id} value={optionData.id}>
                                                                                                                                                {optionData.name}
                                                                                                                                            </option>
                                                                                                                                        ))}
                                                                                                                                    </NativeSelect>
                                                                                                                                </FormControl>
                                                                                                                            </> : fieldsData.html_element === "select" && fieldsData.name === "module" ?
                                                                                                                                <>
                                                                                                                                    <label className="d-block">{fieldsData.lable}</label>
                                                                                                                                    <FormControl className="select">
                                                                                                                                        <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                                                                                            <option value="">-Select-</option>
                                                                                                                                            {this.props.module_list && this.props.module_list.map((optionData) => (
                                                                                                                                                <option key={optionData.id} value={optionData.id}>
                                                                                                                                                    {optionData.name}
                                                                                                                                                </option>
                                                                                                                                            ))}
                                                                                                                                        </NativeSelect>
                                                                                                                                    </FormControl>
                                                                                                                                </> : ''
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Container className="mt-4" >
                                                                    <Tooltip title="Save">
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleBusinessElement}>
                                                                            <SaveAsIcon className="mr-2" /> Save
                                                                        </Button>
                                                                    </Tooltip>
                                                                </Container>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className="main-content">
                        <div className="vendor-content">
                            <div className="d-flex">
                                <h4>Business Element Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshBuniessElement}>
                                    <i className="fa fa-refresh"></i>
                                </Button>
                            </div>
                            <div className="mt-3" style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={this.props.business_element_list != null && this.props.business_element_list}
                                    columns={businessElementCloumn}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
function mapStateToProps(state) {
    const { organization_status, organization_list, department_status, department_list, product_status, product_list, product_env_status, product_env_list, module_list, business_element_status, module_status, business_element_list } = state.hr;
    return {
        organization_status,
        organization_list,
        department_status,
        department_list,
        product_status,
        product_list,
        product_env_status,
        product_env_list,
        module_list,
        module_status,
        business_element_list,
        business_element_status
    };
}

const connectedBusinessElement = connect(mapStateToProps)(BusinessElement);
export default connectedBusinessElement;
