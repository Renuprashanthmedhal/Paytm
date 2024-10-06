import { useState, useEffect } from "react";
import ErrorMsg from "../sharedModules/ErrorMsg";
import UsersList from "../sharedModules/UsersList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [balanceAmt, setBalanceAmt] = useState("");
  const [usersList, setUsersList] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/account/balance", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => setBalanceAmt(res.data.balance.balance.toFixed(2)))
      .catch((err) => {
        localStorage.deleteItem("token")
        navigate("/signin");
      });
      getTheUsersList();
      
  },[]);

  const getTheUsersList =(queryParam = "")=>{
    axios
      .get(`http://localhost:5001/api/v1/user/bulk?filter=${queryParam}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => setUsersList(res.data.users))
      .catch((err) => {
        localStorage.deleteItem("token")
        navigate("/signin");
      });
  }

  const handleQueryChange=(e)=>{
    getTheUsersList(e.target.value);
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className=" w-1/2 h-full bg-white rounded ">
        <ErrorMsg color="green" />
        <div className="flex justify-between border-b-2 border-gray-400">
          <h3 className="p-2 m-1">PayTM App</h3>
          <div className="flex">
            <h3 className="p-2 m-1">Hello</h3>
          </div>
        </div>
        <div className="font-bold">
          <div className="p-2 m-1">
            <h3 className="p-1 m-1">Your balance is Rupees {balanceAmt}</h3>
            <h5 className="ml-1 p-1" htmlFor="users">
              Users
            </h5>
            <input
              className="border-2 w-full p-1 ml-1 rounded"
              type="text"
              id="users"
              placeholder="Search Users"
              onChange={handleQueryChange}
            />
            <UsersList userList={usersList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
