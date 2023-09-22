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
import { DataGrid } from '@mui/x-data-grid';
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
  'APP_CONFIG_SUMMARY',
  'LAMBDA',
  'EKS',
  'ECS',
  'VPC',
  'EC2',
  'RDS',
  'S3',
  'CDN',
];
class CloudElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: [],
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
          field: '',
          headerName: 'Config Json',
          flex: 1,
          sortable: false,
          renderCell: (params) => (
            <Button variant="contained" color="primary" onClick={this.handleClickOpen('paper', params)}>View</Button>

          ),
        },
      ],
    };
    this.descriptionElementRef = React.createRef();
  }
  handleClickOpen = (scrollType, params) => () => {
    this.setState({ open: true, scroll: scrollType, params: params });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onCopyText = () => {
    const jsonString = JSON.stringify(this.state.params != null && this.state.params.row.configJson, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert.success('JSON data copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying JSON data:', error);
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


  render() {
    const { orgList, cloudElementCloumn, open, scroll, personName } = this.state;
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
                                        <Select style={{height:"50px"}}
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
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.getCloudElement}>
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
                <h4>Cloud Element Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshCloud}>
                  <i className="fa fa-refresh"></i>
                </Button>
              </div>
              <div className="mt-3" style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={this.props.cloud_element_list != null && this.props.cloud_element_list}
                  columns={cloudElementCloumn}
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

