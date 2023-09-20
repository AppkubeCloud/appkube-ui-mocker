import React, { Component } from "react";
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
import { budgetAction, organizationAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { DataGrid } from '@mui/x-data-grid';
import '../../Table/table.css'


class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            budget: "",
            orgList: [],
            isSubmitted: false,
            budgetCloumn: [
                {
                    field: 'organizationId', headerName: 'Organization', flex: 1,
                },
                {
                    field: 'organizationName', headerName: 'organization Name', flex: 1
                },
                {
                    field: 'departmentId', headerName: 'Department Id', flex: 1,
                },
                {
                    field: 'departmentName', headerName: 'Department Name', flex: 1,
                },
                {
                    field: 'allocatedBudget', headerName: 'Budget', width: 160,
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


    validateBudget = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: "",
        };
        let isValid = true;
        const retData = {
            organization: validObj,
            budget: validObj,
            isValid,
        };
        if (isSubmitted) {
            const { organization, budget } = this.state;
            if (!organization) {
                retData.organization = {
                    isValid: false,
                    message: alert.error(constantErr.ORGANIZATION)
                };
                isValid = false;
            }
            if (!budget) {
                retData.budget = {
                    isValid: false,
                    message: alert.error(constantErr.BUDGET)
                };
                isValid = false;
            }
        }
        retData.isValid = isValid;
        return retData;
    };

    handleBudget = async (event) => {
        const { organization, budget } = this.state;
        event.preventDefault();
        this.setState({
            isSubmitted: true
        });
        const newErrorData = this.validateBudget(true);
        if (newErrorData.isValid) {
            var newBudget = {
                "organizationId": organization,
                "allocatedBudget": budget
            };
            this.props.dispatch(budgetAction.addBudget(newBudget));
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
        if (this.props.budget_status !== prevProps.budget_status && this.props.budget_status == status.SUCCESS) {
            if (this.props.budget_list && this.props.budget_list.length > 0) {
                this.setState({
                    budgetList: this.props.budget_list
                })
            }
        }
    }

    refreshBudget = () => {
        this.props.dispatch(budgetAction.getBudget({}))
    }




    render() {
        const { orgList, budgetCloumn } = this.state;


        return (
            <>
                <div className='form-container'>
                    {
                        OnBoardingFormData.form.budget.map(budgetDetails => {
                            return (
                                <>
                                    <div className="main-content">
                                        <div className="vendor-content">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="general-contect">
                                                        <div className="d-flex heading">
                                                            <h5 className="d-inline-block">
                                                                {budgetDetails.budget_title}
                                                            </h5>
                                                        </div>
                                                        <div className="general-information">
                                                            <div className="row">
                                                                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                                                                    <div className="user-content">
                                                                        <div className="row">
                                                                            {
                                                                                budgetDetails.fields.map(fieldsData => {
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
                                                                                                                </> : fieldsData.html_element === "number" ?
                                                                                                                    <>
                                                                                                                        <label className="d-block">{fieldsData.lable}</label>
                                                                                                                        <input type={fieldsData.html_element} name={fieldsData.name} required={fieldsData.required} datatype={fieldsData.data_type} onChange={this.handleStateChange}
                                                                                                                            placeholder="" className="form-control" />
                                                                                                                    </>
                                                                                                                    : fieldsData.html_element === "date" ?
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
                                                                        <Button type="submit" className="ml-0" variant="contained" color="primary" onClick={this.handleBudget}>
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
                                <h4>Budget Table</h4>
                                <Button variant="contained" className="btnData ml-4" style={{ backgroundColor: "#16619F", color: "white", borderRadius: "30px" }} onClick={this.refreshBudget}>
                                    <i className="fa fa-refresh"></i>
                                </Button>
                            </div>
                            <div className="mt-3" style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={this.props.budget_list != null && this.props.budget_list}
                                    columns={budgetCloumn}
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
    const { organization_status, organization_list, budget_status, budget_list } = state.hr;
    return {
        organization_status,
        organization_list,
        budget_status,
        budget_list,
    };
}

const connectedBudget = connect(mapStateToProps)(Budget);
export default connectedBudget;

