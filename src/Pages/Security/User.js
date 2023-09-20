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
import { businessElementAction, departmentAction, moduleAction, securityOrganizationAction, productAction, productEnvAction, userAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: "",
      userName: "",
      userEmail: "",
      userPassword: "",
      orgList: [],
      isSubmitted: false,
      userCloumn: [
        {
          field: 'organizationId', headerName: 'Organization', flex: 1
        },
        {
          field: 'organizationName', headerName: 'organization Name', flex: 1
        },
        {
          field: 'userName', headerName: 'Name', flex: 1
        },
        {
          field: 'email', headerName: 'Email', flex: 1
        },
        {
          field: 'password', headerName: 'Password', flex: 1
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


  validateUser = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      userName: validObj,
      userEmail: validObj,
      userPassword: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { userName, userEmail, userPassword } = this.state;
      if (!userName) {
        retData.userName = {
          isValid: false,
          message: alert.error(constantErr.USER_NAME)
        };
        isValid = false;
      }
      if (!userEmail) {
        retData.userEmail = {
          isValid: false,
          message: alert.error(constantErr.USER_EMAIL)
        };
        isValid = false;
      }
      if (!userPassword) {
        retData.userPassword = {
          isValid: false,
          message: alert.error(constantErr.USER_PASSWORD)
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleUser = async (event) => {
    const { organization, userEmail, userName, userPassword } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateUser(true);
    if (newErrorData.isValid) {
      var newUser = {
        "organizationId": organization,
        "name": userName,
        "email": userEmail,
        "password": userPassword
      };
      this.props.dispatch(userAction.addUser(newUser));
    }
  }

  componentDidMount = () => {
    this.props.dispatch(securityOrganizationAction.getSecurityOrganization({}))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.security_organization_status !== prevProps.security_organization_status && this.props.security_organization_status == status.SUCCESS) {
      if (this.props.security_organization_list && this.props.security_organization_list.length > 0) {
        this.setState({
          orgList: this.props.security_organization_list
        })
      }
    }
    if (this.props.user_status !== prevProps.user_status && this.props.user_status == status.SUCCESS) {
      if (this.props.user_list && this.props.user_list.length > 0) {
        this.setState({
          userList: this.props.user_list
        })
      }
    }
  }

  refreshDep = () => {
    this.props.dispatch(userAction.getUser({}))
  }



  render() {
    const { orgList, userCloumn } = this.state;
    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
      <>
        <div className='form-container'>
          {
            OnBoardingFormData.form.user.map(userDetails => {
              return (
                <>
                  <div className="main-content">
                    <div className="vendor-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="general-contect">
                            <div className="d-flex heading">
                              <h5 className="d-inline-block">
                                {userDetails.user_title}
                              </h5>
                            </div>
                            <div className="general-information">
                              <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                  <div className="user-content">
                                    <div className="row">
                                      {
                                        userDetails.fields.map(fieldsData => {
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
                                                          </> :''
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
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleUser}>
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
                <h4>User Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshDep}>
                  <i className="fa fa-refresh"></i>
                </Button>
              </div>
              <div className="mt-3" style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={this.props.user_list != null && this.props.user_list}
                  columns={userCloumn}
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
  const { security_organization_status, security_organization_list, user_status, user_list } = state.hr;
  return {
    security_organization_status,
    security_organization_list,
    user_status,
    user_list,
  };
}

const connectedUser = connect(mapStateToProps)(User);
export default connectedUser;

