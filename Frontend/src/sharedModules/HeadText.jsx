/* eslint-disable react/prop-types */

function HeadText({addlInfo,headTitle}){
    return (

        <div>
        <h1 className="flex justify-center p-2 font-bold text-xl">{headTitle}</h1>
        <h5 style={{color:"#5a5f68"}} className=" ml-1 p-1">{addlInfo}</h5>
    </div>
    )
}

export default HeadText