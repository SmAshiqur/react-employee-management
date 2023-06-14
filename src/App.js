import SingleUser from "./components/SingleUser";
import User from "./components/User";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<User />} path="/" />
      <Route element={<SingleUser />} path="/user/:id" />
    </Routes>
  );
}

export default App;
