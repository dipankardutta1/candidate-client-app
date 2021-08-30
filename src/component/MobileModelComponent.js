import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function MobileModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "mobiles"
      });


      
      // for Mobiles

     const onMobileSubmit= data => {
       

        (data.mobiles || []).map((item, index) => (
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

      instanceClient.post('resource/mobile/saveMultiple',data.mobiles)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // mobiles end


    return (
        <div class="modal fade" id="mobileModel" tabindex="-1" role="dialog"
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
						<i class="far fa-user"></i> Contact
					</h4>
				</div>

				{/* Modal Body */}
				<div class="modal-body">
					<form id="skill-form" onSubmit={handleSubmit(onMobileSubmit)}>
						<table id="skillTable" class=" table order-list">
							<thead>
								<tr>
									<td>Country code</td>
									<td>Contact Number</td>
								</tr>
							</thead>
							<tbody>
                            {(fields || []).map((field, index) => (
								<tr>
									<td class="col-sm-4">
                                        <input type="number"
										 key={field.id} 
                                         class="form-control countryCode"
                                        {...register(`mobiles.${index}.countryCode`, { required: "Country code needed"})}/>
                                        <p style={{color : "red"}}>{errors.mobiles?.[index]?.countryCode?.message}</p></td>
									<td class="col-sm-8">
                                        <input type="number"
                                         key={field.id} 
                                         {...register(`mobiles.${index}.mobileNumber`, { required: "Contact Number is must"})}
										class="form-control mobileNumber"
										 />
                                         <p style={{color : "red"}}>{errors.mobiles?.[index]?.mobileNumber?.message}</p></td>


                                        <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
								</tr>
								

                                ))}
							</tbody>
							<tfoot>
								<tr>
									<td colspan="12" style={{textAlign: 'left'}}><input
										type="button" class="btn btn-lg btn-block " id="addrowMobile"
										value="Add Row" onClick={() => append({"id":"","countryCode":"","mobileNumber":"","isDeleted":false})}/></td>
								</tr>
								<tr>
								</tr>
							</tfoot>
						</table>
                        {fields && fields.length? (
						<button type="submit" class="btn btn-primary" id="mobileBtn">Save
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