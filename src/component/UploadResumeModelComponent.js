import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import  { useState } from 'react';


export function UploadResumeModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

     
      
      // for addresses

     const onResumeUploadSubmit= d => {
       

        
        console.log(d.email);
		console.log(d.avatarUpload);
        
       
		changeLoader(true);

        const configClient = {
          baseURL: 'http://localhost:9000/',
          headers: {
          "Access-Control-Allow-Origin": "*",
		  'content-type': 'multipart/form-data',
          'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          
          }
      };

      const instanceClient = axios.create(configClient);

	  	const formData = new FormData();
    	formData.append('file',d.resumeUpload[0])
		formData.append('email',d.email)

      instanceClient.post('resource/document/updateResume',formData)
          .then( res => {
			


			const configClient = {
				baseURL: 'http://localhost:9000/',
				headers: {
				"Access-Control-Allow-Origin": "*",
				'Authorization' : 'Bearer ' +  localStorage.getItem('token')
				
				}
			};
	  
		  const instanceClient = axios.create(configClient);

		  instanceClient.get('resource/candidate/find/fullCandidate/byEmail?email='+d.email)
		  .then( res => {
			changeCandidate(res.data.output);
			//reset(res.data.output);
			changeLoader(false);
		  
		  }, err => {
			  updateAppState({ authenticated: false})
			  console.log("erroe1 " + err) ;
		  });



















            //changeCandidate(data);
            //reset(res.data.output);
            //changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

      
          

    }
   // addresses end


    return (
        <div class="modal fade" id="uploadResumeModel" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog">
			<form id="resume-form" onSubmit={handleSubmit(onResumeUploadSubmit)}>
				<div class="modal-content">
					{/*  Modal Header */}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">
							<i class="far fa-user"></i> Upload Resume
						</h4>
					</div>

					{/* Modal Body */}
					<div class="modal-body">
						<input {...register("resumeUpload", { required: "Please Upload a file"})}  id="resumeUpload" type="file" />
					</div>

					{/* Modal Footer */}
					<div class="modal-footer">
						<button type="submit" class="btn btn-primary">Save changes</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</form>
		</div>
	</div>
            );
        }