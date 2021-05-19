import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import './Register.scss'
import {Button} from 'react-bootstrap';
import { APIlink } from "../../Helper";
import Header from '../../components/Header/Header';
import AuthRequired from './AuthRequired';


const Submit = styled(Button)`
  width: 200px;
  cursor: ${(props) =>
    props.loginState == "empty"
      ? "default"
      : props.loginState == "filled"
      ? "pointer"
      : ""};
  background-color: ${(props) =>
    props.loginState == "empty"
      ? "#cacaca"
      : props.loginState == "filled"
      ? "#24ca7a"
      : ""};
  &:hover {
    background-color: ${(props) =>
      props.loginState == "empty"
        ? "#cacaca"
        : props.loginState == "filled"
        ? "#05a16d"
        : ""};
  }
`;

function Register() {

    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [rollno, setRollno] = React.useState("");
    const [fullname, setFullname] = React.useState("");
    const [phoneno, setPhoneno] = React.useState("");
    const [err, setErr] = React.useState(null);
    const [emailErr, setEmailErr] = React.useState({});
    const [phonenoErr, setPhonenoErr] = React.useState({});


    const history = useHistory();

    const handleSubmit = async (event, password, email) => {
        event.preventDefault();

        const isValid = formValidation();

        if(isValid) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic abc:test");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        email: email,
        password: password,
        rollno: rollno,
        fullname: fullname,
        phoneno: phoneno,
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let response;

        try {
            response = await fetch (`${APIlink}/users`, requestOptions)
        } catch (err) {
            setErr("Incorrect Password. Please Retry.");
            return;
        }
        const result = await response.text();
        //console.log(result);
        const json = JSON.parse(result);
        //console.log(json);
        //console.log(response);
        

        if (response.status===200) {
            setErr(null);
            localStorage.setItem('isAuthenticated', true);
            //context.updateToken(JSON.stringify(json.data));
            history.push("/Projects");
            } else {
            setErr(json.error);
            console.log(json.error);
            }
          }

        };

    const formValidation = () => {
      const emailErr = {};
      const phonenoErr = {};
      let isValid = true;
      var regex = /\S+@iitkgp\.ac\.in$/;
      var result = regex.test(email);
      if(result == true){
          isValid = true;
      }
      else{
        emailErr.wrongFormat = "Incorrect format";
        isValid = false;
      }
      if(phoneno.trim().length < 10) {
        phonenoErr.phonenoShort = "Password must be atleast 6 characters long";
        isValid = false;
      }

      setEmailErr(emailErr);
      setPhonenoErr(phonenoErr);
      return isValid;
    } 

        return (
            <div>
                <Header />
            <div className="register row justify-content-center align-items-center">

             <div className = "w-50 p-3">
                <h1>Sign up</h1>
                <Link to="/Login">or login to your account</Link>
                <br></br>
                <br></br>
                <form>
                <div className="input-group mb-3">
                <input type="text" id="email"   
                value={email}
                onChange= {(event) => {
                    setErr("");
                    setEmail(event.target.value); }}
                className="form-control form-control-lg" placeholder=" institute email" aria-label="institute-email" aria-describedby="basic-addon2"/>
                </div>
                {Object.keys(emailErr).map((key)=>{
                  return <div style={{color:"red"}}>{emailErr[key]}</div>
                })}
                


                <div className="input-group mb-3">
                <input type="text" id="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setErr("");
                }}
                className="form-control form-control-lg" placeholder="password" aria-label="password" aria-describedby="basic-addon2"/>
                </div>

                <div className="input-group mb-3">
                <input type="text" id="rollno"
                value={rollno}
                onChange={(event) => {
                    setRollno(event.target.value);
                    setErr("");
                }}
                className="form-control form-control-lg" placeholder="roll number" aria-label="rollno" aria-describedby="basic-addon2"/>
                </div>

                <div className="input-group mb-3">
                <input type="text" id="fullname"
                value={fullname}
                onChange={(event) => {
                    setFullname(event.target.value);
                    setErr("");
                }}
                className="form-control form-control-lg" placeholder="full name" aria-label="fullname" aria-describedby="basic-addon2"/>
                </div>

                <div className="input-group mb-3">
                <input type="number" id="phoneno"
                value={phoneno}
                onChange={(event) => {
                    setPhoneno(event.target.value);
                    setErr("");
                }}
                className="form-control form-control-lg" placeholder="phone number" aria-label="phoneno" aria-describedby="basic-addon2"/>
                </div>
                {Object.keys(phonenoErr).map((key)=>{
                  return <div style={{color:"red"}}>{phonenoErr[key]}</div>
                })}

               

                
                <Submit
                //loginState={loginState}
                onClick={(event) => {
                  event.preventDefault();
                  if (email != "" && password != "" && rollno != "" && fullname != "" && phoneno != "") {
                    handleSubmit(event, password, email, rollno, fullname, phoneno);
                  } else {
                    setErr("Fields can't be left empty");
                  }
                }}
              >
                {" "}
                Sign up
              </Submit>
               
                </form>
                </div>
                
                
                

            </div>
            </div>
        )
    }


export default Register;