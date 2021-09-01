import  { useState } from 'react';
import { Controller,useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export function EducationModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "educationEntries"
      });
    
     const onEducationEntriesSubmit= data => {
       
        (data.educationEntries || []).map((item, index) => (
            item.candidateId = localStorage.getItem('email')
        ));

        //alert(JSON.stringify(data.experienceEntries));
        
        changeLoader(true);
        
        const configClient = {
          baseURL: 'http://localhost:9000/',
          headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          
          }
      };

      const instanceClient = axios.create(configClient);

      instanceClient.post('resource/educationEntry/saveMultiple',data.educationEntries)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);educationEntry
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // experienceEntries end


    return (
        <div class="modal fade" id="educationEntriesModel" tabindex="-1" role="dialog"
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
                                <i class="far fa-user"></i> Education 
                            </h4>
                        </div>
                        {/* Modal Body */}

                        <div class="modal-body">
                            <form id="educationEntries-form" onSubmit={handleSubmit(onEducationEntriesSubmit)}>
                                <table id="educationEntriesTable" class=" table order-list">

                                    <thead>
                                    <tr>
									<td>Degree</td>
                                    <td>Start Date</td>
									<td>End Date</td>
									<td>School</td>
									<td>Field Of Study</td>
									
								</tr>
                                    </thead>
                                    <tbody>
                                    {(fields || []).map((field, index) => (
                                        <tr>
                                            <td class="col-sm-2">
                                                <input type="text"
                                                key={field.id}
                                                class="form-control degree" 
                                                {...register(`educationEntries.${index}.degree`, { required: "Degree is required",maxLength:{value:20,message:"Can not  exceed maximum length"}})}/>
                                                <p style={{color : "red"}}>{errors.educationEntries?.[index]?.degree?.message}</p></td>
                                            
                                                <td class="col-sm-2">
                                                
                                                <Controller
                                                    
                                                    control={control}
                                                    name={`educationEntries.${index}.startDate`}
                                                    rules={{ required: "Start Date is required" }} 
                                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                                    <ReactDatePicker
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        selected={value != null ? moment(value).toDate() : ""}
                                                        dateFormat={"MM/dd/yyyy"}
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        maxDate={new Date()}
                                                        minDate={new Date(1900, 1, 1)}
                                                        className="form-control"
                                                        key={field.id}
                                                    />
                                                    )}
                                                />
                                                    
                                                    
                                                    {/* 
                                                    < ReactDatePicker  key={field.id}  {...register(`experienceEntries.${index}.startDate`, { required: "startDate is required"})}
                                                    selected={startDates[index]}
                                                    onChange={date=>rcvStartDate(date,index)} 
                                                    maxDate={new Date()}
                                                    dateFormat="MM/dd/yyyy"
                                                    
                                                 />
                                                */}
                                                <p style={{color : "red"}}>{errors.educationEntries?.[index]?.startDate?.message}</p>
                                                </td>

                                                <td class="col-sm-2">

                                                    
                                                    <Controller
                                                        
                                                        control={control}
                                                        name={`educationEntries.${index}.endDate`}
                                                        rules={{ required: "End Date is required" }} 
                                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                                        <ReactDatePicker
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            selected={value != null ? moment(value).toDate() : ""}//{value != null ? moment(value).toDate() : ""}
                                                            dateFormat={"MM/dd/yyyy"}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            maxDate={new Date()}
                                                            minDate={new Date(1900, 1, 1)}
                                                            className="form-control"
                                                            key={field.id}
                                                            
                                                        />
                                                        )}
                                                    />
                                                    

                                                    {/*
                                                   < ReactDatePicker  key={field.id} {...register(`experienceEntries.${index}.endDate`, { required: "endDate is required"})}
                                                    selected={endDates[index]}
                                                   onChange={date=>rcvEndDate(date,index)} 
                                                   minDate={new Date(field.startDate)}
                                                     dateFormat="MM/dd/yyyy"
                                                 /> 

                                                 */}
                                                   <p style={{color : "red"}}>{errors.educationEntries?.[index]?.endDate?.message}</p></td>
   
                                                   <td class="col-sm-2"><input type="text"
                                                class="form-control school"
                                                key={field.id}
                                                {...register(`educationEntries.${index}.school`, { required: "school is required",maxLength:{value:20,message:"Can not  exceed maximum length"}})}/>
                                                <p style={{color : "red"}}>{errors.educationEntries?.[index]?.school?.message}</p></td>

                                            <td class="col-sm-2"><input type="text"
                                                class="form-control fieldOfStudy" 
                                                key={field.id}
                                                {...register(`educationEntries.${index}.fieldOfStudy`, { required: "Field Of Study is required", maxLength:{value:20,message:"Can not  exceed maximum length"} })}/>
                                                <p style={{color : "red"}}>{errors.educationEntries?.[index]?.fieldOfStudy?.message}</p></td>
                                                                     
                                            <td class="col-sm-2"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
                                            
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="8" style={{textAlign : 'left'}}><input
                                                type="button" class="btn btn-lg btn-block " id="addRowEducationEntry"
                                                value="Add Row" onClick={() => append({"id":"","degree":"","startDate":null,"endDate":null,"isDeleted":false,
                                                "school":"","fieldOfStudy":""})}/></td>
                                        </tr>
                                        <tr>
                                        </tr>
                                    </tfoot>
                                </table>
                                {fields && fields.length? (
                                <button type="submit" class="btn btn-primary" id="eduExpBtn" >
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