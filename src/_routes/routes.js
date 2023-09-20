import React from 'react';
// const DataSetup = React.lazy(() => import('../Pages/DataView/DataSetup'));
const DataTree = React.lazy(() => import('../Pages/DataTree/DataTree'));
const Organization = React.lazy(() => import('../Pages/SetupData/Organization'));
const Department = React.lazy(() => import('../Pages/SetupData/Department'));
const Product= React.lazy(() => import('../Pages/SetupData/Product'));
const ProductEnv= React.lazy(() => import('../Pages/SetupData/ProductEnv'));
const Module= React.lazy(() => import('../Pages/SetupData/Module'));
const BusinessElement= React.lazy(() => import('../Pages/SetupData/BusinessElement'));
const Budget= React.lazy(() => import('../Pages/SetupData/Budget'));
const DbCategory= React.lazy(() => import('../Pages/SetupData/DbCategory'));
const SecurityOrganization= React.lazy(() => import('../Pages/Security/SecurityOrganization'));
const Landingzone= React.lazy(() => import('../Pages/SetupData/Landingzone'));
const User= React.lazy(() => import('../Pages/Security/User'));
const ProductEnclave= React.lazy(() => import('../Pages/SetupData/ProductEnclave'));
const CloudElement= React.lazy(() => import('../Pages/SetupData/CloudElement'));
const routes = [
    // { path: '/postlogin/data-setup', exact: true, name: 'Data Setup', component: DataSetup },
    { path: '/postlogin/data-tree', exact: true, name: 'Data Tree', component: DataTree },
    { path: '/postlogin/organization', exact: true, name: 'Organization', component: Organization },
    { path: '/postlogin/department', exact: true, name: 'Department', component: Department },
    { path: '/postlogin/product', exact: true, name: 'Product', component: Product },
    { path: '/postlogin/product-env', exact: true, name: 'Product Env', component: ProductEnv },
    { path: '/postlogin/module', exact: true, name: 'Module', component: Module },
    { path: '/postlogin/business-element', exact: true, name: 'Business Element', component: BusinessElement },
    { path: '/postlogin/budget', exact: true, name: 'Budget', component: Budget },
    { path: '/postlogin/db_category', exact: true, name: 'DB Category', component: DbCategory },
    { path: '/postlogin/landingzone', exact: true, name: 'Landingzone', component: Landingzone },
    { path: '/postlogin/security-organization', exact: true, name: 'Security Organization', component: SecurityOrganization },
    { path: '/postlogin/security-user', exact: true, name: 'User', component: User },
    { path: '/postlogin/product-enclave', exact: true, name: 'Product Enclave', component: ProductEnclave },
    { path: '/postlogin/cloud-element', exact: true, name: 'Cloud Element', component: CloudElement },


]

export default routes;