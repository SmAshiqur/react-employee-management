import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleUser() {
  const { id } = useParams();
  const [individualEmp, setIndividualEmp] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`
      )
      .then((response) => {
        setIndividualEmp(response.data.readEmployeeData);
        // console.log(response.data.readEmployeeData);
      });
  }, [id]);

  return (
    <div className="mx-auto max-w-screen-sm border-2 my-20 p-8">
      {individualEmp.map((user) => (
        <div key={user.id}>
          <p>User Id: {user.empID}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Employee Type: {user.employeeType}</p>
          <p>Division Id: {user.divisionId}</p>
          <p>District Id: {user.districeID}</p>
          <p>Division: {user.disvision}</p>
          <p>District: {user.district}</p>
        </div>
      ))}
    </div>
  );
}

export default SingleUser;
