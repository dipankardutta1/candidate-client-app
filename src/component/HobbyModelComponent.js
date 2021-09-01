import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function HobbyModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "hobbies"
      });


      
      // for socialProfiles

     const onHobbiesSubmit= data => {
       

        (data.hobbies || []).map((item, index) => (
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

      instanceClient.post('resource/hobby/saveMultiple',data.hobbies)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // hobbies end


    return (
        <div class="modal fade" id="hobbiesModel" tabindex="-1" role="dialog"
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
						<i class="far fa-user"></i> Hobbies
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<form id="skill-form" onSubmit={handleSubmit(onHobbiesSubmit)}>
						<table id="skillTable" class=" table order-list">
							<thead>
								<tr>
									<td>Type</td>
									<td>Hobby</td>
								</tr>
							</thead>
							<tbody>
                            {(fields || []).map((field, index) => (
								<tr>
									<td class="col-sm-6">
                                        <select  
										key={field.id} 
										class="form-control type"  {...register(`hobbies.${index}.type`,{ required: "Hobby Type is required"})}
										>
	    <option
          key={field.type=='writing'}
          value={'writing'}>  Writing </option>
       <option
          key={field.type=='cycling'}
          value={'cycling'}>  Cycling </option>
		  <option
          key={field.type=='football'}
          value={'football'}>  Football </option>
		  <option
          key={field.type=='movies'}
          value={'movies'}>  Movies </option>
           <option
          key={field.type=='games'}
          value={'games'}>  Games </option>
           <option
          key={field.type=='movies'}
          value={'movies'}>  Movies </option>
 <option
          key={field.type=='other'}
          value={'other'}>  Other </option>
										
										</select>
                                        <p style={{color : "red"}}>{errors.hobbies?.[index]?.type?.message}</p>

                                        </td>


									<td class="col-sm-6">
                                        <input type="text"
                                         key={field.id} 
                                         {...register(`hobbies.${index}.hobby`, { required: "Hobby is required",maxLength:{value:10,message:"Can not  exceed maximum length"}})}
										class="form-control url"
										 />
                                         <p style={{color : "red"}}>{errors.hobbies?.[index]?.hobby?.message}</p></td>


                                        <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
								</tr>
								

                                ))}
							</tbody>
							<tfoot>
								<tr>
									<td colspan="12" style={{textAlign: 'left'}}><input
										type="button" class="btn btn-lg btn-block " id="addrowHobbyProfile"
										value="Add Row" onClick={() => append({"id":"","type":"","hobby":"","isDeleted":false})}/></td>
								</tr>
								<tr>
								</tr>
							</tfoot>
						</table>
                        {fields && fields.length? (
						<button type="submit" class="btn btn-primary" id="hobbyBtn">Save
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