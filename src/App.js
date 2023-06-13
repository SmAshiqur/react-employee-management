import { Tab, Tabs } from "@mui/material";
import UserList from "./components/UserList";
import { useState } from "react";
import TabPanel from "./components/TabPanel";
import UserForm from "./components/UserForm";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab id={0} label="Admin" />
        <Tab id={1} label="Employee" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserList employeeType="Admin" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList employeeType="Employee" />
      </TabPanel>
      <UserForm />
    </div>
  );
}

export default App;
