import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./components/Transfer";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
