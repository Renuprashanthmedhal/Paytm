import HeadText from "../sharedModules/HeadText";
import InputFields from "../sharedModules/InputFields";
import Button from "../sharedModules/Button";
import Footer from "../sharedModules/Footer";
import ErrorMsg from "../sharedModules/ErrorMsg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigation = useNavigate()
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [signUpres, setSignUpres] = useState({});
  const [values, setvalues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const handleChange = (name, event) => {
    
    setMsgToDisplay("");
    setMsgColor("");
    setvalues({
      ...values,
      [name]: event.target.value,
    });
  };
  useEffect(() => {
    if (signUpres) {
      setMsgColor(signUpres.success ? "green" : "red");
      setMsgToDisplay(signUpres.message);
      setTimeout(()=>{
          if(signUpres.success) navigation("/signin")

      },500)
    }
  }, [signUpres]);

  useEffect(()=>{
    setSignUpres({});
    setMsgToDisplay("");
    setMsgColor("");
  },[])
  const signUpBtnHandler = () => {
    console.log("signup btn")
    setMsgToDisplay("");
    setMsgColor("");
    axios
      .post("http://localhost:5001/api/v1/user/signup", values)
      .then((res) => {
        setSignUpres(res.data);
      })
      .catch((error) => {
        setSignUpres(error.response.data);
      });
  };
  return (
    <div className="grid place-items-center h-screen ">
      <div className="w-72 bg-white shadow-lg rounded-xl">
        <ErrorMsg color={msgColor} errMsg={msgToDisplay} />
        <HeadText
          addlInfo="Enter your information to create an account"
          headTitle="Sign up"
        />
        <InputFields
          id="firstname"
          title="First Name"
          onChangeHandler={handleChange}
          type="text"
        />
        <InputFields
          id="lastname"
          title="Last Name"
          onChangeHandler={handleChange}
          type="text"
        />
        <InputFields
          id="username"
          title="User Name"
          onChangeHandler={handleChange}
          type="text"
        />
        <InputFields
          id="password"
          title="Password"
          onChangeHandler={handleChange}
          type="password"
        />
        <Button btnTitle="Sign up" btnHandler={signUpBtnHandler} />
        <Footer
          text="Already have an account?"
          topath="/signin"
          linkText="Sign in"
        />
      </div>
    </div>
  );
}

export default SignUp;
