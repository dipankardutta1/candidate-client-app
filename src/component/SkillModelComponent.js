import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function SkillModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "skils"
      });


      
      // for Skills

     const onSkillSubmit= data => {
       

        (data.skils || []).map((item, index) => (
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

      instanceClient.post('resource/skills/saveMultiple',data.skils)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // skills end


    return (
        <div class="modal fade" id="skillModel" tabindex="-1" role="dialog"
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
						<i class="far fa-user"></i> Skill
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<form id="skill-form" onSubmit={handleSubmit(onSkillSubmit)}>
						<table id="skillTable" class=" table order-list">
							<thead>
								<tr>
									<td>Skill Name</td>
									<td>Proficient Level</td>
								</tr>
							</thead>
							<tbody>
                            {(fields || []).map((field, index) => (
								<tr>
									<td class="col-sm-8">
                                        <input type="text"
										 key={field.id} 
                                         class="form-control name"
                                        {...register(`skils.${index}.name`, { required: "Skill is required", maxLength:{value:25,message:"Can not  exceed maximum length"}})}/>
                                        <p style={{color : "red"}}>{errors.skils?.[index]?.name?.message}</p></td>
									<td class="col-sm-3">
                                        <input type="number"
                                         key={field.id} 
                                         {...register(`skils.${index}.proficientLevel`, { required: "Proficient Level is required",  min:{value:1,message:"Minimum value is 1"} , max: {value:100,message:"Maximum value is 100"}  })}
										class="form-control proficientLevel"
										 />
                                         <p style={{color : "red"}}>{errors.skils?.[index]?.proficientLevel?.message}</p></td>


                                        <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
								</tr>
								

                                ))}
							</tbody>
							<tfoot>
								<tr>
									<td colspan="12" style={{textAlign: 'left'}}><input
										type="button" class="btn btn-lg btn-block " id="addrowSkill"
										value="Add Row" onClick={() => append({"id":"","name":"","state":"","isDeleted":false,"proficientLevel":""})}/></td>
								</tr>
								<tr>
								</tr>
							</tfoot>
						</table>
                        {fields && fields.length? (
						<button type="submit" class="btn btn-primary" id="skillBtn">Save
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