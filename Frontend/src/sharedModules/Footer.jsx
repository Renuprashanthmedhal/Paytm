/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function Footer({text,topath,linkText}){
    return <div className="flex ml-1">
        <p className=" p-1">{text}</p>
        <Link className="p-1 text-blue-600" to={topath}>{linkText}</Link>
    </div>
}

export default Footer