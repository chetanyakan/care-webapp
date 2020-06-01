import {
  DownloadIconRenderer,
  DateRenderer
} from 'Components/CellRenderer';

import { GRID_CONFIG } from 'Constants/app.const';


export const CONFIG = {
  columnDefs: [
    { headerName: 'Facility Name', field: 'facility', minWidth: 150, cellRendererParams: { filterType: 'boolean', options: [] } },
    { headerName: 'Name', field: 'name', minWidth: 100, cellRendererParams: { filterType: 'string', isSortable: true, } },
    { headerName: 'Phone Number', field: 'phone_number', minWidth: 150, cellRendererParams: { filterType: 'string', isSortable: true, } },
    { headerName: 'Email', field: 'email', minWidth: 200, editable: true, cellRendererParams: {
      isSortable: true,
      filterType: 'string'
    }},
    { headerName: 'Designation', field: 'designation', minWidth: 80, editable: true, cellRendererParams: {
      isSortable: true,
      filterType: 'boolean',
      options: []
    }}
  ],
  defaultColDef: {
    editable: GRID_CONFIG.editable,
    sortable: GRID_CONFIG.sortable,
    resizable: GRID_CONFIG.resizable,
    filter: GRID_CONFIG.filter,
    flex: GRID_CONFIG.flex,
    minWidth: GRID_CONFIG.minWidth,
  },
  pagination: GRID_CONFIG.pagination,
  rowHeight: GRID_CONFIG.rowHeight,
  headerHeight: GRID_CONFIG.headerHeight,
  suppressContextMenu: GRID_CONFIG.suppressContextMenu,
  frameworkComponents: {
    downloadIconRenderer: DownloadIconRenderer,
    dateRenderer: DateRenderer,
  }
};
