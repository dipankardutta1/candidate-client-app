import  { useState } from 'react';
import { Controller,useForm ,useFieldArray } from 'react-hook-form';
import axios from 'axios';
import App,{ updateAppState } from '../App';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export function WorkExpModelComponent({data,changeLoader,changeCandidate}) {


    
    const { register, control,handleSubmit,  formState: { errors },reset ,watch } = useForm({ 
        defaultValues : data
      });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "experienceEntries"
      });
    
     
   
 
      
        

     const onExperienceEntriesSubmit= data => {
       
        (data.experienceEntries || []).map((item, index) => (
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

      instanceClient.post('resource/experienceEntry/saveMultiple',data.experienceEntries)
          .then( res => {
            changeCandidate(data);
            //reset(res.data.output);
            changeLoader(false);
          
          }, err => {
            updateAppState({ authenticated: false})
            console.log("erroe1 " +err);
          });

          

    }
   // experienceEntries end


    return (
        <div class="modal fade" id="experienceEntriesModel" tabindex="-1" role="dialog"
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
                                <i class="far fa-user"></i> Work Experience
                            </h4>
                        </div>
                        {/* Modal Body */}

                        <div class="modal-body">
                            <form id="experienceEntries-form" onSubmit={handleSubmit(onExperienceEntriesSubmit)}>
                                <table id="experienceEntriesTable" class=" table order-list">

                                    <thead>
                                    <tr>
									<td>Title</td>
									<td>Start Date</td>
									<td>End Date</td>
									<td>Company</td>
									<td>Industry</td>
									<td>Is Current Company</td>
									<td>Notice Period</td>
									<td>Summary</td>
									
								</tr>
                                    </thead>
                                    <tbody>
                                    {(fields || []).map((field, index) => (
                                        <tr>
                                            <td class="col-sm-1">
                                                <input type="text"
                                                key={field.id}
                                                class="form-control title" 
                                                {...register(`experienceEntries.${index}.title`, { required: "Title is required"})}/>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.title?.message}</p></td>
                                            
                                                <td class="col-sm-1">
                                                
                                                <Controller
                                                    
                                                    control={control}
                                                    name={`experienceEntries.${index}.startDate`}
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
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.startDate?.message}</p>
                                                </td>

                                                <td class="col-sm-1">

                                                    
                                                    <Controller
                                                        
                                                        control={control}
                                                        name={`experienceEntries.${index}.endDate`}
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
                                                   <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.endDate?.message}</p></td>
   
                                                   <td class="col-sm-1"><input type="text"
                                                class="form-control company"
                                                key={field.id}
                                                {...register(`experienceEntries.${index}.company`, { required: "company is required"})}/>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.company?.message}</p></td>

                                            <td class="col-sm-5"><input type="text"
                                                class="form-control industry" 
                                                key={field.id}
                                                {...register(`experienceEntries.${index}.industry`, { required: "industry is required", maxLength: 200 })}/>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.industry?.message}</p></td>
                 
                                                <td class="col-sm-1">
                                                < select  key={field.id} class="form-control type"   {...register(`experienceEntries.${index}.isCurrent`)}>
                                                    <option value='true'>  Yes </option>
                                                    <option value='false'> No </option>
                                                </select>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.isCurrent?.message}</p>
                                                </td>
                                          
                                                <td class="col-sm-1"><input type="number"
                                                class="form-control noticePeriod"
                                                key={field.id}
                                                {...register(`experienceEntries.${index}.noticePeriod`, { required: "Notice Period is required", min:{value:0,message:"Range sholld be from 0 to 365"},max:{value:365,message:"Range sholld be from 0 to 365"}})}/>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.noticePeriod?.message}</p></td>

                                          
                                          
                                            <td class="col-sm-1"><input type="text"
                                                class="form-control summary"
                                                key={field.id}
                                                {...register(`experienceEntries.${index}.summary`, { required: "summary is required"})}/>
                                                <p style={{color : "red"}}>{errors.experienceEntries?.[index]?.summary?.message}</p></td>

                                                                     
                                            <td class="col-sm-1"> {index == 0? <a class="deleteRow"></a>  : <input 
                                                type="button" class="ibtnDel btn btn-md btn-danger "
                                                value="Delete" onClick={() => remove(index)}/>}</td>
                                            
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="8" style={{textAlign : 'left'}}><input
                                                type="button" class="btn btn-lg btn-block " id="addRowWorkExp"
                                                value="Add Row" onClick={() => append({"id":"","title":"","summary":"","isDeleted":false,"startDate":null,"endDate":null,
                                                "company":"","industry":"","isCurrent":false,"noticePeriod":""})}/></td>
                                        </tr>
                                        <tr>
                                        </tr>
                                    </tfoot>
                                </table>
                                {fields && fields.length? (
                                <button type="submit" class="btn btn-primary" id="workExpBtn" >
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