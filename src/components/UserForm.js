import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const UserForm = ({ initialValues }) => {
  const [selectedDivision, setSelectedDivision] = useState(0);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [newUser, setNewUser] = useState("");

  const isEditMode = !!initialValues;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/Division")
      .then((response) => {
        setDivisions(response.data.readDivisionData);
      });
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      axios
        .get(
          `http://59.152.62.177:8085/api/Employee/District/${selectedDivision}`
        )
        .then((response) => {
          setDistricts(response.data.readDistrictData);
        });
    }
  }, [selectedDivision]);

  const formik = useFormik({
    initialValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      employeeType: initialValues?.employeeType || "",
      divisionId: initialValues?.divisionId || 0,
      districeID: initialValues?.districeID || 0,
    },
    onSubmit: (values) => {
      setNewUser(values);
      if (isEditMode) {
        axios
          .put(
            `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${id}`,
            newUser
          )
          .then((response) => {});
      } else {
        axios
          .post(
            "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation",
            newUser
          )
          .then((response) => {
            console.log(JSON.stringify(response));
          });
      }
      console.log(values);
    },
  });

  return (
    <form
      className="mx-auto max-w-full p-20 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex-row mb-1">
        <TextField
          id="firstName"
          label="First Name"
          name="firstName"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />

        <TextField
          id="lastName"
          label="Last Name"
          name="lastName"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </div>

      <MenuItem disabled value="">
        <em>User Type</em>
      </MenuItem>
      <Select
        value={formik.values.employeeType}
        label="Employee Type"
        name="employeeType"
        onChange={formik.handleChange}
        placeholder="Employee Type"
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Employee">Employee</MenuItem>
      </Select>

      <MenuItem disabled value="">
        <em>Division</em>
      </MenuItem>
      <Select
        value={formik.values.divisionId}
        label="Division ID"
        name="divisionId"
        onChange={formik.handleChange}
      >
        {divisions.map((division) => {
          return (
            <MenuItem
              onClick={() => {
                setSelectedDivision(division.divID);
              }}
              value={division.divID}
            >
              {division.divisionName}
            </MenuItem>
          );
        })}
      </Select>

      <MenuItem disabled value="">
        <em>District</em>
      </MenuItem>
      <Select
        value={formik.values.districeID}
        label="District ID"
        name="districeID"
        onChange={formik.handleChange}
      >
        {districts.map((district) => {
          return (
            <MenuItem value={district.districtID}>
              {district.districtName}
            </MenuItem>
          );
        })}
      </Select>

      <div className="my-8 flex flex-col">
        <Button type="submit" variant="outlined" startIcon={<SaveIcon />}>
          Save
        </Button>
      </div>
    </form>
  );
};
export default UserForm;
