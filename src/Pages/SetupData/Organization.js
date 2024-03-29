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
import { organizationAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../Table/table.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: "",
      orgCloumn: [
        {
          field: 'name', headerName: 'Organization', width: 200,
        }
      ],
    };
  }
  handleColumnReorder = (newColumns) => {
    this.setState({ orgCloumn: newColumns });
};
  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

  };
  validateOrg = (isSubmitted) => {
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


  handleOrganization = async (event) => {
    const { organization } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateOrg(true);
    if (newErrorData.isValid) {
      var newOrganization = {
        "name": organization
      };
      this.props.dispatch(organizationAction.addOrganization(newOrganization));
    }

  }
  componentDidMount = async() => {
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
  }
  refreshOrg = () => {
    this.props.dispatch(organizationAction.getOrganization({}))
  }
  exportToExcel = () => {
    if (this.props.organization_list && this.props.organization_list.length > 0) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = 'organization';
      const ws = XLSX.utils.json_to_sheet(this.props.organization_list);
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
    if (this.props.organization_list && this.props.organization_list.length > 0) {
      const fileName = 'organization.csv';
      const csvData = JSON.stringify(this.props.organization_list != null && this.props.organization_list, { header: true });

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, fileName);
      alert.success("Export To CSV Successfully");
    }
    else {
      alert.error("Please refresh a table");
    }
  };
  render() {
    const { orgCloumn } = this.state;
    return (
      <>
        <div className='form-container'>
          {
            OnBoardingFormData.form.organization.map(orgDetails => {
              return (
                <>
                  <div className="main-content">
                    <div className="vendor-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="general-contect">
                            <div className="d-flex heading">
                              <h5 className="d-inline-block">
                                {orgDetails.organization_title}
                              </h5>
                            </div>
                            <div className="general-information">
                              <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                  <div className="user-content">
                                    <div className="row">
                                      {
                                        orgDetails.fields.map(fieldsData => {
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
                                    <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleOrganization}>
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
                <h4>Organization Table</h4>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshOrg}>
                  <i className="fa fa-refresh"></i>
                </Button>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.exportToExcel}>
                  <ArrowDownwardIcon className="mr-2" /> Export to Excel
                </Button>
                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.exportToCSV}>
                  <ArrowDownwardIcon className="mr-2" />Export to CSV
                </Button>
              </div>
              <div style={{ height: 400, width: '100%', marginTop: "12px" }}>
                <DataGrid
                  rows={this.props.organization_list != null && this.props.organization_list}
                  columns={orgCloumn}
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
  const { organization_status, organization_list } = state.hr;
  return {
    organization_status,
    organization_list
  };
}

const connectedOrganization = connect(mapStateToProps)(Organization);
export default connectedOrganization;

