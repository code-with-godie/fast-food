import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, useLocation } from "react-router-dom";
import view from '../../../assets/view.svg'
import deleteIcon from '../../../assets/delete.svg'
import { useSelector } from "react-redux";
import Model from "../model/Model";

const DataTable = (props) => {
  const location = useLocation();
  const show = location.pathname.startsWith('/products')
  const currentUser = useSelector(state => state.user.currentUser);

  const handleDelete = (id) => {
  };

  const actionColumn= {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {
            currentUser?._id === params.row._id  || show || currentUser?.role === 'admin'?
          <Link to={`/${props.slug}/${params.row._id}`}>
            <img src={view} alt="" />
          </Link>: <button>not allowed</button>
           }
          { 
            (currentUser?.role === 'admin'  ||  currentUser?._id === params.row._id   || show) &&
          <div className="delete" onClick={() => handleDelete(params.row._id)}>
            <img src={deleteIcon} alt="" />
          </div>
          }
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
