import React, { useState,useEffect,useCallback  } from 'react';
import avatar from '../images/avatar.png';
import axios from 'axios';
import Moment from 'moment';
import App,{ updateAppState } from '../App';
import { SummaryModelComponent } from './SummaryModelComponent';
import { useForm ,useFieldArray } from 'react-hook-form';
import Spinner from './Spinner';
import { AddressModelComponent } from './AddressModelComponent';
import { SkillModelComponent } from './SkillModelComponent';
import {MobileModelComponent} from './MobileModelComponent';
import {SocialProfileModelComponent} from './SocialProfileModelComponent';
import {HobbyModelComponent} from './HobbyModelComponent';
import {LanguageModelComponent} from './LanguageModelComponent';
import {ProfileModelComponent} from './ProfileModelComponent';
import {WorkExpModelComponent} from './WorkExpModelComponent';
//import {AvatarModelComponent} from './AvatarModelComponent';

function ProfileComponentNew(){

    const [loader, setLoader] = useState(true);

    const [candidate, setCandidate] = useState({
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
        });

        const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
            defaultValues : candidate
          });

          
          const changeLoader = useCallback((data) => {
              setLoader(data);
            },
            [], 
          );

          const changeCandidate = useCallback((data) => {
            setCandidate(data);
          },
          [], 
        );
          

          
       


    useEffect(() => {

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
              setCandidate(res.data.output);
              reset(res.data.output);
              setLoader(false);
            
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



      }, [reset]);

      if (loader) {
          return(
              <div>
                   <Spinner />
              </div>
          )
      }else{
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
                                            <span id="firstNameAvatar" style={{ fontSize: "16px"}}>{candidate.firstName}</span> 
                                            <span id="lastNameAvatar" style={{ fontSize: "16px" }}>{candidate.lastName}</span>
                                        </h3>
                                        <span id="profileTitleAvatar" style={{fontSize: "12px" }} >{candidate.profileTitle}</span>
                                    </div>

                                    <h4 class="ltitle">
                                        Contact <a
                                            data-toggle="modal" data-target="#mobileModel" href="#"
                                            style={{ float: "right" , color: "white"}}><i
                                            className="fa fa-edit"></i>Edit</a>
                                    </h4>
                                    <div className="contact-box pb0">
                                        <div className="icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="detail" id="contactFragment">
                                        {(candidate.mobiles || []).map(obj => (
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
                                        {(candidate.mobiles || []).map(obj => (
                                            <div>
                                            <span >{obj.mobileNumber}</span> <br/> 
                                            </div>
                                        ))}

                                        </div>
                                    </div>
                                    

                                    <h4 class="ltitle">
                                        Social Profile <a
                                            data-toggle="modal" data-target="#socialProfileModel" href="#"
                                            style={{ float: "right", color: "white" }}><i
                                            className="fa fa-edit"></i>Edit</a>

                                    </h4>
                                    <ul className="row social-link no-margin" id="socialFragment">
                                    {(candidate.socialProfiles || []).map(obj => (
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
                                            data-toggle="modal" data-target="#hobbiesModel" href="#"
                                            style={{float: "right" , color: "white"}}>
                                                <i className="fa fa-edit"></i>Edit</a>
                                        </h4>
                                        <ul className="hoby row no-margin" id="hobbyFragment">
                                        {(candidate.hobbies || []).map(obj => (
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
                                            data-toggle="modal" data-target="#languagesModel" href="#"
                                            style={{float: "right" , color: "white"}}>
                                                <i className="fa fa-edit"></i>Edit</a>
                                    </h4>
                                    <span>Language</span>&nbsp;&nbsp; <span
                                       >Read</span>&nbsp;&nbsp;&nbsp; <span>Write</span>&nbsp;&nbsp;
                                    <span>speak</span>
                                    <div className="lnguage row no-margin" id="languageFragment">
                                    {(candidate.languages || []).map(obj => (
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
                                                >{candidate.firstName}</span> <span
                                                id="lastNameView" >{candidate.lastName}</span>
                                        </h1>
                                        <small><span style={{fontSize: "12px"}}
                                            id="profileTitleView"
                                            >{candidate.profileTitle}</span></small>
                                    </div>
                                    <h2 className="rit-titl">
                                        <i className="far fa-user"></i> Summary <a
                                            data-toggle="modal" data-target="#summary" href="#"
                                            style={{float: "right"}}><i class="fa fa-edit"></i>Edit</a>
                                    </h2>
                                    <div className="about">
                                        <p>
                                            <span style={{fontSize: "12px"}} id="summaryView"
                                                >{candidate.summary}</span>
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
                                            
                                            data-toggle="modal" data-target="#profileModel" href="#"
                                            style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>

                                    </h2>
                                    <div className="row">
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Alias Name :</span>
                                            </h4>
                                            <span id="aliasNameView"
                                                >{candidate.aliasName}</span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Place Of Birth :</span>
                                            </h4>
                                            <span id="placeOfBirthView">{candidate.placeOfBirth}</span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Marital Status :</span>
                                            </h4>
                                            <span id="maritalStatusView"
                                                >{candidate.maritalStatus}</span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Birth Date :</span>
                                            </h4>
                                            <span id="birthDateView">
                                                 {Moment(candidate.birthDate).format('MM/DD/YYYY')}   
                                                    
                                                     </span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Work Experience :</span>
                                            </h4>
                                            <span id="workExperienceView"
                                                >{candidate.workExperience}</span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>Relevant Experience :</span>
                                            </h4>
                                            <span id="releventExperienceView"
                                                >{candidate.releventExperience}</span>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-lg-4">
                                            <h4>
                                                <span style={{fontSize: "12px"}}>HiringType :</span>
                                            </h4>
                                            <span id="hiringTypeView"
                                                >{candidate.hiringType}</span>

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
                                            {(candidate.addresses || []).map(obj => (
                                                
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
                                            
                                            data-toggle="modal" data-target="#experienceEntriesModel" href="#"
                                            style={{float: "right"}}><i className="fa fa-edit"></i>Edit</a>
                                    </h2>
                                    <div id="workExpFragment">
                                        <div>
                                            <div>
                                                <div>
                                                    <div className="work-exp">
                                                    {(candidate.experienceEntries || []).map(obj => (
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
                                                {(candidate.educationEntries || []).map(obj => (
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
                                    {(candidate.skils || []).map(obj => (
                                            <div className="col-md-6">
                                            <div className="row prog-row">
                                                <div className="col-sm-6">
                                                    <span>{obj.name}</span>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            style={{width: obj.proficientLevel+'%' }}
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


   
    <SummaryModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>



     {/* address Modal */}
	<AddressModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>

    <SkillModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
   
    <MobileModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    
    <SocialProfileModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    <HobbyModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    
    <LanguageModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    
    <ProfileModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    <WorkExpModelComponent data={candidate} changeLoader={changeLoader} changeCandidate={changeCandidate}/>
    
    


    </div>
    );
    }
}


export default ProfileComponentNew;