import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./dataTable.scss";

interface IDataTable {
  columns: GridColDef[];
  rows: any[];
  slug: string;
}

const DataTable = ({ columns, rows, slug }: IDataTable) => {
  const [data, setData] = useState(rows);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEditConfirmation, setOpenEditConfirmation] =
    useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "edit" | "delete" | null
  >(null);
  const [editFormData, setEditFormData] = useState<any>({});

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setSelectedAction("delete");
    setOpenDelete(true);
  };

  const handleEdit = (id: number, row: any) => {
    setSelectedId(id);
    setSelectedAction("edit");
    setEditFormData(row);
    setOpenEditConfirmation(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      const updatedData = data.filter((item) => item.id !== selectedId);
      setData(updatedData);
      setOpenDelete(false);
      setSelectedId(null);
    }
  };

  const cancelDelete = () => {
    setOpenDelete(false);
    setSelectedId(null);
  };

  const confirmEdit = () => {
    setOpenEditConfirmation(false);
    setOpenEditForm(true);
  };

  const confirmEditForm = () => {
    if (selectedId !== null) {
      const updatedData = data.map((item) =>
        item.id === selectedId ? { ...item, ...editFormData } : item
      );
      setData(updatedData);
      setOpenEditForm(false);
      setSelectedId(null);
    }
  };

  const cancelEdit = () => {
    setOpenEditForm(false);
    setSelectedId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="action">
          <div
            className="edit"
            onClick={() => handleEdit(params.row.id, params.row)}
          >
            <img src="/edit.svg" alt="Edit" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />

      {/* Confirmation Dialog for Delete */}
      {openDelete && (
        <div className="confirmDialog">
          <div className="confirmDialogContent">
            <h3>Are you sure you want to delete this item?</h3>
            <div className="confirmDialogButtons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Edit */}
      {openEditConfirmation && (
        <div className="confirmDialog">
          <div className="confirmDialogContent">
            <h3>Are you sure you want to edit this item?</h3>
            <div className="confirmDialogButtons">
              <button onClick={confirmEdit}>Yes</button>
              <button onClick={() => setOpenEditConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Dialog */}
      {openEditForm && (
        <div className="editFormDialog">
          <div className="editFormDialogContent">
            <h3>Edit Item</h3>
            <form>
              <div className="formGroup">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={editFormData.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={editFormData.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Created At:</label>
                <input
                  type="text"
                  name="createdAt"
                  value={editFormData.createdAt || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Verified:</label>
                <input
                  type="checkbox"
                  name="verified"
                  checked={editFormData.verified || false}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      verified: e.target.checked,
                    })
                  }
                />
              </div>
              <div className="editFormDialogButtons">
                <button type="button" onClick={confirmEditForm}>
                  Save
                </button>
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
