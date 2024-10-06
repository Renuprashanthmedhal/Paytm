import { useLocation } from "react-router-dom";
import ErrorMsg from "../sharedModules/ErrorMsg";
import { useEffect, useState } from "react";
import axios from "axios";

function Transfer() {
  const location = useLocation();
  const { fullname, userid } = location.state || {};
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [amountToSend, setAmountToSend] = useState("");
  const [transferRes, setTransferRes] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (transferRes) {
      setMsgColor(transferRes.success ? "green" : "red");
      setMsgToDisplay(transferRes.message);
      transferRes.success ?  setAmountToSend("") : null
     
    }
  }, [transferRes]);
  const intiateTransferBtnHandler = () => {
    setMsgToDisplay("");
    setMsgColor("");
    axios
      .post(
        "http://localhost:5001/api/v1/account/transfer",
        {
          amount: amountToSend,
          touserid: userid,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => setTransferRes(res.data))
      .catch((res) => setTransferRes(res.data));
  };
  return (
    <div className="grid place-items-center h-screen ">
      <div className="w-72  bg-white shadow-lg rounded-xl">
        <ErrorMsg color={msgColor} errMsg={msgToDisplay} />
        <div className="m-3">
          <h1 className="flex justify-center p-2 font-bold text-xl">
            Send Money
          </h1>
          <h3 className="p-1 ml-1 text-lg">{fullname}</h3>
          <h5 className="ml-1 p-1" htmlFor="friends">
            Amount (in Rs)
          </h5>
          <input
            className="border-2 w-60  p-1 ml-2 rounded"
            type="text"
            id="friends"
            autoComplete="off"
            placeholder="Enter amount"
            value={amountToSend}
            onChange={(e) => {setAmountToSend(e.target.value)}}
          />
          <button
            className="p-1.5 m-2 bg-green-500 text-white w-60 font-bold rounded"
            onClick={intiateTransferBtnHandler}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
