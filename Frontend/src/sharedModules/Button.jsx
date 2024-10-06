/* eslint-disable react/prop-types */

function Button({btnHandler,btnTitle}){
    return (<div className="ml-1 pt-1">
        <button className="p-1.5 m-1 bg-black text-white w-60 font-bold rounded" onClick={btnHandler}>{btnTitle}</button>
    </div>)
}

export default Button