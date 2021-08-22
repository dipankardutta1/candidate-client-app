import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
      
export function SummaryModelComponent({preloadValues}) {

    const { register, handleSubmit,  formState: { errors }  } = useForm({
        defaultValues: preloadValues
      });
  const onSubmit = data => console.log(data);
      
    
      
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

                <form id="summary-form" onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                        <label for="firstName">First Name(*)</label> <input
                            class="form-control" id="firstName"
                            {...register("firstName", { required: true, maxLength: 20 })}
                            placeholder="Enter First Name" />
                        
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name(*)</label> <input
                        {...register("lastName", { required: true, maxLength: 20 })}
                            class="form-control" id="lastName"
                            placeholder="Enter Last Name" />
                        
                    </div>
                    <div class="form-group">
                        <label for="profileTitle">Profile Title(*)</label> <input
                            class="form-control"
                            {...register("profileTitle", { required: true, maxLength: 20 })}
                            id="profileTitle"
                            placeholder="Enter Profile Title" />
                           
                    </div>
                    <div class="form-group">
                        <label for="summary">Summary(*)</label>
                        <textarea class="form-control" rows="5" id="summary"
                         {...register("summary", { required: true, maxLength: 100 })}
                            ></textarea>
                           
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