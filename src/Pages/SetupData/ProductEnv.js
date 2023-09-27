import React, { Component } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { DatePicker } from "@y0c/react-datepicker";
import "simplebar/dist/simplebar.min.css";
import '../../assets/login.css';
import Tooltip from "@material-ui/core/Tooltip";
import '../../assets/newEmployee.css'
import OnBoardingFormData from '../../_json/OnBoardingForm';
import { alert } from '../../_utilities';
import { constantErr } from "../../Constant";
import { Container } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { departmentAction, organizationAction, productAction, productEnvAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { stringify } from 'csv-stringify/lib/sync';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
class ProductEnv extends Component {
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
            productEnvCloumn: [
                {
                    field: 'organizationName', headerName: 'Organization Name', flex: 1
                },
                {
                    field: 'departmentName', headerName: 'Department Name', flex: 1,
                },
                {
                    field: 'productId', headerName: 'Product', flex: 1,
                },
                {
                    field: 'name', headerName: 'Product Env', flex: 1,
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

    handleDepChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

        this.props.dispatch(productAction.getProduct({ departmentId: value }))
    };

    validateProductEnv = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            product: validObj,
            productEnv: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { product, department, productEnv } = this.state;
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
        }
        retData.isValid = isValid;
        return retData;
    };

    handleProductEnv = async (event) => {
        const { productEnv, department, product } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateProductEnv(true);
        if (newErrorData.isValid) {
            var newProductEnv = {
                "productId": product,
                "name": productEnv
            };
            this.props.dispatch(productEnvAction.addProductEnv(newProductEnv));
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

    }

    refreshProductEnv = () => {
        this.props.dispatch(productEnvAction.getProductEnv({}))
    }
    exportToExcel = () => {
        if (this.props.product_env_list && this.props.product_env_list.length > 0) {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = 'product_env';
            const ws = XLSX.utils.json_to_sheet(this.props.product_env_list);
            const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            saveAs(data, fileName + fileExtension);
            alert.success("Export To Excel Successfully");
        }
        else {
            alert.error("Please refresh a table");
        }
    };
    exportToCSV = () => {
        if (this.props.product_env_list && this.props.product_env_list.length > 0) {
            const fileName = 'product_env.csv';
            const csvData = stringify(this.props.product_env_list != null && this.props.product_env_list, { header: true });

            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, fileName);
            alert.success("Export To CSV Successfully");
        }
        else {
            alert.error("Please refresh a table");
        }
    };

    render() {
        const { orgList, productEnvCloumn } = this.state;


        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.product_env.map(productEnvDeatils => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {productEnvDeatils.product_env_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                productEnvDeatils.fields.map(fieldsData => {
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
                                                                                                                                <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                                                                                    <option value="">-Select-</option>
                                                                                                                                    {this.props.product_list && this.props.product_list.map((optionData) => (
                                                                                                                                        <option key={optionData.id} value={optionData.id}>
                                                                                                                                            {optionData.name}
                                                                                                                                        </option>
                                                                                                                                    ))}
                                                                                                                                </NativeSelect>
                                                                                                                            </FormControl>
                                                                                                                        </> : fieldsData.html_element === "date" ?
                                                                                                                            <>
                                                                                                                                <label className="d-block">{fieldsData.lable}</label>
                                                                                                                                <DatePicker name={fieldsData.name} onChange={this.handleDOB} placeholder={fieldsData.placeholder} />
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleProductEnv}>
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
                                <h4>Product Env Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshProductEnv}>
                                    <i className="fa fa-refresh"></i>
                                </Button>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.exportToExcel}>
                                    <ArrowDownwardIcon className="mr-2" /> Export to Excel
                                </Button>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.exportToCSV}>
                                    <ArrowDownwardIcon className="mr-2" />Export to CSV
                                </Button>
                            </div>
                            <div className="mt-3" style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={this.props.product_env_list != null && this.props.product_env_list}
                                    columns={productEnvCloumn}
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
    const { organization_status, organization_list, department_status, department_list, product_status, product_list, product_env_status, product_env_list, module_list, module_status } = state.hr;
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
        module_status
    };
}

const connectedProductEnv = connect(mapStateToProps)(ProductEnv);
export default connectedProductEnv;

