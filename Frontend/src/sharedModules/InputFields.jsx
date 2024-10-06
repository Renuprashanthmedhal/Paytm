/* eslint-disable react/prop-types */

function InputFields({id,title,onChangeHandler,type}){
   return( <div>
        <div>
        <h5 className="ml-1 p-2" htmlFor={id}>{title}</h5>
        <input className="border-2 w-60  p-1 ml-2 rounded" autoComplete="off" type={type} id={id} placeholder={`Please enter ${title}`} onChange={(event) => onChangeHandler(id,event)}/>
        </div>
    </div>
   )
}

export default InputFields