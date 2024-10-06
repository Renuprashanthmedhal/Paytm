import {useState, useEffect} from 'react';
import HeadText from "../sharedModules/HeadText";
import InputFields from "../sharedModules/InputFields";
import Button from "../sharedModules/Button";
import Footer from "../sharedModules/Footer";
import ErrorMsg from "../sharedModules/ErrorMsg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigation = useNavigate()
    const [msgToDisplay, setMsgToDisplay] = useState("");
    const [msgColor, setMsgColor] = useState("");
    const [signInres, setSignInres] = useState({});
    const [values, setvalues] = useState({
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
      if (signInres) {
        setMsgColor(signInres.success ? "green" : "red");
        setMsgToDisplay(signInres.message);
        localStorage.setItem("token",signInres.token)
        setTimeout(()=>{
            if(signInres.success) navigation("/dashboard")
        },500)
      }
    }, [signInres]);
  
    useEffect(()=>{
      setSignInres({});
      setMsgToDisplay("");
      setMsgColor("");
    },[])
    const signInBtnHandler = () => {
      setMsgToDisplay("");
      setMsgColor("");
      axios
        .post("http://localhost:5001/api/v1/user/signin", values)
        .then((res) => {
          setSignInres(res.data);
        })
        .catch((error) => {
          setSignInres(error.response.data);
        });
    };
  return (
    <div className="grid place-items-center h-screen ">
      <div className="w-72 bg-white shadow-lg rounded-xl">
        <ErrorMsg color="green" />
        <HeadText
          addlInfo="Enter your credentials to access your account"
          headTitle="Sign in"
        />
        <InputFields id="username" type="text" title="User Name" onChangeHandler={handleChange} />
        <InputFields id="password" type="password" title="Password" onChangeHandler={handleChange}/>
        <Button btnTitle="Sign in" btnHandler={signInBtnHandler} />
        <Footer text="Don't have an account?" topath="/" linkText="Sign up" />
      </div>
    </div>
  );
}

export default SignIn;
