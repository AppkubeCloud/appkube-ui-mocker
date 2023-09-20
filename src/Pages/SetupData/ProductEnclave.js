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
import { departmentAction, productEnclaveAction, organizationAction, landingzoneAction, productAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'


class ProductEnclave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            department: "",
            landingzone: "",
            region: "",
            elementType: "",
            orgList: [],
            landingZoneList: [],
            isSubmitted: false,
            productEnclaveCloumn: [
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
                    field: 'departmentName', headerName: 'Department Name', flex: 1,
                },
                {
                    field: 'landingZoneId', headerName: 'Landing Zone Id', flex: 1,
                },
                {
                    field: 'landingZone', headerName: 'Landing Zone', flex: 1,
                },
                {
                    field: 'instanceName', headerName: 'Instance Name', flex: 1,
                },
                {
                    field: 'instanceId', headerName: 'Instance Id', flex: 1,
                },

            ],
        };
    }

    handleStateChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    };

    handleDepChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

        this.props.dispatch(landingzoneAction.getLandingzone({ departmentId: value }))
    };

    handleOrgChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
        this.props.dispatch(departmentAction.getDepartment({ organizationId: value }))
    };



    validateProductEnclave = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            organization: validObj,
            department: validObj,
            landingzone: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { organization, department, landingzone } = this.state;
            if (!organization) {
                retData.organization = {
                    isValid: false,
                    message: alert.error(constantErr.ORGANIZATION)
                };
                isValid = false;
            }
            if (!landingzone) {
                retData.landingzone = {
                    isValid: false,
                    message: alert.error(constantErr.LANDING_ZONE)
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


    getProductEnclave = async (event) => {
        const { region, elementType, landingzone } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateProductEnclave(true);
        if (newErrorData.isValid) {
            var newPenv = {
                "landingZone": landingzone,
                "elementType": "vpc",
                "awsRegion": region
            };
            this.props.dispatch(productEnclaveAction.getproductEnclave({ newPenv }))
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
        if (this.props.landingzone_status !== prevProps.landingzone_status && this.props.landingzone_status == status.SUCCESS) {
            if (this.props.landingzone_list && this.props.landingzone_list.length > 0) {
                this.setState({
                    landingZoneList: this.props.landingzone_list
                })
            }
        }
        if (this.props.product_enclave_status !== prevProps.product_enclave_status && this.props.product_enclave_status == status.SUCCESS) {
            if (this.props.product_enclave_list && this.props.product_enclave_list.length > 0) {
                this.setState({
                    productEnclaveList: this.props.product_enclave_list
                })
            }
        }
    }

    refreshlandingZone = () => {
        // this.props.dispatch(landingzoneAction.getLandingzone({}))
    }


    render() {
        const { orgList, productEnclaveCloumn } = this.state;
        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.product_enclave.map(productEnclaveDeatils => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {productEnclaveDeatils.product_enclave_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                productEnclaveDeatils.fields.map(fieldsData => {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group form-group-common">
                                                                                                {
                                                                                                    fieldsData.html_element === "textbox" && fieldsData.name === "elementType" ?
                                                                                                        <>
                                                                                                            <label className="d-block">{fieldsData.lable}</label>
                                                                                                            <input type={fieldsData.html_element} name={fieldsData.name} value={"vpc"} disabled required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                                                                                placeholder="" className="form-control" />
                                                                                                        </>
                                                                                                        : fieldsData.html_element === "textbox" ?
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
                                                                                                                        </> : fieldsData.html_element === "select" && fieldsData.name === "landingzone" ?
                                                                                                                            <>
                                                                                                                                <label className="d-block">{fieldsData.lable}</label>
                                                                                                                                <FormControl className="select">
                                                                                                                                    <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                                                                                        <option value="">-Select-</option>
                                                                                                                                        {this.props.landingzone_list && this.props.landingzone_list.map((optionData) => (
                                                                                                                                            <option key={optionData.landingZone} value={optionData.landingZone}>
                                                                                                                                                {optionData.landingZone}
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.getProductEnclave}>
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
                                <h4>Product Enclave Table</h4>
                            </div>
                            <div className="mt-3" style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={this.props.product_enclave_list != null && this.props.product_enclave_list}
                                    columns={productEnclaveCloumn}
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
    const { organization_status, organization_list, department_status, department_list, landingzone_status, landingzone_list, product_enclave_list, product_enclave_status } = state.hr;
    return {
        organization_status,
        organization_list,
        department_status,
        department_list,
        landingzone_status,
        landingzone_list,
        product_enclave_list,
        product_enclave_status
    };
}

const connectedProductEnclave = connect(mapStateToProps)(ProductEnclave);
export default connectedProductEnclave;

