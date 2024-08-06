// src/pages/Users/Users.tsx

import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { userRows } from "../../data";

interface IUserRow {
  id: number;
  img?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  verified: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 130,
    renderCell: (params) => (
      <Link to={`/user/${params.row.id}`}>{params.row.firstName}</Link>
    ),
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows as IUserRow[]} />
    </div>
  );
};

export default Users;
