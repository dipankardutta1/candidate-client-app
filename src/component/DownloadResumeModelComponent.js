import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import  { useState } from 'react';


export function DownloadResumeModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

     
      function deleteDoc(title,email) {
        changeLoader(true);

        const configClient = {
            baseURL: 'http://localhost:9000/',
            headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization' : 'Bearer ' +  localStorage.getItem('token')
            }
        };
  
        const instanceClient = axios.create(configClient);

        instanceClient.get('resource/document/delete/document/'+email+"/"+title)
        .then( res => {


            instanceClient.get('resource/candidate/find/fullCandidate/byEmail?email='+email)
            .then( res => {
                changeCandidate(res.data.output);
                //reset(res.data.output);
                changeLoader(false);
            
            }, err => {
                updateAppState({ authenticated: false})
                console.log("erroe1 " + err) ;
            });


            }, err => {
                updateAppState({ authenticated: false})
                console.log("erroe1 " +err);
            });

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
        <div class="modal fade" id="downloadResumeModel" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				{/*  Modal Header */}
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">
						<i class="far fa-user"></i> Download Resume
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<table id="downloadResumeTable" class=" table order-list">
						<thead>
							<tr>
								<td>Document Name</td>
								<td>Download</td>
								<td>Delete Resume ?</td>
							</tr>
						</thead>
						<tbody>

                        {data.isResumeUploaded == null || data.isResumeUploaded == false ?
                        (
                            ""
                        ) : (data.documents || []).map(obj =>
                                obj.type == 'resume' ? (
                                   
                                    <tr>
								        <td class="col-sm-9">
                                            {/* 
                                            <input type="hidden" class="titleClazz" th:value="${obj.title}" /> 
                                            <input type="hidden" class="emailClazz" th:value="${candidateDto.email}" /> 
                                            */}
                                            <span>{obj.fileName}</span>
                                        </td>
								        <td class="col-sm-2">
                                                <a href="/candidateService/downloadResume?email=${candidateDto.email}&title=${obj.title}|}"><i
										class="fa fa-download" aria-hidden="true"></i> Click Here</a></td>

                                            <td class="col-sm-1">
                                                <button type="button" class="iDelResume btn fa fa-trash" onClick={() => deleteDoc(obj.title,data.email)}></button>
                                            </td>
                                        </tr>




                                ) :("")
                                    
                                
                        )} 


							

						</tbody>

					</table>
				</div>

				{/* Modal Footer */}
				<div class="modal-footer">

					<button type="button" class="btn btn-default" data-dismiss="modal">
						Close</button>
				</div>
			</div>
		</div>
	</div>
            );
        }