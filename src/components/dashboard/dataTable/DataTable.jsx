import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, useLocation } from "react-router-dom";
import view from '../../../assets/view.svg'
import deleteIcon from '../../../assets/delete.svg'
import Model from "../model/Model";

const DataTable = (props) => {
  const update = (row)=>{
    props.setProduct(row);
    props.updateProduct(true)
  }
  const location = useLocation();
  const show = location.pathname.startsWith('/products')

  const actionColumn= {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div  className="action">
          <div onClick={() =>{ update(params.row)}}>
            <img src={view} alt="" />
          </div>
          <div className="delete" onClick={() => props.handleDelete(params.row._id)}>
            <img src={deleteIcon} alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        getRowId={row => row._id}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
