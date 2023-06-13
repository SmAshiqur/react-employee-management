import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
const columns = [
  { field: "empID", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "employeeType",
    headerName: "Employee Type",
    width: 180,
  },
  {
    field: "divisionId",
    headerName: "Division ID",
    width: 180,
  },
  {
    field: "disvision",
    headerName: "Division",
    width: 180,
  },
  {
    field: "districeID",
    headerName: "District ID",
    width: 180,
  },
  {
    field: "district",
    headerName: "District",
    width: 180,
  },
];

export default function UserList({ employeeType }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
      .then((response) => {
        setUsers(
          response.data.readEmployeeData.filter(
            (data) => data.employeeType === employeeType
          )
        );
      });
  }, [employeeType]);

  const rows = users.map((userData) => ({
    empID: userData.empID,
    firstName: userData.firstName,
    lastName: userData.lastName,
    employeeType: userData.employeeType,
    divisionId: userData.divisionId,
    disvision: userData.disvision,
    districeID: userData.districeID,
    district: userData.district,
  }));

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button variant="outlined" startIcon={<AddIcon />}>
        Add User
      </Button>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.empID}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
