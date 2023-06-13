import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";

const UserForm = ({ valueFromTheActualForm }) => {
  const [selectedDivision, setSelectedDivision] = useState(0);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

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
      firstName: "",
      lastName: "",
      employeeType: "",
      divisionId: 0,
      districeID: 0,
    },
    onSubmit: (values) => {
      //   valueFromTheActualForm(values);
      console.log(values);
    },
  });

  return (
    <form
      className="mx-auto max-w-screen-lg pt-20 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
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

      <button className="border p-4 bg-cyan-100" type="submit">
        Save
      </button>
    </form>
  );
};
export default UserForm;
