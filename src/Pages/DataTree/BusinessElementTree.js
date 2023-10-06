import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { connect } from 'react-redux';
import { businessElementAction, departmentAction, moduleAction, organizationAction, productAction, productEnvAction } from '../../_actions';
import { status } from '../../_constants';
import { MdContentCopy } from "react-icons/md";
import { ListItemIcon } from '@mui/material';
import { alert } from '../../_utilities';
import { Button } from 'react-bootstrap';


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







class CustomizedTreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValues: {
                org: null,
                dep: null,
                product: null,
                productEnv: null,
                module: null,
                businessElement: null,
            },
            generatedURL: '',
        };
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
        if (this.props.business_element_status !== prevProps.business_element_status && this.props.business_element_status == status.SUCCESS) {
            if (this.props.business_element_list && this.props.business_element_list.length > 0) {
                this.setState({
                    businessElementList: this.props.business_element_list
                })
            }
        }
    }
    onClickOrg = (level, value) => {
        this.setState((prevState) => ({
            selectedValues: {
                ...prevState.selectedValues,
                [level]: value,
            },
        }));
        this.props.dispatch(departmentAction.getDepartment({ organizationId: value.id }))
    };
    onClickDep = (level, value) => {
        this.setState((prevState) => ({
            selectedValues: {
                ...prevState.selectedValues,
                [level]: value,
            },
        }));
        this.props.dispatch(productAction.getProduct({ departmentId: value.id }))
    };
    onClickProduct = (level, value) => {
        this.setState((prevState) => ({
            selectedValues: {
                ...prevState.selectedValues,
                [level]: value,
            },
        }));
        this.props.dispatch(productEnvAction.getProductEnv({ productId: value.id }))
    };
    onClickProductEnv = (level, value) => {
        this.setState((prevState) => ({
            selectedValues: {
                ...prevState.selectedValues,
                [level]: value,
            },
        }));
        this.props.dispatch(moduleAction.getModule({ productEnvId: value.id }))
    };
    onClickModule = (level, value) => {
        this.setState((prevState) => ({
            selectedValues: {
                ...prevState.selectedValues,
                [level]: value,
            },
        }));
        this.props.dispatch(businessElementAction.getBusinessElement({ moduleId: value.id }))
    }

    constructURL = (businessElement) => {
        const { selectedValues } = this.state;
        console.log(selectedValues, businessElement);

        let url = "";

        if (selectedValues.product.type === "SOA") {
            url = `${selectedValues.org.name}/${selectedValues.dep.name}/${selectedValues.product.name}/${selectedValues.productEnv.name}/${businessElement.serviceNature}/${selectedValues.module.name}/${businessElement.serviceName}`;
        } else if (selectedValues.product.type === "3 Tier") {
            url = `${selectedValues.org.name}/${selectedValues.dep.name}/${selectedValues.product.name}/${selectedValues.productEnv.name}/${businessElement.serviceType + " " + "Layer"}/${businessElement.serviceName}`;
        }

        const jsonString = JSON.stringify(url, null, 2).replace(/"/g, '');

        navigator.clipboard.writeText(jsonString).then(() => {
            alert.success('URL copied to clipboard!');
        }).catch((error) => {
            alert.error('Error copying URL data:', error);
        });
    };


    render() {
        const { selectedValues } = this.state;
        const { org, dep, product, productEnv, module, businessElement } = selectedValues;
        return (
            <>
                <div className='form-container'>
                    <div className='d-flex' style={{ flexDirection: "column" }}>
                        {
                            this.props?.organization_list?.map((orgData, index) => (

                                <div className="main-content d-flex">
                                    <div className="vendor-content" style={{ width: "800px" }}>
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
                                                            <StyledTreeItem nodeId={index + 10000} label={orgData.name} onClick={() => this.onClickOrg('org', orgData)} selected={org === orgData}>
                                                                {this.props?.department_list?.map((depData, depIndex) => (
                                                                    orgData.id === depData.organizationId && (
                                                                        <StyledTreeItem nodeId={depIndex + 20000} label={<div className='d-flex'>
                                                                            {depData.name}

                                                                        </div>} onClick={() => this.onClickDep('dep', depData)}
                                                                            selected={dep === depData.id}>
                                                                            {this.props?.product_list?.map((productData, productIndex) => (
                                                                                depData.id === productData.departmentId && (
                                                                                    <StyledTreeItem nodeId={productIndex + 30000} label={productData.name} onClick={(e) => this.onClickProduct('product', productData)} selected={product === productData.id}>
                                                                                        {this.props?.product_env_list?.map((productEnvData, productEnvIndex) => (
                                                                                            productData.id === productEnvData.productId && (
                                                                                                <StyledTreeItem nodeId={productEnvIndex + 40000} label={productEnvData.name} onClick={(e) => this.onClickProductEnv('productEnv', productEnvData)} selected={productEnv === productEnvData.id}>
                                                                                                    {this.props?.module_list?.map((moduleData, moduleIndex) => (
                                                                                                        productEnvData.id === moduleData.productEnvId && (
                                                                                                            <StyledTreeItem nodeId={moduleIndex + 50000} label={moduleData.name} onClick={(e) => this.onClickModule('module', moduleData)} selected={module === moduleData.id}>
                                                                                                                {this.props?.business_element_list?.map((businessElementData, businessElementIndex) => (
                                                                                                                    moduleData.id === businessElementData.moduleId && (
                                                                                                                        <>
                                                                                                                            <StyledTreeItem nodeId={businessElementIndex + 600000} label={
                                                                                                                                <div className='d-flex'>
                                                                                                                                    {businessElementData.serviceName}
                                                                                                                                    <ListItemIcon>
                                                                                                                                        <MdContentCopy onClick={() => this.constructURL(businessElementData)} />
                                                                                                                                    </ListItemIcon>
                                                                                                                                </div>
                                                                                                                            }  >
                                                                                                                            </StyledTreeItem>

                                                                                                                        </>
                                                                                                                    )
                                                                                                                ))}
                                                                                                                <StyledTreeItem />
                                                                                                            </StyledTreeItem>
                                                                                                        )
                                                                                                    ))}
                                                                                                    <StyledTreeItem />
                                                                                                </StyledTreeItem>
                                                                                            )

                                                                                        ))}
                                                                                        <StyledTreeItem />
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
    const { organization_status, organization_list, department_status, department_list, product_status, product_list, product_env_status, product_env_list, module_list, module_status, business_element_status, business_element_list } = state.hr;
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
        business_element_list
    };
}

const connectedDataSetup = connect(mapStateToProps)(CustomizedTreeView);
export default connectedDataSetup;
