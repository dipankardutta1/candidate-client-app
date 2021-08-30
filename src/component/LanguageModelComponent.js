import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function LanguageModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "languages"
      });


      
      // for Languages

     const onLanguagesSubmit= data => {
       

        (data.languages || []).map((item, index) => (
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

      instanceClient.post('resource/languages/saveMultiple',data.languages)
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
        <div class="modal fade" id="languagesModel" tabindex="-1" role="dialog"
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
						<i class="far fa-user"></i> Languages 
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<form id="language-form" onSubmit={handleSubmit(onLanguagesSubmit)}>
						<table id="languageTable" class=" table order-list">
							<thead>
								<tr>
									<td>Language</td>
									<td>&nbsp;Read</td>
									<td>&nbsp;Write</td>
									<td>&nbsp;Speak</td>
								</tr>
							</thead>
							<tbody>
                            {(fields || []).map((field, index) => (
								<tr>
									<td class="col-sm-4">
                                        <input type="text"
                                         key={field.id} 
                                         {...register(`languages.${index}.language`, { required: "Language is required"})}
										class="form-control url"
										 />
                                         <p style={{color : "red"}}>{errors.languages?.[index]?.language?.message}</p></td>

                                         <td class="col-sm-2">
                                        <select  
										key={field.id} 
										class="form-control type"  {...register(`languages.${index}.read`,{ required: "Yes OR No is required"})}
										>
	    <option
          key={field.type=='YES'}
          value={'YES'}>  YES </option>
       <option
          key={field.type=='NO'}
          value={'NO'}>  NO </option>
		 			</select>
                    <p style={{color : "red"}}>{errors.languages?.[index]?.read?.message}</p>  
                                        </td>
                                        
                                        <td class="col-sm-2">
                                        <select  
										key={field.id} 
										class="form-control type"  {...register(`languages.${index}.write`,{ required: "Yes OR No is required"})}
										>
	    <option
          key={field.type=='YES'}
          value={'YES'}>  YES </option>
       <option
          key={field.type=='NO'}
          value={'NO'}>  NO </option>
		 			</select>
                    <p style={{color : "red"}}>{errors.languages?.[index]?.write?.message}</p>  
                                        </td>

                                        <td class="col-sm-2">
                                        <select  
										key={field.id} 
										class="form-control type"  {...register(`languages.${index}.speak`,{ required: "Yes OR No is required"})}
										>
	    <option
          key={field.type=='YES'}
          value={'YES'}>  YES </option>
       <option
          key={field.type=='NO'}
          value={'NO'}>  NO </option>
		 			</select>
                    <p style={{color : "red"}}>{errors.languages?.[index]?.speak?.message}</p>  
                                        </td>



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
										value="Add Row" onClick={() => append({"id":"","language":"","read":"","write":"","speak":"","isDeleted":false})}/></td>
								</tr>
								<tr>
								</tr>
							</tfoot>
						</table>
                        {fields && fields.length? (
						<button type="submit" class="btn btn-primary" id="languageBtn">Save
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