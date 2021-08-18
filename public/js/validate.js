

$(function(){
	$.validator.addMethod('filesize', function (value, element, param) {
		return this.optional(element) || (element.files[0].size <= param * 1000000 )//* 1000000
	}, 'File size must be less than {0} MB');

	$.validator.addMethod("noNumberAllowed", function(value, element) {
		// allow any non-whitespace characters as the host part
		return this.optional( element ) || /^[^0-9]+$/i.test( value );
	}, " Can not be Number");

	$.validator.addMethod("workExpEndDateValidation", function(value, element) {
		var elementName=$(element).attr('name');
		var value1= $("input[name="+elementName+"]").val();
		
		var flag=true;
		$("form#workExp-form :input").each(function(){
			var endDate = $(this).attr('name');
			if(typeof endDate!=="undefined"){
				if(endDate.startsWith("endDate")){
					if(endDate===elementName){
						$("form#workExp-form :input").each(function(){
							var stDate = $(this).attr('name');
							if(typeof stDate!=="undefined"){
								if(stDate.startsWith("startDate")){
									if(stDate.charAt(stDate.length)===elementName.charAt(elementName.length)){
										var eDate= $("input[name="+elementName+"]").val();
										var sDate= $("input[name="+stDate+"]").val();
										if ((Date.parse(eDate) <= Date.parse(sDate))) {
											$("input[name="+elementName+"]").focus();
											flag=false;
										}
									}
								}
							}
							
						});
					}

				}

			}
		});
		return flag;
	}, "Start Date Must Be Greater than End Date");

	$.validator.addMethod("eduEndDateValidation", function(value, element) {
		var elementName=$(element).attr('name');
		var value1= $("input[name="+elementName+"]").val();
		
		var flag=true;
		$("form#education-form :input").each(function(){
			var endDate = $(this).attr('name');
			if(typeof endDate!=="undefined"){
				if(endDate.startsWith("endDate")){
					if(endDate===elementName){
						$("form#education-form :input").each(function(){
							var stDate = $(this).attr('name');
							if(typeof stDate!=="undefined"){
								if(stDate.startsWith("startDate")){
									if(stDate.charAt(stDate.length)===elementName.charAt(elementName.length)){
										var eDate= $("input[name="+elementName+"]").val();
										var sDate= $("input[name="+stDate+"]").val();
										if ((Date.parse(eDate) <= Date.parse(sDate))) {
											$("input[name="+elementName+"]").focus();
											flag=false;
										}
									}
								}
							}
							
						});
					}

				}

			}
		});
		return flag;
	}, "Start Date Must Be Greater than End Date");

	$("#summary-form").validate({

		rules:{
			firstName:{
				required:true,
				maxlength: 25,
				noNumberAllowed:true
			},
			lastName:{
				required:true,
				maxlength: 25,
				noNumberAllowed:true
			},
			profileTitle:{
				required:true,
				maxlength: 25
			},
			summary:{
				required:true,
				maxlength: 300
			}
		},
		messages:{
			firstName:{
				required:'First Name can not be blank',
				maxlength:'Length can not exceed 25 characters'
			},
			lastName:{
				required:'Last Name can not be blank',
				maxlength:'Length can not exceed 25 characters'
			},
			profileTitle:{
				required:'Profile Title can not be blank',
				maxlength:'Length can not exceed 25 characters'
			},
			summary:{
				required:'Summary  can not be blank',
				maxlength:'Length can not exceed 300 characters'
			}
		}


	});
	$("#profile-form").validate({

		rules:{
			aliasName:{
				required:true,
				maxlength: 15,
				noNumberAllowed:true
			},
			placeOfBirth:{
				required:true,
				maxlength: 25,

			},
			maritalStatus:{
				required:true,

			},
			birthDate:{
				required:true,

			},
			workExperience:{
				required:true,
				range: [0,365]

			},
			releventExperience:{
				required:true,
				range: [0,365]
			}
		},
		messages:{
			aliasName:{
				required:'Alias Name can not be blank',
				maxlength:'Length can not exceed 15 characters'
			},
			placeOfBirth:{
				required:'Place Of Birth can not be blank',
				maxlength:'Length can not exceed 25 characters'
			},
			maritalStatus:{
				required:'Marital Status can not be blank',
			},
			birthDate:{
				required:'Birth Date  can not be blank',
			},
			workExperience:{
				required:'Work Experience can not be blank',
				range:"only numbers accepted range[0-365]"
			},
			releventExperience:{
				required:'Relevant Experience   can not be blank',
				range:"only numbers accepted range[0-365]"
			}
		}
	});


	$("#address-form").validate();

	$("#workExp-form").validate();

	$("#education-form").validate();

	$("#skill-form").validate();

	$("#contact-form").validate();
	$("#social-form").validate();
	$("#hobby-form").validate();
	$("#language-form").validate();

	$("#avatar-form").validate({

		rules:{
			avatarUpload:{
				required:true,
				accept: "image/*",
				extension:"png|jpe?g|gif",
				filesize:1
			}//1000000
		},
		messages:{
			avatarUpload:{
				required:'Can not be blank',
				accept:'Only Images are allowed',
				extension:'Only Images are allowed',
				filesize:"File size within 1 MB"
			}
		}
	});

	$("#resume-form").validate({

		rules:{
			resumeUpload:{
				required:true,
				extension: "docx|rtf|doc|pdf",
				accept: "docx|rtf|doc|pdf",
				filesize:2
			}//2000000
		},
		messages:{
			resumeUpload:{
				required:'Can not be blank',
				extension:'Only docx,doc,pdf,rtf  are allowed',
				filesize:"File size within 2 MB",
				accept:"Only docx,doc,pdf,rtf  are allowed"
			}
		}
	});


});
