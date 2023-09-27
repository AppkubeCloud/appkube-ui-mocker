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
import IconButton from "@material-ui/core/IconButton";
import '../../assets/login.css';
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreIcon from '@mui/icons-material/More';
import '../../assets/newEmployee.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OnBoardingFormData from '../../_json/OnBoardingForm';
import { alert } from '../../_utilities';
import { constantErr } from "../../Constant";
import { Container } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { businessElementAction, departmentAction, moduleAction, organizationAction, productAction, productEnvAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../Table/table.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { stringify } from 'csv-stringify/lib/sync';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            department: "",
            orgList: [],
            isSubmitted: false,
            depCloumn: [
                {
                    field: 'organizationName', headerName: 'Organization Name', flex: 1
                },
                {
                    field: 'name', headerName: 'Department', flex: 1
                }
            ],
        };
    }
    handleColumnReorder = (newColumns) => {
        this.setState({ depCloumn: newColumns });
    };
    handleStateChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    };


    validateDep = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            organization: validObj,
            department: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { organization, department } = this.state;
            if (!organization) {
                retData.organization = {
                    isValid: false,
                    message: alert.error(constantErr.ORGANIZATION)
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

    handleDepartment = async (event) => {
        const { organization, department } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateDep(true);
        if (newErrorData.isValid) {
            console.log("ORG::::",organization)
            var newDepartment = {
                "organizationId": organization,
                "name": department
            };
            this.props.dispatch(departmentAction.addDepartment(newDepartment));
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
    }

    refreshDep = () => {
        this.props.dispatch(departmentAction.getDepartment({}))
    }

    exportToExcel = () => {
        if (this.props.department_list && this.props.department_list.length > 0) {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = 'department';
            const ws = XLSX.utils.json_to_sheet(this.props.department_list);
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
        if (this.props.department_list && this.props.department_list.length > 0) {
            const fileName = 'department.csv';
            const csvData = stringify(this.props.department_list != null && this.props.department_list, { header: true });

            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, fileName);
            alert.success("Export To CSV Successfully");
        }
        else {
            alert.error("Please refresh a table");
        }
    };


    render() {
        const { orgList, depCloumn } = this.state;


        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.department.map(parsonalDetails => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {parsonalDetails.department_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                parsonalDetails.fields.map(fieldsData => {
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
                                                                                                            </> : fieldsData.html_element === "select" ?
                                                                                                                <>
                                                                                                                    <label className="d-block">{fieldsData.lable}</label>
                                                                                                                    <FormControl className="select">

                                                                                                                        <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                                                                            <option value="">-Select-</option>
                                                                                                                            {
                                                                                                                                orgList?.map(optionData => (
                                                                                                                                    <>
                                                                                                                                        <option value={optionData.id}>{optionData.name}</option>
                                                                                                                                    </>
                                                                                                                                ))
                                                                                                                            }
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleDepartment}>
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
                                <h4>Department Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshDep}>
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
                                    rows={this.props.department_list != null && this.props.department_list}
                                    columns={depCloumn}
                                    components={{
                                        Toolbar: GridToolbar,
                                      }}
                                      onColumnOrderChange={this.handleColumnReorder}
                                      autoGroupColumnDef={{
                                        headerName: 'Group',
                                        field: 'id',
                                        width: 150,
                                        valueGetter: (params) => params.row.id,
                                        cellRenderer: 'agGroupCellRenderer',
                                      }}
                                      groupMode="single"
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
    const { organization_status, organization_list, department_status, department_list } = state.hr;
    return {
        organization_status,
        organization_list,
        department_status,
        department_list,
    };
}

const connectedDepartment = connect(mapStateToProps)(Department);
export default connectedDepartment;

