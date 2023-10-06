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
import { departmentAction, organizationAction, landingzoneAction, productAction, configSummaryDiscoveryAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../Table/table.css'
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
class ConfigSummaryDiscovery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCopied: false,
            open: false,
            scroll: 'paper',
            organization: "",
            department: "",
            landingzone: "",
            region: "",
            elementType: "",
            orgList: [],
            landingZoneList: [],
            isSubmitted: false,
            configSummaryDiscoveryCloumn: [
                {
                    field: 'organizationName', headerName: 'Organization Name', flex: 1
                },
                {
                    field: 'departmentName', headerName: 'Department Name', flex: 1,
                },
                {
                    field: 'landingZone', headerName: 'Landing Zone', flex: 1,
                },
                {
                    field: 'summaryJson',
                    headerName: 'Summary Json',
                    flex: 1,
                    sortable: false,
                    renderCell: (params) => (
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen('paper', params)}
                        disabled={params.row.summaryJson === false}
                        style={{
                          color: params.row.summaryJson ? 'white' : 'red',
                          opacity: params.row.summaryJson ? 1 : 0.5,
                          cursor: params.row.summaryJson ? 'pointer' : 'not-allowed',
                        }}>View</Button>

                    ),
                },

            ],
        };
        this.descriptionElementRef = React.createRef();
    }
    handleColumnReorder = (newColumns) => {
        this.setState({ configSummaryDiscoveryCloumn: newColumns });
    };
    handleClickOpen = (scrollType, params) => () => {
        this.setState({ open: true, scroll: scrollType, params: params });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

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


    getConfigSummary = async (event) => {
        const { region, elementType, landingzone } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateProductEnclave(true);
        if (newErrorData.isValid) {
            var newPenv = {
                "landingZone": landingzone,
                "elementType": "APP_CONFIG_SUMMARY",
                "awsRegion": region
            };
            this.props.dispatch(configSummaryDiscoveryAction.getConfigSummaryDiscovery({ newPenv }))
        }
    }

    componentDidMount = () => {
        this.props.dispatch(organizationAction.getOrganization({}))
        if (this.state.open) {
            const descriptionElement = this.descriptionElementRef.current;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
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
        if (this.props.config_summary_discovery_status !== prevProps.config_summary_discovery_status && this.props.config_summary_discovery_status == status.SUCCESS) {
            if (this.props.config_summary_discovery_list && this.props.config_summary_discovery_list.length > 0) {
                this.setState({
                    configSummaryList: this.props.config_summary_discovery_list
                })
            }
        }
    }

    refreshConfigSummary = () => {
        this.props.dispatch(configSummaryDiscoveryAction.getAllConfigSummaryDiscovery({}))
    }
    onCopyText = () => {
        const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.summaryJson, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
            alert.success('JSON data copied to clipboard!');
        }).catch((error) => {
            console.error('Error copying JSON data:', error);
        });
    };
    exportToExcel = () => {
        if (this.props.config_summary_discovery_list && this.props.config_summary_discovery_list.length > 0) {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = 'config_summary_discovery';
            const ws = XLSX.utils.json_to_sheet(this.props.config_summary_discovery_list);
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
        if (this.props.config_summary_discovery_list && this.props.config_summary_discovery_list.length > 0) {
            const fileName = 'config_summary_discovery.csv';
            const csvData = JSON.stringify(this.props.config_summary_discovery_list != null && this.props.config_summary_discovery_list, { header: true });

            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, fileName);
            alert.success("Export To CSV Successfully");
        }
        else {
            alert.error("Please refresh a table");
        }
    };

    render() {
        const { orgList, configSummaryDiscoveryCloumn, open, scroll } = this.state;
        return (
            <>

                <div className='form-container'>
                    {
                        OnBoardingFormData.form.config_summary.map(configSummaryDeatils => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {configSummaryDeatils.config_summary_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                configSummaryDeatils.fields.map(fieldsData => {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="form-group form-group-common">
                                                                                                {
                                                                                                    fieldsData.html_element === "textbox" && fieldsData.name === "elementType" ?
                                                                                                        <>
                                                                                                            <label className="d-block">{fieldsData.lable}</label>
                                                                                                            <input type={fieldsData.html_element} name={fieldsData.name} value={"APP_CONFIG_SUMMARY"} disabled required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.getConfigSummary}>
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
                                <h4>App Config Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshConfigSummary}>
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
                                    rows={this.props.config_summary_discovery_list != null && this.props.config_summary_discovery_list}
                                    columns={configSummaryDiscoveryCloumn}
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
                <div>

                    <Dialog
                        open={open}
                        onClose={this.handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <div className="d-flex" style={{ flexDirection: "row" }}>
                            <DialogTitle id="scroll-dialog-title">Summary Json</DialogTitle>
                            <Button onClick={this.onCopyText}> <MdContentCopy />Copy</Button>
                        </div>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={this.descriptionElementRef}
                                tabIndex={-1}
                            >
                                {
                                    <pre>{JSON.stringify(this.state.params != null && this.state.params.row.summaryJson, null, 2)}</pre>
                                }
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>

                        </DialogActions>
                    </Dialog>
                </div>

            </>
        );
    }
}
function mapStateToProps(state) {
    const { organization_status, organization_list, department_status, department_list, landingzone_status, landingzone_list, config_summary_discovery_list, config_summary_discovery_status } = state.hr;
    return {
        organization_status,
        organization_list,
        department_status,
        department_list,
        landingzone_status,
        landingzone_list,
        config_summary_discovery_list,
        config_summary_discovery_status
    };
}

const connectedConfigSummaryDiscovery = connect(mapStateToProps)(ConfigSummaryDiscovery);
export default connectedConfigSummaryDiscovery;




