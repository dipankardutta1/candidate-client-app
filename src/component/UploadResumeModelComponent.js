import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import  { useState } from 'react';


export function UploadResumeModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

     
      
	  async function isResumeOk(resumeUpload){
		  
		const file =resumeUpload[0];
		if(file.size>2000000){
			
			return false;
		}
		var signatureUpper;
		var slice = file.slice(0,4);      // Get the first 4 bytes of a file
		var reader = new FileReader(); 
	let promise = new Promise((resolve, reject) => {
	   // Create instance of file reader. It is asynchronous!
		reader.readAsArrayBuffer(slice);
		var flag=false;
		 // Read the chunk file and return to blob
		 reader.onload = function(e) {
			var buffer = reader.result;          // The result ArrayBuffer
			var view = new DataView(buffer);      // Get access to the result bytes
			var signature = view.getUint32(0, false).toString(16); // Read 4 bytes, big-endian，return hex string
		 signatureUpper=signature.toUpperCase();
			
			switch (signatureUpper) {
			case '89504E47':
				flag=false;
				break;
			case '47494638':
				flag=false;
				break;
			case '25504446':
				flag=true;
			
				//pdf
				break;
			case 'FFD8FFDB':
			case 'FFD8FFE0':
			case 'FFD8FFE1':
				flag=false;
				break;
			case '504B0304':
				flag=true;
				
				//docx
				break;
				
			default:
				flag=false;
			break;
			}
			resolve(flag);
		}
		
		
	});
	
	let result = await promise;
	return result;
	
	}
	

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
						<input {...register("resumeUpload", { required: "Please Upload a file",validate:isResumeOk})}  id="resumeUpload" type="file" />
					</div>
					<p style={{color : "red"}}>{errors.resumeUpload && errors.resumeUpload.message}</p>
						<p style={{color : "red"}}>
							{errors.resumeUpload && errors.resumeUpload.type === "validate" && (
    					<div className="error">Please check format(doc/docx/pdf only)and length(2 MB only)</div>
  						)}</p>
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