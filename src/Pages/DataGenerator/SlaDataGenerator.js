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
import { slaDataGeneratorAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'


class SlaDataGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      orgCloumn: [
        {
          field: 'name', headerName: 'Organization', width: 200,
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
  validateSlaData = (isSubmitted) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      startDate: validObj,
      endDate: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { startDate, endDate } = this.state;
      if (!startDate) {
        retData.startDate = {
          isValid: false,
          message: alert.error(constantErr.START_DATE)
        };
        isValid = false;
      }
      else if (!datePattern.test(startDate)) {
        retData.startDate = {
          isValid: false,
          message: alert.error(constantErr.DATE_FORMATE)
        };
        isValid = false;
      }
      if (!endDate) {
        retData.endDate = {
          isValid: false,
          message: alert.error(constantErr.END_DATE)
        };
        isValid = false;
      }
      else if (!datePattern.test(endDate)) {
        retData.endDate = {
          isValid: false,
          message: alert.error(constantErr.DATE_FORMATE)
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };


  handleSlaData = async (event) => {
    const { startDate, endDate } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateSlaData(true);
    if (newErrorData.isValid) {
      var data = {
        "startDate": startDate,
        "endDate": endDate
      };
      this.props.dispatch(slaDataGeneratorAction.getSlaDataGenerator(data));
    }

  }
  componentDidMount = () => {
    // this.props.dispatch(organizationAction.getOrganization({}))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sla_data_status !== prevProps.sla_data_status && this.props.sla_data_status == status.SUCCESS) {
      if (this.props.sla_data_list && this.props.sla_data_list.length > 0) {
        this.setState({
          costList: this.props.sla_data_list
        })
      }
    }
  }
  refreshOrg = () => {
    // this.props.dispatch(organizationAction.getOrganization({}))
  }

  render() {
    const { orgCloumn } = this.state;
    return (
      <>
        <div className='form-container'>
          {
            OnBoardingFormData.form.sla_data.map(slaDetails => {
              return (
                <>
                  <div className="main-content">
                    <div className="vendor-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="general-contect">
                            <div className="d-flex heading">
                              <h5 className="d-inline-block">
                                {slaDetails.sla_data_title}
                              </h5>
                            </div>
                            <div className="general-information">
                              <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                  <div className="user-content">
                                    <div className="row">
                                      {
                                        slaDetails.fields.map(fieldsData => {
                                          return (
                                            <div className="col-md-4">
                                              <div className="form-group form-group-common">
                                                {
                                                  fieldsData.html_element === "textbox" ?
                                                    <>
                                                      <label className="d-block">{fieldsData.lable}</label>
                                                      <input type={fieldsData.html_element} placeholder={fieldsData.place_holder} name={fieldsData.name} required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                        className="form-control" />
                                                    </>
                                                    : fieldsData.html_element === "email" ?
                                                      <>
                                                        <label className="d-block">{fieldsData.lable}</label>
                                                        <input type={fieldsData.html_element} name={fieldsData.name} required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                          className="form-control" />
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
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleSlaData}>
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
          {/* <div className="main-content">
            <div className="vendor-content">

              <div className="d-flex">
                <h4>Organization Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshOrg}>
                  <i className="fa fa-refresh"></i>
                </Button>
              </div>
              <div style={{ height: 400, width: '100%', marginTop: "12px" }}>
                <DataGrid
                  rows={this.props.sla_data_list != null && this.props.sla_data_list}
                  columns={orgCloumn}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </div>
          </div> */}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { sla_data_status, sla_data_list } = state.hr;
  return {
    sla_data_status,
    sla_data_list
  };
}

const connectedSlaDataGenerator = connect(mapStateToProps)(SlaDataGenerator);
export default connectedSlaDataGenerator;

