import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { connect } from 'react-redux';
import { businessElementAction, departmentAction, landingzoneAction, moduleAction, organizationAction, productAction, productEnvAction } from '../../_actions';
import { status } from '../../_constants';



class MinusSquare extends Component {
    render() {
        return (
            <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...this.props}>
                <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
            </SvgIcon>
        );
    }
}

class PlusSquare extends Component {
    render() {
        return (
            <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...this.props}>
                <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
            </SvgIcon>
        );
    }
}

class CloseSquare extends Component {
    render() {
        return (
            <SvgIcon
                className="close"
                fontSize="inherit"
                style={{ width: 14, height: 14 }}
                {...this.props}
            >
                <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
            </SvgIcon>
        );
    }
}

class TransitionComponent extends Component {
    render() {
        return (
            <>
                <Collapse {...this.props} />
            </>
        );
    }
}

TransitionComponent.propTypes = {
    in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));







class LandingzoneTree extends Component {

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
        if (this.props.landingzone_status !== prevProps.landingzone_status && this.props.landingzone_status == status.SUCCESS) {
            if (this.props.landingzone_list && this.props.landingzone_list.length > 0) {
                this.setState({
                    landingZoneList: this.props.landingzone_list
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
        if (this.props.business_element_status !== prevProps.business_element_status && this.props.business_element_status == status.SUCCESS) {
            if (this.props.business_element_list && this.props.business_element_list.length > 0) {
                this.setState({
                    businessElementList: this.props.business_element_list
                })
            }
        }
    }
    onClickOrg = (e, orgId) => {
        this.props.dispatch(departmentAction.getDepartment({ organizationId: orgId }))
    };
    onClickDep = (e, depId) => {
        this.props.dispatch(landingzoneAction.getLandingzone({ departmentId: depId }))
    };
    onClickProduct = (e, proId) => {
        this.props.dispatch(productEnvAction.getProductEnv({ productId: proId }))
    };
    onClickProductEnv = (e, proEnvId) => {
        this.props.dispatch(moduleAction.getModule({ productEnvId: proEnvId }))
    };
    onClickModule = (e, moduleId) => {
        this.props.dispatch(businessElementAction.getBusinessElement({ moduleId: moduleId }))
    }
    render() {
        console.log("{this.props.landingzone_list",this.props.landingzone_list)
        return (
            <>
                <div className='form-container'>
                    <div className='d-flex' style={{ flexDirection: "column" }}>
                        {
                            Array.isArray(this.props?.organization_list) &&this.props?.organization_list?.map((orgData, index) => (

                                <div className="main-content d-flex">
                                    <div className="vendor-content" style={{ width: "500px" }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="general-contect">
                                                    <>
                                                        <TreeView
                                                            aria-label="customized"
                                                            defaultExpanded={['1']}
                                                            defaultCollapseIcon={<MinusSquare />}
                                                            defaultExpandIcon={<PlusSquare />}
                                                            defaultEndIcon={<CloseSquare />}
                                                            sx={{ overflowY: 'auto' }}
                                                        >
                                                            <StyledTreeItem nodeId={index + 10000} label={orgData.name} onClick={(e) => this.onClickOrg(e, orgData.id)}>
                                                                {this.props?.department_list?.map((depData, depIndex) => (
                                                                    orgData.id === depData.organizationId && (
                                                                        <StyledTreeItem nodeId={depIndex + 20000} label={depData.name} onClick={(e) => this.onClickDep(e, depData.id)}>
                                                                            {this.props.landingzone_list?.map((lzData, lzIndex) => (
                                                                                depData.id === lzData.departmentId && (
                                                                                    <StyledTreeItem nodeId={lzIndex + 30000} label={lzData.landingZone}>

                                                                                        {/* <StyledTreeItem /> */}
                                                                                    </StyledTreeItem>
                                                                                )
                                                                            ))}
                                                                            <StyledTreeItem />

                                                                        </StyledTreeItem>
                                                                    )
                                                                ))}
                                                                <StyledTreeItem />
                                                            </StyledTreeItem>
                                                        </TreeView>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}
function mapStateToProps(state) {
    const { organization_status, organization_list, department_status, department_list, product_status, product_list, product_env_status, product_env_list, module_list, module_status, business_element_status, business_element_list,landingzone_list ,landingzone_status} = state.hr;
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
        module_status,
        business_element_status,
        business_element_list,
        landingzone_list,
        landingzone_status
    };
}

const connectedDataSetup = connect(mapStateToProps)(LandingzoneTree);
export default connectedDataSetup;
