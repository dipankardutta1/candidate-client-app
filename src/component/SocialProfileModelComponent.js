import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function SocialProfileModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "socialProfiles"
      });


      
      // for socialProfiles

     const onSocialProfilesSubmit= data => {
       

        (data.socialProfiles || []).map((item, index) => (
            item.candidateId = localStorage.getItem('email')
        ));
        
        changeLoader(true);

        const configClient = {
          baseURL: 'http://localhost:9000/',
          headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          
          }
      };

      const instanceClient = axios.create(configClient);

      instanceClient.post('resource/socialProfile/saveMultiple',data.socialProfiles)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // socialProfiles end


    return (
        <div class="modal fade" id="socialProfileModel" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog">

			<div class="modal-content">
				{/*  Modal Header */}
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">
						<i class="far fa-user"></i> Social Profiles
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<form id="skill-form" onSubmit={handleSubmit(onSocialProfilesSubmit)}>
						<table id="skillTable" class=" table order-list">
							<thead>
								<tr>
									<td>Type</td>
									<td>Url</td>
								</tr>
							</thead>
							<tbody>
                            {(fields || []).map((field, index) => (
								<tr>
									<td class="col-sm-6">
                                        <select  
										key={field.id} 
										class="form-control type"  {...register(`socialProfiles.${index}.type`,{ required: "Social Profile Type is required"})}
										>
	    <option
          key={field.type=='facebook'}
          value={'facebook'}>  FaceBook </option>
       <option
          key={field.type=='twitter'}
          value={'twitter'}>  Twitter </option>
		  <option
          key={field.type=='linkedin'}
          value={'linkedin'}>  Linkedin </option>
		  <option
          key={field.type=='github'}
          value={'github'}>  Github </option>
 <option
          key={field.type=='other'}
          value={'other'}>  Other </option>
										
										</select>
                    <p style={{color : "red"}}>{errors.socialProfiles?.[index]?.type?.message}</p>  
                                        </td>


									<td class="col-sm-6">
                                        <input type="text"
                                         key={field.id} 
                                         {...register(`socialProfiles.${index}.url`, { required: "Url is required"})}
										class="form-control url"
										 />
                                         <p style={{color : "red"}}>{errors.socialProfiles?.[index]?.url?.message}</p></td>


                                        <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
								</tr>
								

                                ))}
							</tbody>
							<tfoot>
								<tr>
									<td colspan="12" style={{textAlign: 'left'}}><input
										type="button" class="btn btn-lg btn-block " id="addrowSocialProfile"
										value="Add Row" onClick={() => append({"id":"","type":"","userName":"","isDeleted":false,"url":""})}/></td>
								</tr>
								<tr>
								</tr>
							</tfoot>
						</table>
                        {fields && fields.length? (
						<button type="submit" class="btn btn-primary" id="socialProfileBtn">Save
							changes</button>
                        ): ""}
					</form>

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