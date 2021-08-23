import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';


export function AddressModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "addresses"
      });


      
      // for addresses

     const onAddressSubmit= data => {
       

        (data.addresses || []).map((item, index) => (
            item.candidateId = localStorage.getItem('email')
        ));

        //alert(JSON.stringify(data.addresses));
        
        changeLoader(true);

        const configClient = {
          baseURL: 'http://localhost:9000/',
          headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          
          }
      };

      const instanceClient = axios.create(configClient);

      instanceClient.post('resource/address/saveMultiple',data.addresses)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // addresses end


    return (
        <div class="modal fade" id="address" tabindex="-1" role="dialog"
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
                                <i class="far fa-user"></i> Address
                            </h4>
                        </div>
                        {/* Modal Body */}

                        <div class="modal-body">
                            <form id="address-form" onSubmit={handleSubmit(onAddressSubmit)}>
                                <table id="addressTable" class=" table order-list">

                                    <thead>
                                        <tr>
                                            <td>Country</td>
                                            <td>State</td>
                                            <td>City</td>
                                            <td>Address</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(fields || []).map((field, index) => (
                                        <tr>
                                            <td class="col-sm-2">
                                                <input type="text"
                                                key={field.id}
                                                class="form-control country" 
                                                {...register(`addresses.${index}.country`, { required: "Country is required", maxLength: 50 })}/>
                                                <p style={{color : "red"}}>{errors.addresses?.[index]?.country?.message}</p></td>
                                            

                                            <td class="col-sm-2"><input type="text"
                                                class="form-control state"
                                                key={field.id}
                                                {...register(`addresses.${index}.state`, { required: "State is required", maxLength: 50 })}/>
                                                <p style={{color : "red"}}>{errors.addresses?.[index]?.state?.message}</p></td>

                                            <td class="col-sm-2"><input type="text"
                                                class="form-control city"
                                                key={field.id}
                                                {...register(`addresses.${index}.city`, { required: "City is required", maxLength: 50 })}/>
                                                <p style={{color : "red"}}>{errors.addresses?.[index]?.city?.message}</p></td>

                                            <td class="col-sm-5"><input type="text"
                                                class="form-control addressLine" 
                                                key={field.id}
                                                {...register(`addresses.${index}.addressLine`, { required: "Address is required", maxLength: 200 })}/>
                                                <p style={{color : "red"}}>{errors.addresses?.[index]?.addressLine?.message}</p></td>
                                            
                                            <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
                                            
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="5" style={{textAlign : 'left'}}><input
                                                type="button" class="btn btn-lg btn-block " id="addrow"
                                                value="Add Row" onClick={() => append({"addressId":"","city":"","state":"","isDeleted":false,"country":"","addressLine":""})}/></td>
                                        </tr>
                                        <tr>
                                        </tr>
                                    </tfoot>
                                </table>
                                {fields && fields.length? (
                                <button type="submit" class="btn btn-primary" id="addressBtn" >
                                    Save changes</button>
                                 ): ""}
                            </form>
                        </div>

                        {/*  Modal Footer */}
                        <div class="modal-footer">
                        
                         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                       
                                     
                          

                        </div>

                    </div>

                </div>

            </div>
            );
        }