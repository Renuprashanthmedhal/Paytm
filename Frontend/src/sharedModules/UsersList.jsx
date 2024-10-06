import { useNavigate } from "react-router-dom"

function UsersList({userList = []}){
    const navigate = useNavigate()
    const sendMoneyBtnHandler = (fullname, userid)=>{
        navigate("/transfer",{state:{fullname, userid}})
    }
return (
    <div >
        <div>
        {userList.length > 0 ? userList.map((user)=>{
            const fullName = user.firstname + user.lastname;
            return (
                <div key={user.userid} className=" flex justify-between w-full p-1 m-1 text-wrap">
                <h4 className="flex items-center">{fullName}</h4>
                <button className="p-1.5 m-1 bg-black text-white font-bold rounded" onClick={()=>sendMoneyBtnHandler(fullName,user.userid)}>Send Money</button>
                </div>
            )
        }) : <p>No records found.</p>}
        </div>
    </div>
)

}

export default UsersList