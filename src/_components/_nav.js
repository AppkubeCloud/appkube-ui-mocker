import 'react-pro-sidebar/dist/css/styles.css'
import SecurityIcon from '@mui/icons-material/Security';
const _nav = [

    {
        _tag: 'SidebarNavItem',
        name: 'CMDB Data Setup',
        open: false,
        icon: <i className="fa fa-database" aria-hidden="true"></i>,
        children: [
            // {
            //     _tag: 'SidebarNavItem',
            //     name: 'Data Setup',
            //     to: '/postlogin/data-setup',
            //     activeArr: ['/postlogin/data-setup'],
            //     open: false,
            // },
            {
                _tag: 'SidebarNavItem',
                name: 'Organization',
                to: '/postlogin/organization',
                activeArr: ['/postlogin/organization'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Department',
                to: '/postlogin/department',
                activeArr: ['/postlogin/department'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Product',
                to: '/postlogin/product',
                activeArr: ['/postlogin/product'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Product Env',
                to: '/postlogin/product-env',
                activeArr: ['/postlogin/product-env'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Module',
                to: '/postlogin/module',
                activeArr: ['/postlogin/module'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Business Element',
                to: '/postlogin/business-element',
                activeArr: ['/postlogin/business-element'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Budget',
                to: '/postlogin/budget',
                activeArr: ['/postlogin/budget'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'DB Category',
                to: '/postlogin/db_category',
                activeArr: ['/postlogin/db_category'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Landingzone',
                to: '/postlogin/landingzone',
                activeArr: ['/postlogin/landingzone'],
                open: false,
            },

            {
                _tag: 'SidebarNavItem',
                name: 'Product Enclave',
                to: '/postlogin/product-enclave',
                activeArr: ['/postlogin/product-enclave'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'Cloud Element',
                to: '/postlogin/cloud-element',
                activeArr: ['/postlogin/cloud-element'],
                open: false,
            },
        ]
    },
    {
        _tag: 'SidebarNavItem',
        name: 'CMDB Data Tree',
        to: '/postlogin/data-tree',
        activeArr: ['/postlogin/data-tree'],
        open: false,
        icon: <i className="fa-solid fa-tree"></i>,
    },
    {
        _tag: 'SidebarNavItem',
        name: 'Security Data Setup',
        open: false,
        activeArr: ['/postlogin/security-organization'],
        open: false,
        icon: <SecurityIcon/>,
        children: [
            {
                _tag: 'SidebarNavItem',
                name: 'Security Organization',
                to: '/postlogin/security-organization',
                activeArr: ['/postlogin/security-organization'],
                open: false,
            },
            {
                _tag: 'SidebarNavItem',
                name: 'User',
                to: '/postlogin/security-user',
                activeArr: ['/postlogin/security-user'],
                open: false,
            }
        ]
    },


]


export default _nav;