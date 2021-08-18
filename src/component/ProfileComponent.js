import React,{Component} from 'react'

import avatar from '../images/avatar.png';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import ReactDOM from 'react-dom';

class ProfileComponent extends Component{

   

    constructor() {
        super();
        this.state = {
            "msg": "",
            "output": {
                "candidateId": "",
                "aliasName": null,
                "firstName": "",
                "middleName": null,
                "lastName": "",
                "profileTitle": "",
                "interViewMode": null,
                "interviewStatuses": null,
                "isDeleted": false,
                "birthDate": null,
                "password": null,
                "workExperience": "",
                "releventExperience": "",
                "comment": null,
                "hiringType": null,
                "email": "",
                "alternateEmail": null,
                "createdAt": "",
                "updatedAt": "",
                "coverLetter": null,
                "summary": "NA",
                "placeOfBirth": "NA",
                "maritalStatus": "",
                "addresses": null,
                "isAvatarUploaded": null,
                "isResumeUploaded": null,
                "salaryTypes": null,
                "phones": null,
                "mobiles": null,
                "workAuthorizations": null,
                "documents": null,
                "skils": null,
                "educationEntries": null,
                "experienceEntries": null,
                "socialProfiles": null,
                "hobbies": null,
                "languages": null,
                "jobLocations": null
            },
            "httpStatus": ""
        };
      }


    componentDidMount(){

    

        const config = {
          baseURL: 'http://localhost:9999/',
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization' : 'Bearer ' +  localStorage.getItem('token')
           
          }
        };
    
