import React, {Component} from 'react';
// import './Home.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Project/footerComponent';
import homepageURL from '../../components/Assets/homepicture.svg';
import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './custom.scss'
import { HashRouter, Route, Link, Switch } from "react-router-dom";





class Home extends Component{
  /*constructor(props){
    super(props);
    this.enableButton = this.enableButton.bind(this);
  }
  

  enableButton(){
    var selectelem = document.getElementById('inputGroupSelect04');
    var btnelem = document.getElementById('find-projects');
    btnelem.disabled = !selectelem.value;
  }*/
  

  render(){
    return (
    <div>
    <Header/>
      <br/><br/><br/><br/><br/>
      <div className="container" style={{padding: "2rem"}}>
        <div className="row">
            <div className="column first">
                <h1>Interested in Research?</h1>
                
                <p><span> Apply for projects from across IITs</span></p> 

                <div className="input-group">
                  <select className="custom-select" id="inputGroupSelect04" >
                    <option selected>Choose your college...</option>
                    <option value="1">IIT Kharagpur</option>
                    <option value="2">IIT Bombay</option>
                    <option value="3">IIT Kanpur</option>
                    <option value="4">IIT Madras</option>
                    <option value="5">IIT Roorkee</option>
                  </select>
                  <div className="input-group-append">
                    <Link to="/Register"><button className="btn btn-outline-secondary" type = "button" id="find-projects" >find projects</button></Link>
                  </div>
                </div>
                               
            </div>
            <div className="column second">   
                
                
            </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
}}
  
  export default Home;