import { Tab, Tabs } from "@mui/material";
import UserList from "./UserList";
import { useState } from "react";
import TabPanel from "./TabPanel";

function User() {
  const [value, setValue] = useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mt-20 flex justify-center">
        <Tabs value={value} onChange={handleChange}>
          <Tab id={0} label="User" />
          <Tab id={1} label="Employees" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <UserList employeeType="Admin" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList Button="Button" employeeType="Employee" />
      </TabPanel>
    </div>
  );
}

export default User;
