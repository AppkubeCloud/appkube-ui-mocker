import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import { DatePicker } from "@y0c/react-datepicker";
import "simplebar/dist/simplebar.min.css";
import Tooltip from "@material-ui/core/Tooltip";
import '../../assets/newEmployee.css'
import OnBoardingFormData from '../../_json/OnBoardingForm';
import { alert } from '../../_utilities';
import { constantErr } from "../../Constant";
import { Container } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { organizationAction, securityOrganizationAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
class SecurityOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securityOrganization: "",
      cmdbCheack: false,
      securityOrgCloumn: [
        {
          field: 'name', headerName: 'Organization',flex:1
        },
        {
          field: 'pushToCmdb',
          headerName: 'Action',
          flex:1,
          sortable: false,
          renderCell: (params) => (
            <button onClick={() => this.handleButtonClick(params.this.props.security_organization_list.pushToCmdb)}>Click</button>
          ),
        },
      ],
    };
  }
  handleButtonClick(id) {
  
    console.log(`Button clicked for row with ID: ${id}`);
  }
  handleStateChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  handleStateCheckedChange = (event) => {
    this.setState({ cmdbCheack: event.target.checked });
  }
  validateSecurityOrg = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      securityOrganization: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { securityOrganization } = this.state;
      if (!securityOrganization) {
        retData.securityOrganization = {
          isValid: false,
          message: alert.error(constantErr.ORGANIZATION)
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };


  handleSecurityOrganization = async (event) => {
    const { securityOrganization, cmdbCheack } = this.state;

    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateSecurityOrg(true);
    if (newErrorData.isValid) {
      var newOrganization = {
        "name": securityOrganization,
        "pushToCmdb": cmdbCheack
      };
      this.props.dispatch(securityOrganizationAction.addSecurityOrganization(newOrganization));
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
  }
  refreshSecurityOrg = () => {
    this.props.dispatch(securityOrganizationAction.getSecurityOrganization({}))
  }

  render() {
    const { securityOrgCloumn, cmdbCheack } = this.state;
    return (
      <>
        <div className='form-container'>
          {
            OnBoardingFormData.form.securityOrganization.map(securityOrgDetails => {
              return (
                <>
                  <div className="main-content">
                    <div className="vendor-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="general-contect">
                            <div className="d-flex heading">
                              <h5 className="d-inline-block">
                                {securityOrgDetails.security_organization_title}
                              </h5>
                            </div>
                            <div className="general-information">
                              <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                  <div className="user-content">
                                    <div className="row">
                                      {
                                        securityOrgDetails.fields.map(fieldsData => {
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
                                                      </> : fieldsData.html_element === "date" ?
                                                        <>
                                                          <label className="d-block">{fieldsData.lable}</label>
                                                          <DatePicker name={fieldsData.name} onChange={this.handleDOB} placeholder={fieldsData.placeholder} />
                                                        </> : fieldsData.html_element === "Checkbox" ?
                                                          <>
                                                            <br />   <br /><br />
                                                            <FormControlLabel style={{ marginLeft: "-300px" }} control={<Checkbox color="success" checked={cmdbCheack} onChange={this.handleStateCheckedChange} />} label={fieldsData.label} onChange={this.handleStateChange} />
                                                          </>
                                                          : ''
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
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleSecurityOrganization}>
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
                <h4>Security Organization Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshSecurityOrg}>
                  <i className="fa fa-refresh"></i>
                </Button>
              </div>
              <div style={{ height: 400, width: '100%', marginTop: "12px" }}>
                <DataGrid
                  rows={this.props.security_organization_list != null && this.props.security_organization_list}
                  columns={securityOrgCloumn}
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
  const { security_organization_status, security_organization_list } = state.hr;
  return {
    security_organization_status,
    security_organization_list
  };
}

const connectedSecurityOrganization = connect(mapStateToProps)(SecurityOrganization);
export default connectedSecurityOrganization;

