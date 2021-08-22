import React,{Component} from 'react'

import avatar from '../images/avatar.png';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import { SummaryModelComponent } from './SummaryModelComponent';

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
                "addresses": [],
                "isAvatarUploaded": null,
                "isResumeUploaded": null,
                "salaryTypes": null,
                "phones": [],
                "mobiles": [],
                "workAuthorizations": null,
                "documents": [],
                "skils": [],
                "educationEntries":[],
                "experienceEntries": [],
                "socialProfiles": [],
                "hobbies": [],
                "languages": [],
                "jobLocations": []
            },
            "httpStatus": ""
        };


        //this.summarySubmitHandler = this.summarySubmitHandler.bind(this);


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
                                            {(this.state.output.mobiles || []).map(obj => (
                                                <div >
                                                    <span>{obj.mobileNumber}</span>
                                                </div>

                                            ))}


                                            </div>
                                        </div>
                                        <div className="contact-box pb0">
                                            <div className="icon">
                                                <i className="fas fa-globe-americas"></i>
                                            </div>
                                            <div class="detail">
                                            {(this.state.output.mobiles || []).map(obj => (
                                                <div>
                                                <span >{obj.mobileNumber}</span> <br/> 
                                                </div>
                                            ))}

                                            </div>
                                        </div>
                                        

                                        <h4 class="ltitle">
                                            Social Profile <a
                                                data-toggle="modal" data-target="#socialModel" href="#"
                                                style={{ float: "right", color: "white" }}><i
                                                className="fa fa-edit"></i>Edit</a>

                                        </h4>
                                        <ul className="row social-link no-margin" id="socialFragment">
                                        {(this.state.output.socialProfiles || []).map(obj => (
                                            <div>
                                                {obj.type==='FaceBook' &&
                                                 <li>
                                                 <i className="fab fa-facebook-f"></i>
                                                 <span style={{ marginLeft: "10px" }} >{obj.url}</span>
 
                                                 </li>
                                                }
                                               {obj.type==='Twitter' &&
                                            <li>
                                                <i className="fab fa-twitter"></i>
                                                <span style={{marginLeft: "10px"}} >{obj.url}</span>
                                            </li>
                                                }
                                                  {obj.type==='linkedin' &&
                                            <li>
                                                <i className="fab fa-linkedin-in"></i>
                                                <span style={{marginLeft: "10px"}} >{obj.url}</span>
                                            </li>
                                                }
                                                {obj.type==='github' &&
                                            <li>
                                                <i className="fab fa-github"></i>
                                                <span style={{marginLeft: "10px"}} >{obj.url}</span>
                                            </li>
                                                }
                                                 {obj.type==='exclamation' &&
                                            <li>
                                                <i className="fas fa-exclamation"></i>
                                                <span style={{marginLeft: "10px"}} >{obj.url}</span>
                                            </li>
                                                }
                                            </div>
                                        ))}
                                            
                                        </ul>
                                       

                                        <h4 className="ltitle">
                                            Hobbies <a 
                                                data-toggle="modal" data-target="#hobbyModel" href="#"
                                                style={{float: "right" , color: "white"}}>
                                                    <i className="fa fa-edit"></i>Edit</a>
                                            </h4>
                                            <ul className="hoby row no-margin" id="hobbyFragment">
                                            {(this.state.output.hobbies || []).map(obj => (
                                                <div>
                                                    {obj.type==='writing' &&
                                                    <li>
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
                                                    }
                                                    {obj.type==='cycling' &&
                                                <li>
                                                    <i className="fas fa-bicycle"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
    }                                                {obj.type==='football' &&
                                                <li>
                                                    <i className="fas fa-futbol"></i> 
                                                    <br/> 
                                                    <span>{obj.hobby}</span> 
                                                </li>
    }                                            {obj.type==='movies' &&
                                                <li>
                                                    <i className="fas fa-film"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
    }                                                {obj.type==='travel' &&
                                                <li>
                                                    <i className="fas fa-plane-departure"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
    }                                            {obj.type==='games' &&
                                                <li>
                                                    <i className="fas fa-gamepad"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
    }                                           {obj.type==='other' &&
                                                <li>
                                                    <i className="fas fa-exclamation"></i>
                                                    <br/> 
                                                    <span>{obj.hobby}</span>
                                                </li>
    }
                                                </div>
                                            ))}

                                            
                                        </ul>


                                        

                                        <h4 className="ltitle">
                                            Languages <a 
                                                data-toggle="modal" data-target="#languageModel" href="#"
                                                style={{float: "right" , color: "white"}}>
                                                    <i className="fa fa-edit"></i>Edit</a>
                                        </h4>
                                        <span>Language</span>&nbsp;&nbsp; <span
                                           >Read</span>&nbsp;&nbsp;&nbsp; <span>Write</span>&nbsp;&nbsp;
                                        <span>speak</span>
                                        <div className="lnguage row no-margin" id="languageFragment">
                                        {(this.state.output.languages || []).map(obj => (
                                                <div>
                                                <span>{obj.language}</span> --> &nbsp;<span
                                                    >{obj.read}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span
                                                    >{obj.write}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>{obj.speak}</span> <br/>
                                            </div>
                                        ))}
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 rt-div">
                                    <div className="rit-cover">
                                        <div className="hotkey">
                                            <h1 className="">
                                                <span id="firstNameView"
                                                    >{this.state.output.firstName}</span> <span
                                                    id="lastNameView" >{this.state.output.lastName}</span>
                                            </h1>
                                            <small><span style={{fontSize: "12px"}}
                                                id="profileTitleView"
                                                >{this.state.output.profileTitle}</span></small>
                                        </div>
                                        <h2 className="rit-titl">
                                            <i className="far fa-user"></i> Summary <a
                                                data-toggle="modal" data-target="#summary" href="#"
                                                style={{float: "right"}}><i class="fa fa-edit"></i>Edit</a>
                                        </h2>
                                        <div className="about">
                                            <p>
                                                <span style={{fontSize: "12px"}} id="summaryView"
                                                    >{this.state.output.summary}</span>
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
                                                    >{this.state.output.aliasName}</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Place Of Birth :</span>
                                                </h4>
                                                <span id="placeOfBirthView">{this.state.output.placeOfBirth}</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Marital Status :</span>
                                                </h4>
                                                <span id="maritalStatusView"
                                                    >{this.state.output.maritalStatus}</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Birth Date :</span>
                                                </h4>
                                                <span id="birthDateView"
                                                    >
                                                     {Moment(this.state.output.birthDate).format('MM/DD/YYYY')}   
                                                        
                                                         </span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Work Experience :</span>
                                                </h4>
                                                <span id="workExperienceView"
                                                    >{this.state.output.workExperience}</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>Relevant Experience :</span>
                                                </h4>
                                                <span id="releventExperienceView"
                                                    >{this.state.output.releventExperience}</span>
                                            </div>
                                            <div className="col-xs-4 col-sm-4 col-lg-4">
                                                <h4>
                                                    <span style={{fontSize: "12px"}}>HiringType :</span>
                                                </h4>
                                                <span id="hiringTypeView"
                                                    >{this.state.output.hiringType}</span>

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
                                                {(this.state.output.addresses || []).map(obj => (
                                                    
                                                    <div>
                                                        <div>
                                                            <h4>
                                                                <span style={{fontSize: "12px"}}>{obj.country}</span>
                                                            </h4>
                                                        </div>
                                                        <span style={{fontSize: "12px"}}>{obj.state}</span>,
                                                        <span style={{fontSize: "12px"}}>{obj.city}</span>
                                                        <div>
                                                            <ul>
                                                                <li><i class="far fa-hand-point-right"></i> 
                                                                <span style={{fontSize: "12px"}}>{obj.addressLine}</span>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>
                                                    ))}
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
                                                        {(this.state.output.experienceEntries || []).map(obj => (
                                                            <div>
                                                            <h4>
                                                            <span>{obj.title}</span>
                                                        </h4>
                                                        <span><span
                                                            >{Moment(obj.startDate).format('MM/DD/YYYY')}</span>-<span
                                                           >{Moment(obj.endDate).format('MM/DD/YYYY')}</span></span>,
                                                        <i><b><span>{obj.company}</span>/ <span>{obj.industry}</span></b></i>

                                                        <ul>
                                                            <li><i className="far fa-hand-point-right"></i> <span
                                                                style={{fontSize: "12px"}} >{obj.summary}</span>
                                                            </li>

                                                        </ul>
                                                        </div>
                                                        ))}
                                                            
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
                                                    {(this.state.output.educationEntries || []).map(obj => (
 <div>
 <ul>
     <li className="col-md-6"><span>{obj.degree}</span> <br/> 
     <span>{obj.fieldOfStudy}</span>-<span>{obj.school}</span> <br/> 
     <span>{Moment(obj.startDate).format('MM/DD/YYYY')}</span>-<span>{Moment(obj.startDate).format('MM/DD/YYYY')}</span> <br/>
     </li>
 </ul>

</div>
                                                    ))}
                                                       
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
                                        {(this.state.output.skils || []).map(obj => (
                                                <div className="col-md-6">
                                                <div className="row prog-row">
                                                    <div className="col-sm-6">
                                                        <span>{obj.name}</span>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="progress">
                                                            <div className="progress-bar" role="progressbar"
                                                                style={{width: "90%" }}
                                                                aria-valuenow={obj.proficientLevel} aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                            



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>


        {/* Summary Modal */}
        <SummaryModelComponent preloadValues={this.state.output} />





         
        </div>
        )
    }
}

export default ProfileComponent;