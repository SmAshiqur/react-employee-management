import React, { useEffect, useState } from "react";
import axios from "axios";

function UserCreate({ EmpId }) {
  const [newUser, setNewUser] = useState(0);

  useEffect(() => {
    axios
      .post(
        `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${EmpId}`
      )
      .then((response) => {
        console.log(response);
      });
  }, []);

  return <div></div>;
}

export default UserCreate;
