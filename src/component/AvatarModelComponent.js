import { useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import  { useState } from 'react';


export function AvatarModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

     
      
      // for addresses

     const onAvatarSubmit= data => {
       

        
        alert(JSON.stringify(data));
        
       

      
          

    }
   // addresses end


    return (
        <div class="modal fade" id="avatarModel" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog">
			<form id="avatar-form" onSubmit={handleSubmit(onAvatarSubmit)}>
				<div class="modal-content">
					{/*  Modal Header */}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">
							<i class="far fa-user"></i> Avatar
						</h4>
					</div>

					{/*  Modal Body */}
					<div class="modal-body">
						<input  {...register("avatarUpload", { required: "Please Upload an Image"})} id="avatarUpload" type="file" />
                        <p style={{color : "red"}}>{errors.avatarUpload && errors.avatarUpload.message}</p>
                    </div>

					{/*  Modal Footer */}
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