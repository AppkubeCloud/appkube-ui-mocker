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
import { departmentAction, productEnclaveAction, organizationAction, landingzoneAction, productAction, cloudElementAction } from "../../_actions";
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'LAMBDA',
  'EKS',
  'ECS',
  'EC2',
  'RDS',
  'S3',
  'CDN',
  'KINESYS',
  'DYNAMODB'
];
class CloudElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: [],
      isCopied: false,
      open: false,
      costOpen: false,
      slaOpen: false,
      openTag: false,
      openHostedServices: false,
      scroll: 'paper', // or whatever your default value is
      params: null,
      organization: "",
      department: "",
      landingzone: "",
      region: "",
      elementType: "",
      orgList: [],
      landingZoneList: [],
      orgId: '',
      isSubmitted: false,
      cloudElementCloumn: [
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
          field: 'elementType', headerName: 'Element Type', flex: 1,
        },
        {
          field: 'instanceName', headerName: 'Instance Name', flex: 1,
        },
        {
          field: 'instanceId', headerName: 'Instance Id', flex: 1,
        },
        {
          field: 'configJson',
          headerName: 'Config',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={this.handleClickOpen('paper', params)}
              disabled={params.row.configJson === null || params.row.configJson === 'null'}
              style={{
                color: params.row.configJson ? 'white' : 'red',
                opacity: params.row.configJson ? 1 : 0.5,
                cursor: params.row.configJson ? 'pointer' : 'not-allowed',
              }}
            >View</Button>

          ),
        },
        {
          field: 'costJson',
          headerName: 'Cost',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={this.handleClickOpenCost('paper', params)}
              disabled={params.row.costJson === null || params.row.costJson === 'null'}
              style={{
                color: params.row.costJson ? 'white' : 'red',
                opacity: params.row.costJson ? 1 : 0.5,
                cursor: params.row.costJson ? 'pointer' : 'not-allowed',
              }}
            >View</Button>

          ),
        },
        {
          field: 'slaJson',
          headerName: 'Sla',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={this.handleClickOpenSla('paper', params)}
              disabled={params.row.slaJson === null || params.row.slaJson === 'null'}
              style={{
                color: params.row.slaJson ? 'green' : 'red',
                opacity: params.row.slaJson ? 1 : 0.5,
                cursor: params.row.slaJson ? 'pointer' : 'not-allowed',
              }}>View</Button>

          ),
        },
        {
          field: 'tagJson',
          headerName: 'Tag List',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={this.handleClickOpenTages('paper', params)}
              disabled={params.row.configJson === null || params.row.configJson === 'null'}
              style={{
                color: params.row.configJson ? 'white' : 'red',
                opacity: params.row.configJson ? 1 : 0.5,
                cursor: params.row.configJson ? 'pointer' : 'not-allowed'
              }}>View</Button>
          ),
        },
        {
          field: 'hostedServices',
          headerName: 'Hosted Services',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="outlined"
              onClick={this.handleClickOpenHostedServices('paper', params)}
              disabled={params.row.hostedServices === false}
              style={{
                color: params.row.hostedServices ? 'green' : 'red',
                opacity: params.row.hostedServices ? 1 : 0.5,
                cursor: params.row.hostedServices ? 'pointer' : 'not-allowed',
              }}
            >
              {params.row.hostedServices ? "true" : "false"}
            </Button>
          ),
        },
      ],
    };
    this.descriptionElementRef = React.createRef();
  }
  handleClickOpen = (scrollType, params) => () => {
    this.setState({ open: true, scroll: scrollType, params: params });
  };
  handleClickOpenTages = (scrollType, params) => () => {
    this.setState({ openTag: true, scroll: scrollType, params: params });
  };
  handleClickOpenHostedServices = (scrollType, params) => () => {
    this.setState({ openHostedServices: true, scroll: scrollType, params: params });
  };
  handleClickOpenCost = (scrollType, params) => () => {
    this.setState({ costOpen: true, scroll: scrollType, params: params });
  };
  handleClickOpenSla = (scrollType, params) => () => {
    this.setState({ slaOpen: true, scroll: scrollType, params: params });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCloseCost = () => {
    this.setState({ costOpen: false });
  };
  handleCloseSla = () => {
    this.setState({ slaOpen: false });
  };
  handleClosTag = () => {
    this.setState({ openTag: false });
  };
  handleClickCloseHostedServices = () => {
    this.setState({ openHostedServices: false });
  };

  onCopyText = () => {
    const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.configJson, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      alert.error('Error copying JSON data:', error);
    });
  };

  onCopyCostText = () => {
    const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.costJson, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      alert.error('Error copying JSON data:', error);
    });
  };

  onCopySlaText = () => {
    const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.slaJson, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      alert.error('Error copying JSON data:', error);
    });
  };
  onCopyHostedServicesText = () => {
    const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.hostedServices, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      alert.error('Error copying JSON data:', error);
    });
  };

  onCopyTagText = (selecteData) => {
    const jsonString = JSON.stringify(selecteData != null && selecteData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      alert.error('Error copying JSON data:', error);
    });
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

  };
  handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      personName: typeof value === 'string' ? value.split(',') : value,
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
      orgId: value
    });
    this.props.dispatch(departmentAction.getDepartment({ organizationId: value }))
  };



  validateCloudElement = (isSubmitted) => {
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

  validateAutoAssociate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      organization: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { organization } = this.state;
      if (!organization) {
        retData.organization = {
          isValid: false,
          message: alert.error(constantErr.ORGANIZATION)
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };


  getCloudElement = async (event) => {
    const { region, personName, landingzone } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateCloudElement(true);
    if (newErrorData.isValid) {
      var newPenv = {
        "landingZone": landingzone,
        "elementType": personName,
        "awsRegion": region
      };
      this.props.dispatch(cloudElementAction.getCloudElement({ newPenv }))
    }
  }
  getAutoSssociate = async (e) => {
    const { orgId } = this.state;
    e.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateAutoAssociate(true);
    if (newErrorData.isValid) {
      var newAutoSssociate = {
        "orgId": orgId,
        "cloud": "aws"
      };
      this.props.dispatch(cloudElementAction.getAutoSssociate({ newAutoSssociate }))
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
    if (this.props.cloud_element_status !== prevProps.cloud_element_status && this.props.cloud_element_status == status.SUCCESS) {
      if (this.props.cloud_element_list && this.props.cloud_element_list.length > 0) {
        this.setState({
          productEnclaveList: this.props.cloud_element_list
        })
      }
    }
  }

  refreshCloud = () => {
    this.props.dispatch(cloudElementAction.getAllCloudElement({}))
  }

  exportToExcel = () => {
    if (this.props.cloud_element_list && this.props.cloud_element_list.length > 0) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = 'cloud Element';
      const ws = XLSX.utils.json_to_sheet(this.props.cloud_element_list);
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
    if (this.props.cloud_element_list && this.props.cloud_element_list.length > 0) {
      const fileName = 'data.csv';
      const csvData = JSON.stringify(this.props.cloud_element_list != null && this.props.cloud_element_list, { header: true });

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, fileName);
      alert.success("Export To CSV Successfully");
    }
    else {
      alert.error("Please refresh a table");
    }
  };

  handleColumnReorder = (newColumns) => {
    this.setState({ cloudElementCloumn: newColumns });
  };
  render() {
    const { orgList, cloudElementCloumn, open, costOpen, scroll, personName, slaOpen, openTag, openHostedServices } = this.state;

    return (
      <>
        <div className='form-container'>
          {
            OnBoardingFormData.form.cloud_element.map(cloudElementDeatils => {
              return (
                <>
                  <div className="main-content">
                    <div className="vendor-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="general-contect">
                            <div className="d-flex heading">
                              <h5 className="d-inline-block">
                                {cloudElementDeatils.cloud_element_title}
                              </h5>
                            </div>
                            <div className="general-information">
                              <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                  <div className="user-content">
                                    <div className="row">
                                      {
                                        cloudElementDeatils.fields.map(fieldsData => {
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
                                      <FormControl className="select" >
                                        <label className="d-block">Cloud Element</label>
                                        <Select style={{ height: "50px" }}
                                          labelId="demo-multiple-checkbox-label"
                                          id="demo-multiple-checkbox"
                                          multiple
                                          value={personName}
                                          placeholder="Element Type"
                                          onChange={this.handleChangeSelect}
                                          input={<OutlinedInput label="Tag" />}
                                          renderValue={(selected) => selected.join(', ')}
                                          MenuProps={MenuProps}
                                        >
                                          {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                              <Checkbox checked={personName.indexOf(name) > -1} />
                                              <ListItemText primary={name} />
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                                <Container className="mt-4" >
                                  <Tooltip title="Save">
                                    <Button type="submit" className="mr-3" variant="contained" color="primary" onClick={this.getCloudElement}>
                                      <SaveAsIcon className="mr-2" /> Save
                                    </Button>
                                  </Tooltip>

                                  <Tooltip title="Auto Associate">
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.getAutoSssociate}>
                                      <SaveAsIcon className="mr-2" /> Auto Associate
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
                <h4>Cloud Element Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshCloud}>
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
                  rows={this.props.cloud_element_list != null && this.props.cloud_element_list}
                  columns={cloudElementCloumn}
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
              <DialogTitle id="scroll-dialog-title">Config Json</DialogTitle>
              <Button onClick={this.onCopyText}> <MdContentCopy />Copy</Button>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={this.descriptionElementRef}
                tabIndex={-1}
              >
                {
                  <pre>{JSON.stringify(this.state.params != null && this.state.params.row.configJson, null, 2)}</pre>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>

            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={costOpen}
            onClose={this.handleCloseCost}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <div className="d-flex" style={{ flexDirection: "row" }}>
              <DialogTitle id="scroll-dialog-title">Config Json</DialogTitle>
              <Button onClick={this.onCopyCostText}> <MdContentCopy />Copy</Button>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={this.descriptionElementRef}
                tabIndex={-1}
              >
                {
                  <pre>{JSON.stringify(this.state.params != null && this.state.params.row.costJson, null, 2)}</pre>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseCost}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={slaOpen}
            onClose={this.handleCloseSla}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <div className="d-flex" style={{ flexDirection: "row" }}>
              <DialogTitle id="scroll-dialog-title">Config Json</DialogTitle>
              <Button onClick={this.onCopySlaText}> <MdContentCopy />Copy</Button>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={this.descriptionElementRef}
                tabIndex={-1}
              >
                {
                  <pre>{JSON.stringify(this.state.params != null && this.state.params.row.slaJson, null, 2)}</pre>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseSla}>Cancel</Button>

            </DialogActions>
          </Dialog>
        </div>


        <div>
          <Dialog
            open={openTag}
            onClose={this.handleClosTag}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <div className="d-flex" style={{ flexDirection: "row" }}>
              <DialogTitle id="scroll-dialog-title">Tag Json</DialogTitle>
              <Button onClick={() => {
                if (this.state.params != null) {
                  if (this.state.params.row.elementType === "RDS") {
                    this.onCopyTagText(this.state.params.row.configJson.TagList);
                  } else if (this.state.params.row.elementType === "KINESYS") {
                    this.onCopyTagText(this.state.params.row.configJson.tags.Tags);
                  }
                  else if (this.state.params.row.elementType === "ECS") {
                    this.onCopyTagText(this.state.params.row.configJson.Tags);
                  }
                  else if (this.state.params.row.elementType === "EKS") {
                    this.onCopyTagText(this.state.params.row.configJson.Cluster.Tags);
                  }
                  else if (this.state.params.row.elementType === "CDN") {
                    this.onCopyTagText(this.state.params.row.configJson.tags.Tags.Items);
                  }
                  else if (this.state.params.row.elementType === "DYNAMODB") {
                    this.onCopyTagText(this.state.params.row.configJson.tags.Tags);
                  }
                }
              }}> <MdContentCopy />Copy</Button>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={this.descriptionElementRef}
                tabIndex={-1}
              >
                {this.state.params != null && this.state.params.row.elementType === "RDS" && this.state.params.row.configJson.TagList != null && <pre>{JSON.stringify(this.state.params.row.configJson.TagList, null, 2)}</pre>}
                {this.state.params != null && this.state.params.row.elementType === "KINESYS" && this.state.params.row.configJson.tags.Tags != null && <pre>{JSON.stringify(this.state.params.row.configJson.tags.Tags, null, 2)}</pre>}
                {this.state.params != null && this.state.params.row.elementType === "ECS" && this.state.params.row.configJson.Tags != null && <pre>{JSON.stringify(this.state.params.row.configJson.Tags, null, 2)}</pre>}
                {this.state.params != null && this.state.params.row.elementType === "EKS" && this.state.params.row.configJson.Cluster.Tags != null && <pre>{JSON.stringify(this.state.params.row.configJson.Cluster.Tags, null, 2)}</pre>}
                {this.state.params != null && this.state.params.row.elementType === "CDN" && this.state.params.row.configJson.tags.Tags.Items != null && <pre>{JSON.stringify(this.state.params.row.configJson.tags.Tags.Items, null, 2)}</pre>}
                {this.state.params != null && this.state.params.row.elementType === "DYNAMODB" && this.state.params.row.configJson.tags.Tags != null && <pre>{JSON.stringify(this.state.params.row.configJson.tags.Tags, null, 2)}</pre>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClosTag}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={openHostedServices}
            onClose={this.handleClickCloseHostedServices}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <div className="d-flex" style={{ flexDirection: "row" }}>
              <DialogTitle id="scroll-dialog-title">Hosted Services</DialogTitle>
              <Button onClick={this.onCopyHostedServicesText}> <MdContentCopy />Copy</Button>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={this.descriptionElementRef}
                tabIndex={-1}
              >
                {
                  <pre>{JSON.stringify(this.state.params != null && this.state.params.row.hostedServices, null, 2)}</pre>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickCloseHostedServices}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>

      </>
    );
  }
}
function mapStateToProps(state) {
  const { organization_status, organization_list, department_status, department_list, landingzone_status, landingzone_list, cloud_element_list, cloud_element_status } = state.hr;
  return {
    organization_status,
    organization_list,
    department_status,
    department_list,
    landingzone_status,
    landingzone_list,
    cloud_element_list,
    cloud_element_status
  };
}

const connectedCloudElement = connect(mapStateToProps)(CloudElement);
export default connectedCloudElement;