        const instance = axios.create(config);
        
        
        instance.get('auth/user/me').then(
          res => {
            
            updateAppState(res.data);

            
            const configClient = {
                baseURL: 'http://localhost:9000/',
                headers: {
                "Access-Control-Allow-Origin": "*",
                'Authorization' : 'Bearer ' +  localStorage.getItem('token')
                
                }
            };
      
          const instanceClient = axios.create(configClient);

          instanceClient.get('resource/candidate/find/fullCandidate/byEmail?email='+res.data.name)
          .then( res => {
            console.log("Success---- " + JSON.stringify(res.data));
          


           
           this.setState(res.data);

          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1");
          });

            

           
            
          },
          err => {
            updateAppState({ authenticated: false})
            console.log("erroe2");
            
          }
        )
        
      }




    render(){
        return(
            <div>
              
            <div className="container-fluid">

            <div className="row content">

                <div className="col-sm-9">

                    <div className="container-fluid overcover">
                        <div className="container profile-box">
                            <div className="row">
                                <div className="col-md-4 left-co">
                                    <div className="left-side">
                                        <div className="profile-info">




                                            <img src={avatar} alt="" className="image" id="avatarImage"></img> 
                                            
                                            <div className="middle">
                                                <a data-toggle="modal" data-target="#avatarModel" href="#"
                                                    style={{ float: "right", color: "white"}} className="text">
                                                        <i className="fa fa-edit"></i>Edit</a>
                                            </div>

                                            <h3>
                                                <span id="firstNameAvatar" style={{ fontSize: "16px"}}>{this.state.output.firstName}</span> 
                                                <span id="lastNameAvatar" style={{ fontSize: "16px" }}>{this.state.output.lastName}</span>
                                            </h3>
                                            <span id="profileTitleAvatar" style={{fontSize: "12px" }} >{this.state.output.profileTitle}</span>
                                        </div>

                                        <h4 class="ltitle">
                                            Contact <a
                                                data-toggle="modal" data-target="#contactModel" href="#"
                                                style={{ float: "right" , color: "white"}}><i
                                                className="fa fa-edit"></i>Edit</a>
                                        </h4>
                                        <div className="contact-box pb0">
                                            <div className="icon">
                                                <i className="fa fa-phone"></i>
                                            </div>
                                            <div className="detail" id="contactFragment">

                                                <div >
                                                    <span>900008765</span>
                                                </div>




                                            </div>
                                        </div>
                                        <div className="contact-box pb0">
                                            <div className="icon">
                                                <i className="fas fa-globe-americas"></i>
                                            </div>
                                            <div class="detail">
                                                <span >dipankar0007@gmail.com</span> <br/> 
                                                <span>dipankar0007alt@gmail.com</span>
                                            </div>
                                        </div>
                                        

                                        <h4 class="ltitle">
                                            Social Profile <a
                                                data-toggle="modal" data-target="#socialModel" href="#"
                                                style={{ float: "right", color: "white" }}><i
                                                className="fa fa-edit"></i>Edit</a>

                                        </h4>
                                        <ul className="row social-link no-margin" id="socialFragment">
                                            <li>
                                                <i className="fab fa-facebook-f"></i>
                                                <span style={{ marginLeft: "10px" }} >FaceBook</span>

                                            </li>
                                            <li>
                                                <i className="fab fa-twitter"></i>
                                                <span style={{marginLeft: "10px"}} >Twitter</span>
                                            </li>
                                            <li>
                                                <i className="fab fa-linkedin-in"></i>
                                                <span style={{marginLeft: "10px"}} >linkedin</span>
                                            </li>
                                            <li>
                                                <i className="fab fa-github"></i>
                                                <span style={{marginLeft: "10px"}} >github</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-exclamation"></i>
                                                <span style={{marginLeft: "10px"}} >exclamation</span>
                                            </li>
                                        </ul>
                                       

                                        <h4 className="ltitle">
                                            Hobbies <a 
                                                data-toggle="modal" data-target="#hobbyModel" href="#"
                                                style={{float: "right" , color: "white"}}>
                                                    <i className="fa fa-edit"></i>Edit</a>
                                            </h4>
                                            <ul className="hoby row no-margin" id="hobbyFragment">
                                            <li>
                                                <i className="fas fa-pencil-alt"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-bicycle"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-futbol"></i> 
                                                <br/> 
                                                <span>pencil</span> 
                                            </li>
                                            <li>
                                                <i className="fas fa-film"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-plane-departure"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-gamepad"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                            <li>
                                                <i className="fas fa-exclamation"></i>
                                                <br/> 
                                                <span>pencil</span>
                                            </li>
                                        </ul>


                                        

                                        <h4 className="ltitle">
                                            Languages <a 
                                                data-toggle="modal" data-target="#languageModel" href="#"
                                                style={{float: "right" , color: "white"}}>
                                                    <i className="fa fa-edit"></i>Edit</a>
                                        </h4>
                                        <span>Language</span>&nbsp;&nbsp; <span
                                           >Read</span>&nbsp;&nbsp; <span>Write</span>&nbsp;&nbsp;
                                        <span>speak</span>
                                        <div className="lnguage row no-margin" id="languageFragment">
                                            <div>
                                                <span>English</span> --> &nbsp;<span
                                                    >Yes</span> &nbsp;&nbsp;&nbsp;&nbsp;<span
                                                    >No</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>Yes</span> <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 rt-div">
                                    <div className="rit-cover">
                                        <div className="hotkey">
                                            <h1 className="">
                                                <span id="firstNameView"
                                                    >Dipankar</span> <span
                                                    id="lastNameView" >Dutta</span>
                                            </h1>
                                            <small><span style={{fontSize: "12px"}}
                                                id="profileTitleView"
                                                >Java Developer</span></small>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="far fa-user"></i> Summary <a
                                                data-toggle="modal" data-target="#summary" href="#"
                                                style={{float: "right"}}><i class="fa fa-edit"></i>Edit</a>
                                        </h2>
                                        <div className="about">
                                            <p>
                                                <span style={{fontSize: "12px"}} id="summaryView"
                                                    >Summary</span>
                                            </p>
                                            <div className="btn-ro row no-margin">
                                                <ul className="btn-link">
                                                    <li><a
                                                        data-toggle="modal" data-target="#uploadResumeModel"
                                                        href="#"><i class="fas fa-paper-plane"></i>Upload
                                                            Resume</a></li>
                                                    <li><a data-toggle="modal"
                                                        data-target="#downloadResumeModel" href="#"><i
                                                        className="fas fa-cloud-download-alt"></i> Download Resume</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="far fa-user"></i> Profile <a
                                                
                                                data-toggle="modal" data-target="#profile" href="#"
                                                style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>

                                        </h2>
                                        <div className="row">
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Alias Name :</span>
                                                </h4>
                                                <span id="aliasNameView"
                                                    >Dip</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Place Of Birth :</span>
                                                </h4>
                                                <span id="placeOfBirthView">Kolkata</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Marital Status :</span>
                                                </h4>
                                                <span id="maritalStatusView"
                                                    >Married</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Birth Date :</span>
                                                </h4>
                                                <span id="birthDateView"
                                                    >11/23/1987</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Work Experience :</span>
                                                </h4>
                                                <span id="workExperienceView"
                                                    >10</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Relevant Experience :</span>
                                                </h4>
                                                <span id="releventExperienceView"
                                                    >10</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>HiringType :</span>
                                                </h4>
                                                <span id="hiringTypeView"
                                                    >Fulltime</span>

                                            </div>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="fa fa-home fa-fw"></i> Address <a
                                                
                                                data-toggle="modal" data-target="#address" href="#"
                                                style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>
                                        </h2>
                                        <div id="addressFragment">
                                            <div >

                                                <div className="address">
                                                    <div>
                                                        <div>
                                                            <h4>

                                                                <span style={{fontSize: "12px"}}>INDIA</span>
                                                            </h4>
                                                        </div>
                                                        <span style={{fontSize: "12px"}}>WB</span>,
                                                        <span style={{fontSize: "12px"}}>Kolkata</span>
                                                        <div>
                                                            <ul>
                                                                <li><i class="far fa-hand-point-right"></i> 
                                                                <span style={{fontSize: "12px"}}>A2/26 Kolkata</span>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="fa fa-home fa-fw"></i> workExp <a
                                                
                                                data-toggle="modal" data-target="#workExpModel" href="#"
                                                style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>
                                        </h2>
                                        <div id="workExpFragment">
                                            <div>
                                                <div>
                                                    <div>
                                                        <div className="work-exp">
                                                            <h4>
                                                                <span>Java</span>
                                                            </h4>
                                                            <span><span
                                                                >11/23/2000</span>-<span
                                                               >11/23/2005</span></span>,
                                                            <i><b><span>TCS</span>/ <span>IT</span></b></i>

                                                            <ul>
                                                                <li><i className="far fa-hand-point-right"></i> <span
                                                                    style={{fontSize: "12px"}} >IT Company</span>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="fas fa-graduation-cap"></i> Education <a
                                                data-toggle="modal" data-target="#educationModel" href="#"
                                                style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>

                                        </h2>
                                        <div>
                                            <div className="education">

                                                <div>
                                                    <div id="educationFragment" className="row no-margin">
                                                        <div>
                                                            <ul>
                                                                <li className="col-md-6"><span>MCA</span> <br/> 
                                                                <span>IT</span>-<span>IT School</span> <br/> 
                                                                <span>11/23/2000</span>-<span>11/23/2005</span> <br/>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="fas fa-users-cog"></i> Skills <a
                                                data-toggle="modal" data-target="#skillModel" href="#"
                                                style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>
                                        </h2>


                                        <div className="profess-cover row no-margin" id="skillFragment">
                                            <div className="col-md-6">
                                                <div className="row prog-row">
                                                    <div className="col-sm-6">
                                                        <span>JAVA</span>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="progress">
                                                            <div className="progress-bar" role="progressbar"
                                                                style={{width: "90%" }}
                                                                aria-valuenow="25" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
         
        </div>
        )
    }
}

export default ProfileComponent;