import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import this.state.rowData from './aaps.json'
import { Padding } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '../assets/login.css';
import Excel from '../assets/images/icons/clipart2394456.png'
import Button from '@mui/material/Button';
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs:this.props.columnDefs,
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 100,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      defaultColDef: {
        resizable: true,
      },
      sideBar: {
        toolPanels: ['columns', 'filters'],
      },
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      excelStyles: [
        {
          id: 'fullName',
          dataType: 'Formula',
        },
      ],
     rowData: this.props.rowData,
     pagination:false
    };
   
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters')?.expandFilters();
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };
  render() {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            
          }}
          className="ag-theme-alpine"
        >
          {/* <div>
            <Button variant="outlined" className='mb-2' onClick={() => this.onBtExport()} >
              <img src={Excel} alt="" width={20} />
              <span className='ml-3' style={{color:"#6417c5"}}>Export to Excel</span>
            </Button>
          </div> */}
          <AgGridReact   
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            sideBar={this.state.sideBar}
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            rowData={this.props.rowData}
            pagination={true}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}


// var listOfDays = this.props?.rowData
// var daysValuesNotProvidedFilterParams = {
//   comparator: (a, b) => {
//     var aIndex = a == null ? -1 : listOfDays.indexOf(a);
//     var bIndex = b == null ? -1 : listOfDays.indexOf(b);
//     if (aIndex === bIndex) return 0;
//     return aIndex > bIndex ? 1 : -1;
//   },
// };
// var daysValuesProvidedFilterParams = {
//   values: listOfDays,
//   suppressSorting: true, // use provided order
// };


export default Table;