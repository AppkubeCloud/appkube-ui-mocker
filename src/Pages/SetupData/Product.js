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
import OnBoardingFormData from '../../_json/OnBoardingForm';
import { alert } from '../../_utilities';
import { constantErr } from "../../Constant";
import { Container } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { departmentAction, organizationAction, productAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            department: "",
            product: "",
            orgList: [],
            productList: [],
            isSubmitted: false,
            productCloumn: [
                {
                    field: 'organizationId', headerName: 'Organization', flex: 1,
                },
                {
                    field: 'organizationName', headerName: 'organization Name', flex: 1
                },
                {
                    field: 'departmentId', headerName: 'Department Id', flex: 1,
                },
                {
                    field: 'departmentName', headerName: 'department Name', flex: 1,
                },
                {
                    field: 'name', headerName: 'Product', flex: 1,
                }
            ],
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



    validateProduct = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            organization: validObj,
            department: validObj,
            product: validObj,
            department: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { organization, department, product } = this.state;
            if (!organization) {
                retData.organization = {
                    isValid: false,
                    message: alert.error(constantErr.ORGANIZATION)
                };
                isValid = false;
            }
            if (!product) {
                retData.product = {
                    isValid: false,
                    message: alert.error(constantErr.PRODUCT)
                };
                isValid = false;
            }
            if (!department) {
                retData.department = {
                    isValid: false,
                    message: alert.error(constantErr.DEPARTMENT)
                };
                isValid = false;
            }
        }
        retData.isValid = isValid;
        return retData;
    };


    handleProduct = async (event) => {
        const { organization, department, product } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateProduct(true);
        if (newErrorData.isValid) {
            var newProduct = {
                "name": product,
                "type": "",
                "organizationId": organization,
                "departmentId": department,
            };
            this.props.dispatch(productAction.addProduct(newProduct));
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
    }

    refreshProduct = () => {
        this.props.dispatch(productAction.getProduct({}))
    }


    render() {
        const { orgList, productCloumn } = this.state;
        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.product.map(productEnv => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {productEnv.product_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                productEnv.fields.map(fieldsData => {
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
                                                                                                                            <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                                                                                <option value="">-Select-</option>
                                                                                                                                {this.props.department_list && this.props.department_list.map((optionData) => (
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleProduct}>
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
                                <h4>Product Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshProduct}>
                                    <i className="fa fa-refresh"></i>
                                </Button>
                            </div>
                            <div className="mt-3" style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={this.props.product_list != null && this.props.product_list}
                                    columns={productCloumn}
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
    const { organization_status, organization_list, department_status, department_list, product_status, product_list } = state.hr;
    return {
        organization_status,
        organization_list,
        department_status,
        department_list,
        product_status,
        product_list,
    };
}

const connectedProduct = connect(mapStateToProps)(Product);
export default connectedProduct;
