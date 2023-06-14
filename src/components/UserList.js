import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function UserList({ employeeType }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClick = (id) => {
    navigate(`/user/${id}`);
  };

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

  const columns = [
    { field: "empID", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: "160",
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "employeeType",
      headerName: "Employee Type",
      width: 150,
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
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (row) => (
        <Button
          variant="outlined"
          onClick={() => handleButtonClick(row.row.empID)}
        >
          Details
        </Button>
      ),
    },
  ];

  const rows = users.map((userData) => ({
    empID: userData.empID,
    firstName: userData.firstName,
    lastName: userData.lastName,
    employeeType: userData.employeeType,
    divisionId: userData.divisionId,
    disvision: userData.disvision,
    districeID: userData.districeID,
    district: userData.district,
    actions: userData.actions,
  }));

  return (
    <div
      className="mx-auto max-w-full my-20"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="grid place-content-end">
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add User
        </Button>
      </div>

      <DataGrid
        rows={rows}
        getRowId={(row) => row.empID}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        components={{
          Toolbar: GridToolbarQuickFilter,
        }}
      >
        {(params) => (
          <div style={{ height: "100%", width: "100%" }}>
            {params.toolbar}
            {params.grid}
          </div>
        )}
      </DataGrid>

      <Modal open={open} onClose={handleClose} title="Add User" />
    </div>
  );
}
