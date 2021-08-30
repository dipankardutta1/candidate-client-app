import React, { useState } from 'react';

import { useForm ,Controller } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export function ProfileModelComponent({data,changeLoader,changeCandidate}) {


    const { register, handleSubmit,  formState: { errors },control  } = useForm({
        defaultValues: data
      });

    
      const onProfileSubmit = data =>{
       
        changeLoader(true);
        
        const configClient = {
          baseURL: 'http://localhost:9000/',
          headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          
          }
      };
      
      const instanceClient = axios.create(configClient);

      instanceClient.put('resource/candidate/update',data)
          .then( res => {
              
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1");
          });

          
    }
      
    
      
  return (
    <div class="modal fade" id="profileModel" tabindex="-1" role="dialog"
    aria-labelledby="myModalLabel" aria-hidden="true"
    data-keyboard="false" data-backdrop="static">

    <div class="modal-dialog">

        <div class="modal-content">

            {/* Modal Header */}
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    <i class="far fa-user"></i> Profile
                </h4>
            </div>

            {/* Modal Body  */}
            <div class="modal-body">

                <div class="alert alert-success alert-dismissible" role="alert"
                    style={{display: 'none'}}>
                    <button type="button" class="close" data-dismiss="alert"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>Congratulations!</strong> Now you're ready to do the <a
                        href="#" class="alert-link">next shoelace</a>.
                </div>

                <form id="profile-form" onSubmit={handleSubmit(onProfileSubmit)}>
                    <div class="form-group">
                        <label for="aliasName">Alias Name(*)</label> 
                        <input
                            class="form-control" id="aliasName"
                            {...register("aliasName", { required: "Alias Name is required"})}
                            placeholder="Enter Alias Name" />
                         <p style={{color : "red"}}>{errors.aliasName && errors.aliasName.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="placeOfBirth">placeOfBirth(*)</label> 
                        <input
                        {...register("placeOfBirth", { required: "Place Of Birth is required"})}
                            class="form-control" id="placeOfBirth"
                            placeholder="Enter Place of Birth" />
                         <p style={{color : "red"}}>{errors.placeOfBirth && errors.placeOfBirth.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="maritalStatus">Marital Status(*)</label>
                        <select class="form-control type"   {...register("maritalStatus", { required: "Marital Status is required" })}>
	                        <option  key={'maritalStatus'=='Single'} value={'Single'}>  Single </option>
                            <option key={'maritalStatus'=='Married'} value={'Married'}>  Married </option>
                            <option key={'maritalStatus'=='Widowed'} value={'Widowed'}>  Widowed </option>
                            <option key={'maritalStatus'=='Divorced'} value={'Divorced'}>  Divorced </option>
		 			    </select>
                        <p style={{color : "red"}}>{errors.maritalStatus && errors.maritalStatus.message}</p>
                    </div>
                    <div class="form-group">
                        <label for="birthDate">Birth Date(*)</label>
                        

                        <Controller
                                control={control}
                                name="birthDate"
                                rules={{ required: "Birth Date is Required" ,pattern: { value: /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/i,message: "Invalid date"}}} 
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                <ReactDatePicker
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value != null ? moment(value).toDate() : ""}
                                    dateFormat={"MM/dd/yyyy"}
                                    showYearDropdown
                                    showMonthDropdown
                                    maxDate={new Date()}
                                    minDate={new Date(1900, 1, 1)}
                                />
                                )}
                            />
                            <p style={{color : "red"}}>{errors.birthDate && errors.birthDate.message}</p>


                        {/*
                        <DatePicker   
                            {...register("birthDate", { required: "Birth Date is required" })} 
                            selected={date} onChange={handleChange} maxDate={new Date()}
                            dateFormat="MM/dd/yyyy"
                            />
                         <p style={{color : "red"}}>{errors.birthDate && errors.summary.birthDate}</p>
                        */}
                    </div>
                    <div class="form-group">
                        <label for="workExperience">workExperience(*)</label> <input type="number"
                        {...register("workExperience", { required: "Work Experience is required"})}
                            class="form-control" id="workExperience"
                            placeholder="Enter Work Experience" />
                         <p style={{color : "red"}}>{errors.workExperience && errors.workExperience.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="releventExperience">Relevent Experience(*)</label> <input type="number"
                        {...register("releventExperience", { required: "Relevent Experience is required"})}
                            class="form-control" id="releventExperience"
                            placeholder="Enter Relevent Experience" />
                         <p style={{color : "red"}}>{errors.releventExperience && errors.releventExperience.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="hiringType">Hiring Type(*)</label>
                        <select class="form-control type"   {...register("hiringType", { required: "Hiring Type is required" })}
										>
	    <option
          key={'hiringType'=='W2'}
          value={'W2'}> Full Time </option>
       <option
          key={'hiringType'=='CONTRACT'}
          value={'CONTRACT'}>  C2C </option>

<option
          key={'hiringType'=='CONTRACT TO HIRE'}
          value={'CONTRACT TO HIRE'}> C2H </option>
		 			</select>
                 <p style={{color : "red"}}>{errors.hiringType && errors.hiringType.message}</p>
                    </div>
               



                    <button type="submit" class="btn btn-primary" >Save
                        changes</button>

                </form>




            </div>

            {/* Modal Footer  */}
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">
                    Close</button>

            </div>

        </div>

    </div>
    </div>
                
  );
}