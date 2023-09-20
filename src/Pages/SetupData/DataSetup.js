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
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'
const dataGridStyles = {
  root: {
    backgroundColor: 'blue', // Change this to the desired background color for the entire DataGrid
  },
  colCell: {
    backgroundColor: 'blue', // Change this to the desired background color for column headers
  },
};

class DataSetup extends Component {
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
      orgCloumn: [
        {
          field: 'name', headerName: 'Organization', width: 160,
        }
      ],
      depCloumn: [
        {
          field: 'organizationId', headerName: 'Organization', width: 160,
        },
        {
          field: 'name', headerName: 'Department', width: 160,
        }
      ],
      productCloumn: [
        {
          field: 'organizationId', headerName: 'Organization', width: 160,
        },
        {
          field: 'departmentId', headerName: 'Department', width: 160,
        },
        {
          field: 'name', headerName: 'Product', width: 160,
        }
      ],
      rowData: []
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

  handleProductChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.props.dispatch(productEnvAction.getProductEnv({ productId: value }))
  }
  hadleProductEnvChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.props.dispatch(moduleAction.getModule({ productEnvId: value }))
  }


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

  validateProduct = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      organization: validObj,
      department: validObj,
      product: validObj,
      department: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { organization, department, product } = this.state;
      if (!organization) {
        retData.organization = {
          isValid: false,
          message: alert.error(constantErr.ORGANIZATION)
        };
        isValid = false;
      }
      if (!product) {
        retData.product = {
          isValid: false,
          message: alert.error(constantErr.PRODUCT)
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

  validateModule = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      product: validObj,
      productEnv: validObj,
      module: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { product, module, productEnv } = this.state;
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
      if (!module) {
        retData.module = {
          isValid: false,
          message: alert.error(constantErr.MODULE)
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };


  validateBusinessElement = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      product: validObj,
      productEnv: validObj,
      module: validObj,
      businessElement: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { product, module, productEnv, businessElement } = this.state;
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
      if (!module) {
        retData.module = {
          isValid: false,
          message: alert.error(constantErr.MODULE)
        };
        isValid = false;
      }
      if (!businessElement) {
        retData.businessElement = {
          isValid: false,
          message: alert.error(constantErr.BUSSINESS_ELEMENT)
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

  handleDepartment = async (event) => {
    const { organization, department } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateDep(true);
    if (newErrorData.isValid) {
      var newDepartment = {
        "organizationId": organization,
        "name": department
      };
      this.props.dispatch(departmentAction.addDepartment(newDepartment));
    }
  }


  handleProduct = async (event) => {
    const { organization, department, product } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateProduct(true);
    if (newErrorData.isValid) {
      var newProduct = {
        "name": product,
        "type": "",
        "organizationId": organization,
        "departmentId": department,
      };
      this.props.dispatch(productAction.addProduct(newProduct));
    }
  }

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

  handleModule = async (event) => {
    const { productEnv, product, module } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateModule(true);
    if (newErrorData.isValid) {
      var newModule = {
        "productId": product,
        "productEnvId": productEnv,
        "name": module
      };
      this.props.dispatch(moduleAction.addModule(newModule));
    }
  }

  handleBusinessElement = async (event) => {
    const { productEnv, product, module, department, businessElement } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
    const newErrorData = this.validateBusinessElement(true);
    if (newErrorData.isValid) {
      var newBusinessElement = {
        "departmentId": department,
        "productId": product,
        "productEnvId": productEnv,
        "moduleId": module,
        "serviceName": businessElement,
        "serviceNature": "",
        "serviceType": ""
      };
      this.props.dispatch(businessElementAction.addBusinessElement(newBusinessElement));
    }
  }


  handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    let { employeeProfilePic, profileUrl } = this.state;
    if (name === "employeeProfilePic" && files.length > 0) {
      employeeProfilePic = files[0];
      profileUrl = URL.createObjectURL(files[0]);
      this.setState({
        employeeProfilePic,
        profileUrl,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

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
    if (this.props.module_status !== prevProps.module_status && this.props.module_status == status.SUCCESS) {
      if (this.props.module_list && this.props.module_list.length > 0) {
        this.setState({
          moduleList: this.props.module_list
        })
      }
    }
  }
  refreshDep = () => {
    this.props.dispatch(departmentAction.getDepartment({}))
  }

  refreshProduct = () => {
    this.props.dispatch(productAction.getProduct({}))
  }


  render() {
    const { orgList, orgCloumn, depCloumn ,productCloumn} = this.state;


    return (
      <>
        <div className='form-container'>
          <Tabs defaultIndex={0} id="controlled-tabs" selectedTabClassName="bg-white" onSelect={index => (index)}>
            <div className="viewTabs">
              <TabList>
                <Tab>{
                  OnBoardingFormData.form.organization.map(officalDetails => {
                    return (
                      <>
                        {officalDetails.organization_title}
                      </>
                    )
                  })
                }</Tab>
                <Tab>{
                  OnBoardingFormData.form.department.map(parsonalDetails => {
                    return (
                      <>
                        {parsonalDetails.department_title}
                      </>
                    )
                  })
                }</Tab>
                <Tab>{
                  OnBoardingFormData.form.product.map(parsonalDetails => {
                    return (
                      <>
                        {parsonalDetails.product_title}
                      </>
                    )
                  })
                }</Tab>
                <Tab>{
                  OnBoardingFormData.form.product_env.map(parsonalDetails => {
                    return (
                      <>
                        {parsonalDetails.product_env_title}
                      </>
                    )
                  })
                }</Tab>
                <Tab>{
                  OnBoardingFormData.form.module.map(parsonalDetails => {
                    return (
                      <>
                        {parsonalDetails.module_title}
                      </>
                    )
                  })
                }</Tab>
                <Tab>{
                  OnBoardingFormData.form.business_element.map(parsonalDetails => {
                    return (
                      <>
                        {parsonalDetails.business_element_title}
                      </>
                    )
                  })
                }</Tab>
              </TabList>
            </div>
            <TabPanel>
              {
                OnBoardingFormData.form.organization.map(parsonalDetails => {
                  return (
                    <>
                      <div className="main-content">
                        <div className="vendor-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="general-contect">
                                <div className="d-flex heading">
                                  <h5 className="d-inline-block">
                                    {parsonalDetails.organization_title}
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
                  <h4>Organization Table</h4>
                  <div style={{ height: 400, width: '100%', marginTop: "12px" }}>
                    <DataGrid
                      classes={dataGridStyles}
                      rows={this.state.orgList}
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
              </div>
            </TabPanel>
            <TabPanel>
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
                  </div>
                  <div className="mt-3" style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      classes={dataGridStyles}
                      rows={this.props.department_list != null && this.props.department_list}
                      columns={depCloumn}
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
            </TabPanel>
            <TabPanel>
              {
                OnBoardingFormData.form.product.map(parsonalDetails => {
                  return (
                    <>
                      <div className="main-content">
                        <div className="vendor-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="general-contect">
                                <div className="d-flex heading">
                                  <h5 className="d-inline-block">
                                    {parsonalDetails.product_title}
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
                                                                  <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                    <option value="">-Select-</option>
                                                                    {this.props.department_list && this.props.department_list.map((optionData) => (
                                                                      <option key={optionData.id} value={optionData.id}>
                                                                        {optionData.name}
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
                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleProduct}>
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
                    <h4>Product Table</h4>
                    <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshDep}>
                      <i className="fa fa-refresh"></i>
                    </Button>
                  </div>
                  <div className="mt-3" style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      classes={dataGridStyles}
                      rows={this.props.product_list != null && this.props.product_list}
                      columns={productCloumn}
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
            </TabPanel>
            <TabPanel>
              {
                OnBoardingFormData.form.product_env.map(parsonalDetails => {
                  return (
                    <>
                      <div className="main-content">
                        <div className="vendor-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="general-contect">
                                <div className="d-flex heading">
                                  <h5 className="d-inline-block">
                                    {parsonalDetails.product_env_title}
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
            </TabPanel>

            <TabPanel>
              {
                OnBoardingFormData.form.module.map(parsonalDetails => {
                  return (
                    <>
                      <div className="main-content">
                        <div className="vendor-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="general-contect">
                                <div className="d-flex heading">
                                  <h5 className="d-inline-block">
                                    {parsonalDetails.module_title}
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
                                                                    <NativeSelect name={fieldsData.name} onChange={this.handleProductChange} >
                                                                      <option value="">-Select-</option>
                                                                      {this.props.product_list && this.props.product_list.map((optionData) => (
                                                                        <option key={optionData.id} value={optionData.id}>
                                                                          {optionData.name}
                                                                        </option>
                                                                      ))}
                                                                    </NativeSelect>
                                                                  </FormControl>
                                                                </> : fieldsData.html_element === "select" && fieldsData.name === "productEnv" ?
                                                                  <>
                                                                    <label className="d-block">{fieldsData.lable}</label>
                                                                    <FormControl className="select">
                                                                      <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                        <option value="">-Select-</option>
                                                                        {this.props.product_env_list && this.props.product_env_list.map((optionData) => (
                                                                          <option key={optionData.id} value={optionData.id}>
                                                                            {optionData.name}
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
                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleModule}>
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
            </TabPanel>
            <TabPanel>
              {
                OnBoardingFormData.form.business_element.map(parsonalDetails => {
                  return (
                    <>
                      <div className="main-content">
                        <div className="vendor-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="general-contect">
                                <div className="d-flex heading">
                                  <h5 className="d-inline-block">
                                    {parsonalDetails.business_element_title}
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
                                                                    <NativeSelect name={fieldsData.name} onChange={this.handleProductChange} >
                                                                      <option value="">-Select-</option>
                                                                      {this.props.product_list && this.props.product_list.map((optionData) => (
                                                                        <option key={optionData.id} value={optionData.id}>
                                                                          {optionData.name}
                                                                        </option>
                                                                      ))}
                                                                    </NativeSelect>
                                                                  </FormControl>
                                                                </> : fieldsData.html_element === "select" && fieldsData.name === "productEnv" ?
                                                                  <>
                                                                    <label className="d-block">{fieldsData.lable}</label>
                                                                    <FormControl className="select">
                                                                      <NativeSelect name={fieldsData.name} onChange={this.hadleProductEnvChange} >
                                                                        <option value="">-Select-</option>
                                                                        {this.props.product_env_list && this.props.product_env_list.map((optionData) => (
                                                                          <option key={optionData.id} value={optionData.id}>
                                                                            {optionData.name}
                                                                          </option>
                                                                        ))}
                                                                      </NativeSelect>
                                                                    </FormControl>
                                                                  </> : fieldsData.html_element === "select" && fieldsData.name === "module" ?
                                                                    <>
                                                                      <label className="d-block">{fieldsData.lable}</label>
                                                                      <FormControl className="select">
                                                                        <NativeSelect name={fieldsData.name} onChange={this.handleStateChange} >
                                                                          <option value="">-Select-</option>
                                                                          {this.props.module_list && this.props.module_list.map((optionData) => (
                                                                            <option key={optionData.id} value={optionData.id}>
                                                                              {optionData.name}
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
                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleBusinessElement}>
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
            </TabPanel>
          </Tabs>




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

const connectedDataSetup = connect(mapStateToProps)(DataSetup);
export default connectedDataSetup;

