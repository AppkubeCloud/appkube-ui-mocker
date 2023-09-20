import React from 'react';
import { DatePicker } from "@y0c/react-datepicker";



const OnBoardingForm = {
  "form": {
    "organization": [
      {
        "order": 1,
        "organization_title": "Organization",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          }
        ]
      }
    ],
    "department": [
      {
        "order": 1,
        "department_title": "Department",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [

            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          }
        ]
      }
    ],
    "product": [
      {
        "order": 1,
        "product_title": "Product",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "product",
            "lable": "Product",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "product_env": [
      {
        "order": 1,
        "product_env_title": "Product Env",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "product",
            "lable": "Product",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },

          {
            "name": "productEnv",
            "lable": "Product Env",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "module": [
      {
        "order": 1,
        "module_title": "Module",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "product",
            "lable": "Product",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "productEnv",
            "lable": "Product Env",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },

          {
            "name": "module",
            "lable": "Module",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "business_element": [
      {
        "order": 1,
        "business_element_title": "Business Element",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "product",
            "lable": "Product",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "productEnv",
            "lable": "Product Env",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "module",
            "lable": "Module",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },

          {
            "name": "businessElement",
            "lable": "Business Element",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "budget": [
      {
        "order": 1,
        "budget_title": "Budget",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [

            ],
            "html_element": "select"
          },
          {
            "name": "budget",
            "lable": "Budget",
            "required": false,
            "data_type": "number",
            "html_element": "number"
          }
        ]
      }
    ],
    "dbCategory": [
      {
        "order": 1,
        "dbCategory_title": "DB Category",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [

            ],
            "html_element": "select"
          },
          {
            "name": "dbCategory",
            "lable": "DB Category",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          }
        ]
      }
    ],
    "securityOrganization": [
      {
        "order": 1,
        "security_organization_title": "Security Organization",
        "fields": [
          {
            "name": "securityOrganization",
            "lable": "Security Organization",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "cmdbCheack",
            "label": "Push to CMDB",
            "required": false,
            "data_type": "Checkbox",
            "html_element": "Checkbox"
          },
        ]
      }
    ],
    "user": [
      {
        "order": 1,
        "user_title": "User",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "userName",
            "lable": "Name",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "userEmail",
            "lable": "Email",
            "required": false,
            "data_type": "email",
            "html_element": "email"
          },
          {
            "name": "userPassword",
            "lable": "Password",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "cmdbCheack",
            "aria-label": "Push to CMDB",
            "required": false,
            "data_type": "Checkbox",
            "html_element": "Checkbox"
          },
        ]
      }
    ],
    "landingZone": [
      {
        "order": 1,
        "landingZone_title": "Landing Zone",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "cloud",
            "lable": "Cloud",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "displayName",
            "lable": "Display Name",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "roleArn",
            "lable": "Role Arn",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "externalId",
            "lable": "External Id",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "landingzone",
            "lable": "Landing Zone",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "product_enclave": [
      {
        "order": 1,
        "product_enclave_title": "Product Enclave",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "landingzone",
            "lable": "Landing Zone",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "elementType",
            "lable": "Element Type",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "region",
            "lable": "Region",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
    "cloud_element": [
      {
        "order": 1,
        "cloud_element_title": "Cloud Element",
        "fields": [
          {
            "name": "organization",
            "lable": "Organization",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "department",
            "lable": "Department",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "landingzone",
            "lable": "Landing Zone",
            "required": false,
            "data_type": "String",
            "option": [
            ],
            "html_element": "select"
          },
          {
            "name": "elementType",
            "lable": "Element Type",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
          {
            "name": "region",
            "lable": "Region",
            "required": false,
            "data_type": "String",
            "html_element": "textbox"
          },
        ]
      }
    ],
  }
};

export default OnBoardingForm;
export const ExportName = OnBoardingForm;
