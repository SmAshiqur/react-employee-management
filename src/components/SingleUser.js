import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleUser() {
  const { id } = useParams();
  const [individualEmp, setIndividualEmp] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`
      )
      .then((response) => {
        setIndividualEmp(response);
      });
  }, [id]);

  console.log(individualEmp);

  return <div>{JSON.stringify(individualEmp)}</div>;
}

export default SingleUser;
