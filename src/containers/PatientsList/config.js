import {
  FacilityTypeRenderer
} from 'Components/CellRenderer';


export const CONFIG = {
  columnDefs: [
    { headerName: 'ICMR ID', field: 'idICMR' },
    { headerName: 'Govt. ID', field: 'idGovt' },
    { headerName: 'Facility ID', field: 'idFacility' },
    { headerName: 'Patient Name', field: 'patientName', minWidth: 120 },
    { headerName: 'Age', field: 'age', minWidth: 70 },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Clinical Status', field: 'clinicalStatus', minWidth: 125 },
    { headerName: 'Covid Status', field: 'covidStatus', minWidth: 125, },
    { headerName: 'Health Conditions', field: 'healthConditions', minWidth: 150 },
    { headerName: 'Admission Date', field: 'admissionDate', minWidth: 130 },
    { headerName: 'Discharge Date', field: 'dischargeDate', minWidth: 130 },
    { headerName: 'Patient District', field: 'patientDistrict', minWidth: 125 },
    { headerName: 'Facility Type', field: 'facilityType', cellRenderer: 'FacilityTypeRenderer' },
    { headerName: 'Facility', field: 'facility', },
    { headerName: 'Action', field: 'action' },
  ],
  defaultColDef: {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
  rowHeight: 76,
  headerHeight: 76,
  frameworkComponents: {
    FacilityTypeRenderer: FacilityTypeRenderer,
  }
};
