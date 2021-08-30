import React,{useState,useEffect} from 'react';
import { useForm,Controller  } from "react-hook-form";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { TextField, Select,makeStyles  } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import App,{ updateAppState } from '../App';
import axios from 'axios';
{/*
const useStyles = makeStyles(theme => ({
	root: {
	  display: 'flex',
	  flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: theme.spacing(2),
  
	  '& .MuiTextField-root': {
		margin: theme.spacing(1),
		width: '300px',
	  },
	  '& .MuiButtonBase-root': {
		margin: theme.spacing(2),
	  },
	},
  }));
  
*/}
type Option = string;
  


function SearchComponent(){

	  //const classes = useStyles();


	const [maritalStatsusOption, setMaritalStatsusOption] = useState([]);
	const [locationsOption, setLocationsOption] = useState([]);
	const [languageKnownOption, setLanguageKnownOption] = useState([]);
	const [skilllsOption, setSkilllsOption] = useState([]);
	const [companiesOption, setCompaniesOption] = useState([]);
	const [industriesOption, setIndustriesOption] = useState([]);
	const [degreesOption, setDegreesOption] = useState([]);
	const [schoolsOption, setSchoolsOption] = useState([]);
	const [jobtitlesOption, setJobtitlesOption] = useState([]);
	const [employmentTypeOption, setEmploymentTypeOption] = useState([]);
	
	
	
	
	

    const { register, handleSubmit, formState: { errors },setValue ,control  } = useForm({
		defaultValues: { maritalStatsus: [],locations : [] ,languageKnown : [],
			skillls : [],companies : [],industries : [],degrees : [] , schools : [],
			jobtitles : [] , employmentType : [] }
	});

	useEffect(() => {
		/*
		register("maritalStatsus", {
			validate: (value) => !!value.length || "This is required."
		  });
		*/
		  
		


		const configClient = {
			baseURL: 'http://localhost:9000/',
			headers: {
			"Access-Control-Allow-Origin": "*",
			'Authorization' : 'Bearer ' +  localStorage.getItem('token')
			
			}
		};
  
	  const instanceClient = axios.create(configClient);

	  instanceClient.get('resource/candidate/findAll/maritalStatus')
	  .then( res => {
		//console.log("Success---- " + JSON.stringify(res.data));
		setMaritalStatsusOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });


	  instanceClient.get('resource/address/findAll/countryName')
	  .then( res => {
		//console.log("Success---- " + JSON.stringify(res.data));
		setLocationsOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });


	  instanceClient.get('resource/candidate/findAll/language')
	  .then( res => {
		setLanguageKnownOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });

	  instanceClient.get('resource/skills/findAll/SkillName')
	  .then( res => {
		setSkilllsOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });

	  instanceClient.get('resource/candidate/findAll/companies')
	  .then( res => {
		setCompaniesOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });


	  instanceClient.get('resource/candidate/findAll/industries')
	  .then( res => {
		setIndustriesOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });

	  instanceClient.get('resource/educationEntry/findAll/schools')
	  .then( res => {
		setSchoolsOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
		
	  });


	  instanceClient.get('resource/educationEntry/findAll/degrees')
	  .then( res => {
		setDegreesOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
	  });

	  instanceClient.get('resource/candidate/findAll/jobTitle')
	  .then( res => {
		setJobtitlesOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
	  });


	  instanceClient.get('resource/candidate/findAll/employmentType')
	  .then( res => {
		setEmploymentTypeOption(res.data.output);
	  
	  }, err => {
		updateAppState({ authenticated: false})
	  });

	  


	
	}, [register]);

    const onSubmit = (data) => {
		const configClient = {
			baseURL: 'http://localhost:9000/',
			headers: {
			"Access-Control-Allow-Origin": "*",
			'Authorization' : 'Bearer ' +  localStorage.getItem('token')
			
			}
		};
  
	  const instanceClient = axios.create(configClient);
	
	  let str = 'resource/candidate/search/candidate?firstName='+data.firstName+'&lastName='+data.lastName;
	{/*
	  +'&maritalStatsus='+data.maritalStatsus+'&locations='+locations
	  + '&isImageUploaded='+isImageUploaded+'&isCvUploaded='+isCvUploaded+'&languageKnown='+languageKnown+'&skillls='+skillls
	  + '&workExpStart='+workExpStart+'&workExpEnd='+workExpEnd+'&companies='+companies+'&industries='+industries
	  + '&companyActiveness='+companyActiveness+'&schools='+schools+'&degrees='+degrees
	  +'&jobtitles='+jobtitles
	  +'&employmentType='+employmentType
	  +'&page='+page;
	*/}
	  instanceClient.get(str)
	  .then( res => {
		alert(JSON.stringify(res.data));
	  
	  }, err => {
		updateAppState({ authenticated: false})
	  });


	}

	

        return(
            <div className="content profile">
					<div className="container profile-box">
						<div className="row">
							<div className="col-lg-12">
								<div className="search-result-box card-box">
									<div className="row">
										<div className="col-md-12 offset-md-2">
											<div className="pt-3 pb-4">
												<div>

													<section className="search-sec">
														<div>
															<form id="candidateSearch-form" onSubmit={handleSubmit(onSubmit)}>
																<div className="row">
																	<div className="col-lg-12">

																		<div className="panel-group" id="accordion">
																			
																			<div className="panel panel-primary">
																				<div className="panel-heading">
																					<h4 className="panel-title">
																						<a className="accordion-toggle" data-toggle="collapse"
																							data-parent="#accordion" href="#collapseTwo">
																							<i className="fa fa-user" aria-hidden="true"></i>&nbsp;Personnel
																							Details
																						</a>
																					</h4>
																				</div>
																				<div id="collapseTwo"
																					className="panel-collapse collapse">
																					<div className="panel-body">
																						<div className="row">
																							<div className="col-xs-6 col-sm-6 col-lg-6">
																								<div className="form-group">
																									 
																									 {/*
																									<Controller
																										name="firstName"
																										control={control}
																										defaultValue=""
																										render={({ field: { onChange, value }, fieldState: { error } }) => (
																										<TextField
																											label="First Name"
																											variant="filled"
																											value={value}
																											onChange={onChange}
																											error={!!error}
																											helperText={error ? error.message : null}
																										/>
																										)}
																										rules={{ required: 'First name required' }}
																									/>

																									*/}								
																									<label htmlFor="last-name">First Name</label>
                                                                                                    <input
                                                                                                        {...register('firstName')}
																										type="text" className="form-control"
																										id="searchFirstName"
																									placeholder="Enter First Name to Search" />

                                                                                                       <p style={{color : "red"}}>{errors.firstName?.message}</p>
                                                                                                </div>

																							</div>
																							<div className="col-xs-6 col-sm-6 col-lg-6">

																								<div className="form-group">
																									<label htmlFor="last-name">Last Name</label> <input
                                                                                                        {...register('lastName')}
																										type="text" className="form-control"
																										id="searchLastName"
																										placeholder="Enter Last Name to Search" />
                                                                                                        <p style={{color : "red"}}>{errors.lastName?.message}</p>
																								</div>
																							</div>
																						</div>

																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<div className="form-group">
																									<label htmlFor="last-name">Marital Status </label>
																									
																									<Autocomplete
																										multiple
																										options={maritalStatsusOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('maritalStatsus', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.maritalStatsus)}
																											helperText={errors?.maritalStatsus?.message}
																										/>
																										)}
																									/>
																									
                                                                                                    <p style={{color : "red"}}>{errors.maritalStatsus?.message}</p>
																								</div>
																							</div>
																						</div>

																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<div className="form-group">
																									<label htmlFor="last-name">Locations </label> 
																									
																									<Autocomplete
																										multiple
																										options={locationsOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('locations', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.locations)}
																											helperText={errors?.locations?.message}
																										/>
																										)}
																									/>
																									<p style={{color : "red"}}>{errors.locations?.message}</p>
																								</div>
																							</div>
																						</div>

																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<div className="form-group">
																									<label htmlFor="last-name">Languages</label> 
																									
																									<Autocomplete
																										multiple
																										options={languageKnownOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('languageKnown', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.languageKnown)}
																											helperText={errors?.languageKnown?.message}
																										/>
																										)}
																									/>
                                                                                                    <p style={{color : "red"}}>{errors.languageKnown?.message}</p>
																								</div>
																							</div>
																						</div>

																						<div className="row">
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="resume-uploaded">Is Resume
																									Uploaded ?</label> <select {...register('isCvUploaded')}
																									id="resume-uploaded"
																									className="form-control resume-upload">
																									<option value="">No Choice</option>
																									<option value="Y">YES</option>
																									<option value="N">NO</option>
																								</select>
                                                                                                <p style={{color : "red"}}>{errors.isCvUploaded?.message}</p>
																							</div>
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="image-uploaded">Is Image
																									Uploaded ?</label> <select
                                                                                                    {...register('isImageUploaded')}
																									id="image-uploaded"
																									className="form-control image-upload">
																									<option value="">No Choice</option>
																									<option value="Y">YES</option>
																									<option value="N">NO</option>
																								</select>
                                                                                                <p style={{color : "red"}}>{errors.isImageUploaded?.message}</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			
																			<div className="panel panel-primary">
																				<div className="panel-heading">
																					<h4 className="panel-title">
																						<a className="accordion-toggle" data-toggle="collapse"
																							data-parent="#accordion" href="#collapseThree">
																							<i className="fa fa-id-card" aria-hidden="true"></i>
																							&nbsp;Work Experience </a>
																					</h4>
																				</div>
																				<div id="collapseThree"
																					className="panel-collapse collapse">
																					<div className="panel-body">
																																									<div className="row">
																								<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																									<div className="form-group">
																										<label htmlFor="skillls">Skills</label> 
																										
																										<Autocomplete
																										multiple
																										options={skilllsOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('skillls', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.skillls)}
																											helperText={errors?.skillls?.message}
																										/>
																										)}
																									/>
                                                                                                    <p style={{color : "red"}}>{errors.skillls?.message}</p>
																									</div>
																								</div>

																							</div>

																						<div className="row">
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="workStart">Work Start
																								</label> 
																								
																								 <input
																										type="text" className="form-control"
                                                                                                        {...register('workExpStart')}
																										id="workExpStart"
																										placeholder="Range from 0 to 60 years" />
                                                                                                        <p style={{color : "red"}}>{errors.workExpStart?.message}</p>
																								
																							</div>
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="workEnd">Work End</label> 
																								
																								
																								<input
																										type="text" className="form-control"
                                                                                                        {...register('workExpEnd')}
																										id="workExpEnd"
																										placeholder="Range from 0 to 60 years" />
                                                                                                        <p style={{color : "red"}}>{errors.workExpEnd?.message}</p>
																							</div>
																						</div>
																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<div className="form-group">
																									<label htmlFor="companies">Companies</label> 
																									
																									<Autocomplete
																										multiple
																										options={companiesOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('companies', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.companies)}
																											helperText={errors?.companies?.message}
																										/>
																										)}
																									/>
                                                                                                        <p style={{color : "red"}}>{errors.companies?.message}</p>
																								</div>
																							</div>

																						</div>
																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<div className="form-group">
																									<label htmlFor="industry">Industry</label> 
																									
																									<Autocomplete
																										multiple
																										options={industriesOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('industries', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.industries)}
																											helperText={errors?.industries?.message}
																										/>
																										)}
																									/>
                                                                                                        <p style={{color : "red"}}>{errors.industries?.message}</p>
																								</div>
																							</div>

																						</div>
																						<div className="row">
																						<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								<label htmlFor="companyInfo">Company Type</label> <select
                                                                                                    {...register('companyActiveness')}
																									id="companyInfo"
																									className="form-control companyInfo">
																									<option value="">ANY</option>
																									<option value="C">CURRENT</option>
																									<option value="P">PREVIOUS</option>
																								</select>
                                                                                                <p style={{color : "red"}}>{errors.companyActiveness?.message}</p>
																							</div>
																						
																						</div>
																						
																					</div>
																				</div>
																			</div>
																			
																			
																			
																			<div className="panel panel-primary">
																				<div className="panel-heading">
																					<h4 className="panel-title">
																						<a className="accordion-toggle" data-toggle="collapse"
																							data-parent="#accordion" href="#collapseFour">
																							<i className="fa fa-graduation-cap" aria-hidden="true"></i>
																							&nbsp;Education Details</a>
																					</h4>
																				</div>
																				<div id="collapseFour"
																					className="panel-collapse collapse">
																					<div className="panel-body">
																							<div className="row">
																								<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																									<div className="form-group">
																										<label htmlFor="degrees">Degrees</label> 
																										
																										<Autocomplete
																										multiple
																										options={degreesOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('degrees', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.degrees)}
																											helperText={errors?.degrees?.message}
																										/>
																										)}
																									/>
																										
																									<p style={{color : "red"}}>{errors.degrees?.message}</p>
																									</div>
																								</div>

																							</div>
																							
																							<div className="row">
																								<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																									<div className="form-group">
																										<label htmlFor="schools">Schools</label> 
																										
																										<Autocomplete
																										multiple
																										options={schoolsOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('schools', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.schools)}
																											helperText={errors?.schools?.message}
																										/>
																										)}
																									/>
																									<p style={{color : "red"}}>{errors.schools?.message}</p>
																									</div>
																								</div>

																							</div>

																						<div className="row">
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="graStartDate">Graduation Start Date
																								</label> 
																								
																								 <input
                                                                                                    {...register('graduationStartDate')}
																										type="text" className="form-control" readonly
																										 id="graduationStartDate"
																										/>
                                                                                                        <p style={{color : "red"}}>{errors.graduationStartDate?.message}</p>
																								
																							</div>
																							<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																								<label htmlFor="graduationEndDate">Graduation End Date</label> 
																								
																								
																								 <input
                                                                                                    {...register('graduationEndDate')}
																										type="text" className="form-control" readonly
																										id="graduationEndDate"
																										/>
                                                                                                        <p style={{color : "red"}}>{errors.graduationEndDate?.message}</p>
																							</div>
																						</div>
																						
																						
																						
																						
																					</div>
																				</div>
																			</div>
																			
																			<div className="panel panel-primary">
																				<div className="panel-heading">
																					<h4 className="panel-title">
																						<a className="accordion-toggle" data-toggle="collapse"
																							data-parent="#accordion" href="#collapseFive">
																							<i className="fa fa-handshake-o" aria-hidden="true"></i>
																							&nbsp;Professional Details</a>
																					</h4>
																				</div>
																				<div id="collapseFive"
																					className="panel-collapse collapse">
																					<div className="panel-body">
																							<div className="row">
																								<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																									<div className="form-group">
																										<label htmlFor="jobtitles">Job Title</label> 
																										
																										<Autocomplete
																										multiple
																										options={jobtitlesOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('jobtitles', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.jobtitles)}
																											helperText={errors?.jobtitles?.message}
																										/>
																										)}
																									/>
																									<p style={{color : "red"}}>{errors.jobtitles?.message}</p>
																									</div>
																								</div>

																							</div>
																							
																							<div className="row">
																								<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																									<div className="form-group">
																										<label htmlFor="employmentType">Employment Type</label> 
																										
																										<Autocomplete
																										multiple
																										options={employmentTypeOption}
																										getOptionLabel={(option: Option) => option}
																										onChange={(e, options) => setValue('employmentType', options)}
																										renderInput={(params) => (
																										<TextField
																											
																											{...params}
																											error={Boolean(errors?.employmentType)}
																											helperText={errors?.employmentType?.message}
																										/>
																										)}
																									/>
																									<p style={{color : "red"}}>{errors.employmentType?.message}</p>
																									</div>
																								</div>

																							</div>

																						<div className="row">
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																							<label htmlFor="noticePeriodInDays">Notice Period In Days
																								</label> 
																							</div>
																							<div className="col-lg-12 col-md-12 col-sm-12 p-0">
																								
																								<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																									<select
                                                                                                        {...register('noticePeriodcriteria')}
																										id="noticePeriodcriteria"
																										className="form-control">
																										<option value="eq">Equal</option>
																										<option value="lt">Less Than </option>
																										<option value="gt">Greater Than </option>
																										<option value="lte">Less Than Equal </option>
																										<option value="gte">Greater Than Equal </option>
																									</select>
                                                                                                    <p style={{color : "red"}}>{errors.noticePeriodcriteria?.message}</p>
																								</div>
																								<div className="col-lg-6 col-md-6 col-sm-6 p-0">
																									 <input
                                                                                                            {...register('noticePeriodInDays')}
																											type="text" className="form-control"
																											id="noticePeriodInDays"
																											/>
                                                                                                            <p style={{color : "red"}}>{errors.noticePeriodInDays?.message}</p>
																								</div>
																								
																							</div>
																							
																						</div>
																						
																						
																						
																						
																					</div>
																				</div>
																			</div>
																			
																		</div>

																		<div className="row">
																			<br />
																		</div>
																		<div className="row">
																			<div className="col-lg-2 col-md-2 col-sm-12 p-0">
																				<button type="submit" className="btn btn-danger wrn-btn"><i className="fa fa-search"></i></button>
																			</div>
																			<div className="col-lg-2 col-md-2 col-sm-12 p-0">
																				<button type="button" className="btn btn-danger wrn-btn"><i className="fa fa-refresh"></i></button>
																			</div>
																		</div>
																	</div>
																</div>
															</form>
														</div>
													</section>


												</div>
												
											</div>
										</div>
									</div>
									
									<ul className="nav nav-tabs tabs-bordered">
										<li className="nav-item"><a href="#users" data-toggle="tab"
											aria-expanded="true" className="nav-link active">Users <span
												className="badge badge-danger ml-1"></span></a></li>
									</ul>
									<div className="tab-content"  >  {/* th:unless="${#lists.isEmpty(candidateDtos)}" */}

										
										<div className="tab-pane active" id="users">



											<div className="search-item" > {/*  th:each="obj: ${candidateDtos}" */}
												<div className="media mt-1">
													<img
														alt="Generic placeholder image"
														className="d-flex mr-3 rounded-circle" height="54"></img>


													<div className="media-body">
														<h5 className="media-heading mt-0">
															<a
																href="/candidateService/profile/search?email="
																className="text-dark"><span
																> {/*  th:text="${obj.firstName + ' ' + obj.lastName}"  */} </span></a>
														</h5>
														<p className="font-13">
															<b>Email:</b> <span><a href="#" className="text-muted"><span
																	> {/*  th:text="${obj.email}"  */} </span></a></span>
														</p>
														<p className="mb-0 font-13">
															<b>Bio:</b> <br/> <span className="text-muted"><span
																> {/*  th:text="${obj.summary}"  */} </span></span>
														</p>
													</div>
												</div>
											</div>




											
											<div className="clearfix"></div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						
					</div>

					
						
					

					
				</div>



        )
    
}

export default SearchComponent;