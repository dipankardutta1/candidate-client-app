import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
      
export function SummaryModelComponent({data,changeLoader,changeCandidate}) {


    const { register, handleSubmit,  formState: { errors }  } = useForm({
        defaultValues: data
      });


      const onSummarySubmit = data =>{
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
    <div class="modal fade" id="summary" tabindex="-1" role="dialog"
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
                    <i class="far fa-user"></i> Summary
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

                <form id="summary-form" onSubmit={handleSubmit(onSummarySubmit)}>
                    <div class="form-group">
                        <label for="firstName">First Name(*)</label> <input
                            class="form-control" id="firstName"
                            {...register("firstName", { required: "First Name is required", maxLength:{value:25,message:"Can not  exceed maximum length"},pattern:{value:/^([^0-9]*)$/,message:"No numbers"}})}
                            placeholder="Enter First Name" />
                         <p style={{color : "red"}}>{errors.firstName && errors.firstName.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name(*)</label> <input
                        {...register("lastName", { required: "Last Name is required",  maxLength:{value:25,message:"Can not  exceed maximum length"},pattern:{value:/^([^0-9]*)$/,message:"No numbers"}})}
                            class="form-control" id="lastName"
                            placeholder="Enter Last Name" />
                         <p style={{color : "red"}}>{errors.lastName && errors.lastName.message}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="profileTitle">Profile Title(*)</label> <input
                            class="form-control"
                            {...register("profileTitle", { required: "profile Title is required", maxLength:{value:25,message:"Can not  exceed maximum length"}})}
                            id="profileTitle"
                            placeholder="Enter Profile Title" />
                            <p style={{color : "red"}}>{errors.profileTitle && errors.profileTitle.message}</p>
                    </div>
                    <div class="form-group">
                        <label for="summary">Summary(*)</label>
                        <textarea class="form-control" rows="5" id="summary"
                         {...register("summary", { required: "Summary is required", maxLength:{value:300,message:"Can not  exceed maximum length"}})}
                            ></textarea>
                         <p style={{color : "red"}}>{errors.summary && errors.summary.message}</p>
                           
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