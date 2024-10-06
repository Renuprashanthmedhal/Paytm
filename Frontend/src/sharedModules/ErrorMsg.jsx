function ErrorMsg({errMsg,color}){
    return (
        <div className={errMsg ? `bg-${color}-500 p-1 rounded-t` : ""}>
            <h5>{errMsg}</h5>
            
        </div>
    )
}

export default ErrorMsg