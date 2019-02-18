
jQuery(document).ready(function() {

	jQuery("#pbLookUpMessage").hide();
	jQuery("#pb_lookup_result").hide();
	jQuery(".searchformFRTCloseBTN").hide();
	console.log("Running JQuery");

	var apiUrl 			= jQuery("#searchformFRT").attr("data-api-url"); // added Jan 21, 2019
	var whereToCallFlag = jQuery("#searchformFRT").attr("data-where-to-call"); // added Jan 21, 2019
	if (typeof cookieSaved !== 'undefined') {
	    console.log("You have a cookie!");
	    jQuery('#txtFirstName').val(cookieSaved.FirstName);
	    jQuery('#txtLastName').val(cookieSaved.LastName);
	    jQuery('#txtPhoneNumber').val(cookieSaved.PhoneNumber) ;
	    jQuery('#txtMail').val(cookieSaved.Mail);
	    jQuery('#txtAddress').val(cookieSaved.Address);
	    jQuery('#txtState').val(cookieSaved.State);
	    jQuery('#txtCountry').val(cookieSaved.Country);
	}
		
	/*
	jQuery(window).click(function() {
		jQuery('.modalFRT').hide();
		// modal.style.display = "none";
	});
	*/
	//if(whereToCallFlag == "0"){
	//	pbLookUpFetchData();
	//}

	jQuery("#btn-srh").click(function() {
		//if(whereToCallFlag == "0"){
		console.log("The query will be performed on the same page");
		pbLookUpFetchData();
	});

	jQuery(".searchformFRTCloseBTN").click(function(){
		jQuery('#pb_lookup_result').remove();
		jQuery('.searchformFRTCloseBTN').hide();
		jQuery(".modal-backdrop").remove();
		jQuery('.wrapperSearchformFRT').css("z-index", "88");
		jQuery('.wrapperSearchformFRT').css("position", "static");
		jQuery('.wrapperSearchformFRT').css('top','');
	});

	/******** Added: Feb 4th, 2019     *******************/
	jQuery('.lbl-toggle').on( "click", function(){
		
		if (jQuery('.toggle').prop('checked')) {
			// jQuery(".modal-backdrop").remove();
			console.log("aaaaaaaaaaaa");
			jQuery('.wrap-collabsible').css("z-index", "100");
			jQuery('.wrap-collabsible').css('top','90%');
			jQuery('.wrap-collabsible').css("position", "");
		}
		else{
			console.log("qqqqqqqq");
			// jQuery(".searchformFRTCloseBTN").show();
			// jQuery( "body" ).append( '<div class="modal-backdrop fade in"></div>' );
			jQuery('.wrap-collabsible').css("z-index", "1500");
			jQuery('.wrap-collabsible').css('top','10%');
			jQuery('.wrap-collabsible').css("position", "sticky");
		}
	});
	/*****************************************************/
	function pbLookUpFetchData(){
		console.log("dfsdfsdf");
		// jQuery( "body" ).append( '<div class="modal-backdrop fade in"></div>' );
		jQuery('.wrapperSearchformFRT').css("z-index", "1500");
		jQuery('.wrapperSearchformFRT').css("position", "sticky");
		jQuery('.wrapperSearchformFRT').css('top','10%');
		jQuery.ajax({
			type: "GET",
			crossDomain: true,
			url: apiUrl,
			data:{
				Filter:"1000,1002"
				,FilterType:"Keyword"
				,ConditionCode:"RP"
				,XrefType:"UsMcrlXref"
				,Location:"3"
				,SortBy:"Pma"
				,Page:"1"
				,PageSize:"5"
			},beforeSend:function(){
				jQuery("#pbLookUpMessage").show();
			},
			complete:function(){
				jQuery("#pbLookUpMessage").hide();
			},
			success: function(response, status, xhr){
				console.log("succeded");
				// jQuery(".searchformFRTCloseBTN").show();
				jQuery("#pb_lookup_result").show();
				jQuery('#tableContainer').css('margin-top', '10px');
				//jQuery('.wrapperSearchformFRT').focus();
				pbLookUpTableGenerator('#pb_lookup_result',response);
			},
			error: function(xhr, status, error) {
				alert("Something went wrong!  => "+status);
			}
		});
	}
	/*****************************************************/
	function splitMulti(str, tokens){
		var tempChar = tokens[0];
		for (var i = 1; i < tokens.length; i++){
			str = str.split(tokens[i]).join(tempChar);
		}
		str = str.split(tempChar);
		return str;
	}

	function splitDataPB(){
		//srh-text
		var str = jQuery("#srh-text").val()
		var res = splitMulti(str, ['\n', ',', ' ']);
		alert(res.length);
	}

	function requestPBdata(){
		jQuery.ajax({
			// url: "https://serene-beach-38011.herokuapp.com/api/faker?page=1&per_page=5",
			url: "https://saurg63h8l.execute-api.us-west-2.amazonaws.com/Staging/search?Filter=1000,1002&FilterType=Keyword&ConditionCode=RP&XrefType=UsMcrlXref&Location=3&SortBy=Pma&Page=1&PageSize=5",
			beforeSend:function(){console.log("fetching data");},
			complete:function(){console.log("Complete request")},
			success: function(response, status, xhr) {
				alert(JSON.stringify(response));
			},
			error: function(xhr, status, error) {
				alert("Something went wrong!");
			}
		});
	}

	//data is an array
	function pbLookUpTableGenerator(selector, data){
		//Get the keys to make the header
		// console.log(data.items);
		// var arr = data.items;
		// var keys = Object.keys(Object.assign({}, ... arr));
		//Add header
		var head = '<thead><tr><th><strong>PART NUMBER</strong></th><th><strong>DESCRIPTION</strong></th><th><strong>CC</strong></th><th><strong>UNIT PRICE</strong></th><th><strong>LOC</strong></th><th><strong></strong></th></tr></thead>';
		// add the following line only for testing purposes
		var counter1 = 0;
		/*
		keys.forEach(function(key) {
			head += '<th scope="col">'+key+'</th>';
		});
		*/
		// for (var k in keys) {
		// 	head += '<th scope="col">'+keys[k]+'</th>';
		// 	counter1++;
		// 	if(counter1 == 6){
		// 		break ;
		// 	}
		// 	// console.log(keys[k]);
		// }
		
		jQuery(selector).append(head+'</tr></thead>');
		//Add body
		// for testing pourposes, not reading from JSON
		
		var body = '<tbody>';
		var tmp = 0;
		
		/*arr.forEach(function(obj){
			//For each row
		*/
			var row = '<tr>';
		/*
			var counter2 = 0;
			
			//keys.forEach(function(key){

				//For each column
			//	row += '<td>';
			//	if (obj.hasOwnProperty(key)){
					//If the obj doesnt has a certain key, add a blank space.
			//		row += obj[key];
			//	}
			//	row += '</td>';
			//	counter2++;
			//	console.log(counter2);
				// if(counter2 == 7){
				// 	keys.length = 0;
				// }
			//});
			
			for (var k in obj) {
				row += '<td>';
				if (obj.hasOwnProperty(k)){
					//If the obj doesnt has a certain key, add a blank space.
					row += obj[k];
				}
				row += '</td>';
				counter2++;
				if(counter2 == 6){
					break ;
				}
			}
			row += '<td class="text-center"><input type="number" class="form-control" placeholder="1" style="width:50px;"></td>';
			row += '<td><button class="btn btn-success sendRFQ"><i class="fa fa-send"></i>  Send RFQ</button></td>'; //data-toggle="modal" data-target=".bs-example-modal-lg"
			body += row+'<tr>';
			tmp++;
		});
		*/

		row+= '<td ><div class="col-sm-3 text-left">A100</div> <div class="col-sm-6 text-left">455-8001-3-771</div></td>';
		row+= '	<td >Bearings</td>';
		row+= '	<td >OH, NS</td>';
		row+= '	<td >RFQ</td>';
		row+= '	<td >KS - 486</td>';
		row+= '	<td class="text-center"><button class="btn-successFRT sendRFQ" onclick="goSendRFQ();"><i class="fa fa-send"></i>  Send RFQ</button></td>';
		row+= '</tr>';
		row+= '<tr>';
		row+= '	<td ><div class="col-sm-3 text-left">KP8A</div> <div class="col-sm-6 text-left">121-6385249-007</div></td>';
		row+= '	<td >Bearings</td>';
		row+= '	<td >NE</td>';
		row+= '	<td >RFQ</td>';
		row+= '	<td >KS - 486</td>';
		row+= '	<td class="text-center"><button class="btn-successFRT sendRFQ" onclick="goSendRFQ();"><i class="fa fa-send"></i>  Send RFQ</button></td>';
		row+= '</tr>';
		row+= '<tr>';
		row+= '	<td ><div class="col-sm-3 text-left">KP8A</div> <div class="col-sm-6 text-left">121-6385249-007</div></td>';
		row+= '	<td >Bearings</td>';
		row+= '	<td >NE</td>';
		row+= '	<td >RFQ</td>';
		row+= '	<td >Multiple</td>';
		row+= '	<td class="text-center"><button class="btn-successFRT sendRFQ" onclick="goSendRFQ();"><i class="fa fa-send"></i>  Send RFQ</button></td>';
		row+= '</tr>';
		row+= '<tr>';
		row+= '	<td ><div class="col-sm-3 text-left">KP8A</div> <div class="col-sm-6 text-left">121-6385249-007</div></td>';
		row+= '	<td >Bearings</td>';
		row+= '	<td >NE</td>';
		row+= '	<td ><strong>$39.90</strong></td>';
		row+= '	<td >Multiple</td>';
		row+= '	<td class="text-center"><button class="btn-successFRT sendRFQ" onclick="goSendRFQ();"><i class="fa fa-send"></i>  Send RFQ</button></td>';
		row+= '</tr>';
		row+= '<tr>';
		row+= '	<td ><div class="col-sm-3 text-left">KP8A</div> <div class="col-sm-6 text-left">121-6385249-007</div></td>';
		row+= '	<td >Bearings</td>';
		row+= '	<td >FN</td>';
		row+= '	<td ><trong>$34.79</strong></td>';
		row+= '	<td >CA -1860</td>';
		row+= '	<td class="text-center"><button class="btn-successFRT sendRFQ" onclick="goSendRFQ();"><i class="fa fa-send"></i>  Send RFQ</button></td>';
		body += row+'<tr>';
		jQuery(selector).append(body+'</tbody>');
		var footer = '<tfoot>';
		footer+= '<tr><td colspan="6" class="text-center"><div class="row"><div class="col-sm-4"></div><div class="col-sm-4"><ul class="paginationFRT text-center"><li><a href="#">«</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li><li><a href="#">»</a></li></ul></div><div class="col-sm-4"><div class="imgFooter"><span>Powered By: </span>';
		var imgGetData= jQuery("#searchformFRT").attr("data-img-route"); // added Jan 21, 2019
		footer+= '<img src="'+imgGetData+'">';
		footer+= '</div></div></div></td></tr>';
		jQuery(selector).append(footer+'</tfoot>');
	}
	/**/
	//This code hide the options to search for parts if the search is by description.
	jQuery(function(){
	  jQuery("#select_optionsrh").change(function() {
		if (jQuery("#srh_bydescript").prop('checked')) {
			jQuery("#option_srh").hide();
		} 
		else {
			jQuery("#option_srh").show();
		}
	  }).trigger('change');
	});

	jQuery(function(){
		var jumboHeight = jQuery('.jumbotron').outerHeight();
		function parallax(){
		    var scrolled = jQuery(window).scrollTop();
		    jQuery('.bg').css('height', (jumboHeight-scrolled) + 'px');
		}
		function sendRFQ(){
			jQuery("#validateMsj").append("<div class='alertFRT alert-infoFRT alert-dismissableFRT' id='myAlert'> <button type='button' class='closeFRT' data-dismiss='alertFRT'  aria-hidden='true'></button> <strong>The RFT basket has been sent.</strong>.</div>");
			jQuery("#validateMsj").css("display", "");
			jQuery(".alert-dismissableFRT").fadeTo(6000, 500).slideUp(6000, function(){
				jQuery(".alert-dismissableFRT").slideUp(500);
				jQuery("#validateMsj").empty()
			});
		}
		jQuery(window).scroll(function(e){
		    parallax();
		});
		/*********************/
		// When the user clicks the button, open the modal 
		
		/*
		// When the user clicks anywhere outside of the modal, close it
		jQuery(window).click(function(event) {
			if (event.target == modal) {
				jQuery('#myModalFRT').hide();
				//modal.style.display = "none";
			}
		});
		*/
	});
	
	jQuery('#sndRFQ').on('click',function(){
		var urlBase = document.location.hostname;
		var cookieValues = JSON.stringify({FirstName: jQuery('#txtFirstName').val(),LastName: jQuery('#txtLastName').val(),PhoneNumber: jQuery('#txtPhoneNumber').val(),Mail: jQuery('#txtMail').val(),Address: jQuery('#txtAddress').val(),State: jQuery('#txtState').val(),Country: jQuery('#txtCountry').val()});
		jQuery.ajax({
			url: "/wp-admin/admin-ajax.php", 
			method:'POST', // POST
			dataType: 'json',
			data:{
				"cookiedata": cookieValues,
				"action":"wpPBLookUp_set_cookie"
			},
			complete:function(){
				jQuery("#validateMsj").append("<div class='alertFRT alert-infoFRT alert-dismissableFRT' id='myAlert'> <button type='button' class='closeFRT' data-dismiss='alertFRT'  aria-hidden='true'></button> <strong>The RFT basket has been sent.</strong>.</div>");
				jQuery("#validateMsj").css("display", "");
				jQuery(".alert-dismissableFRT").fadeTo(2000, 500).slideUp(2000, function(){
					jQuery(".alert-dismissableFRT").slideUp(500);
					jQuery("#validateMsj").empty()
				});
			},
			success:function(data){
				
				//filter.find('button').text('Apply filter'); // changing the button label back
				console.log(data); // insert data

			}
		});
	});
	
	/***********************************************************************************/
	
	//original http://bootsnipp.com/snippets/featured/buttons-minus-and-plus-in-input
	jQuery.fn.bootnumberspiner = function(options) {
		var spinners = jQuery(this);
	   
	    jQuery(spinners).each(function (key,spinner) {
	        spinner.settings = jQuery.extend({
		    	width:"150px",
	      		value:0,
	            id:key,
	      		min_value:0,
	      		max_value:50,
	      		name:"quint",
	      		minus_icon:"fa fa-minus",
	      		plus_icon:"fa fa-plus",
	          	onChange:function(){},
	          	onCreate:function(){}
		    }, options);

			var $spinner = jQuery(spinner);

			spinner.settings.value = $spinner.attr('data-value') || spinner.settings.value;
			spinner.settings.id = $spinner.attr('data-id') || spinner.settings.id;
			spinner.settings.name = $spinner.attr('data-name') || spinner.settings.name;

			$spinner.css("width",spinner.settings.width);
			$spinner.html(get_content(spinner));

			bind_click($spinner,spinner);
			focusin($spinner,spinner);
			change($spinner,spinner);
			spinner.settings.onCreate(spinner);
	        
	    });
	    
	    function change($spinner,spinner){
	        var input_number = $spinner.find('.input-number');
	    
	        jQuery(input_number).change(function() {
	    
	          minValue =  parseInt(jQuery(this).attr('min'));
	          maxValue =  parseInt(jQuery(this).attr('max'));
	          valueCurrent = parseInt(jQuery(this).val());
	          
	          name = jQuery(this).attr('name');
	          if(valueCurrent >= minValue) {
	              $spinner.find(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
	          } else {
	              alert('Sorry, the minimum value was reached');
	              jQuery(this).val(jQuery(this).data('oldValue') || minValue);
	          }
	          if(valueCurrent <= maxValue) {
	              $spinner.find(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
	          } else {
	              alert('Sorry, the maximum value was reached');
	            jQuery(this).val(jQuery(this).data('oldValue') || maxValue);
	          }
	          
	          spinner.settings.onChange(valueCurrent,spinner);
	    	});
	    }
	    
	    function focusin($spinner,spinner){
	        var input_number = $spinner.find('.input-number');
	      
	    	jQuery(input_number).focusin(function(){
	         	jQuery(this).data('oldValue', jQuery(this).val());
	      	});
	    }
	    
	    function mausePress(){
	    	
	    }
	    
	    function bind_click($spinner,spinner){
	      var btn_number = $spinner.find('.btn-number');
	      
	         jQuery(btn_number).click(function(e){
	          e.preventDefault();
	          
	          fieldName = jQuery(this).attr('data-field');
	          type      = jQuery(this).attr('data-type');
	          var input = $spinner.find("input[name='"+fieldName+"']");
	          var currentVal = parseInt(input.val());
	        
	          if (!isNaN(currentVal)) {
	              if(type == 'minus') {
	                  
	                  if(currentVal > input.attr('min')) {
	                      input.val(currentVal - 1).change();
	                  } 
	                  if(parseInt(input.val()) == input.attr('min')) {
	                      jQuery(this).attr('disabled', true);
	                  }
	      
	              } else if(type == 'plus') {
	      
	                  if(currentVal < input.attr('max')) {
	                      input.val(currentVal + 1).change();
	                  }
	                  if(parseInt(input.val()) == input.attr('max')) {
	                      jQuery(this).attr('disabled', true);
	                  }
	      
	              }
	          } else {
	              input.val(0);
	          }
	      });
	    } 
	    
	    function get_content(spinner){
				var content = "", 
					value = spinner.settings.value, //disabled="disabled";
					minDisabled,
					maxDisabled,
					disabled = 'disabled="disabled"';

				if(spinner.settings.min_value > spinner.settings.value  ){
					value = spinner.settings.min_value;
				}
				else if(spinner.settings.max_value < spinner.settings.value){
					value = spinner.settings.max_value;	
				}

				minDisabled = value <= spinner.settings.min_value  ? disabled  : '';
				maxDisabled = value >= spinner.settings.max_value  ? disabled  : '';  
				
				content += '<div class="input-group">';
				content += '<span class="input-group-btn">';
				content += '<button type="button" class="btn btn-successFRT btn-number" data-type="minus" data-field="'+spinner.settings.name+'['+spinner.settings.id+']" '+minDisabled+'>';
				content += '<span class="'+spinner.settings.minus_icon+'"></span>';
				content += '</button>';
				content += '</span>';
				content += '<input type="text" name="'+spinner.settings.name+'['+spinner.settings.id+']" class="form-control input-number" value="'+value+'" min="'+spinner.settings.min_value+'" max="'+spinner.settings.max_value+'">';
				content += '<span class="input-group-btn">';
				content += '<button type="button" class="btn btn-successFRT btn-number" data-type="plus" data-field="'+spinner.settings.name+'['+spinner.settings.id+']" '+maxDisabled+'>';
				content += '<span class="'+spinner.settings.plus_icon+'"></span>';
				content += '</button>';
				content += '</span>';
				content += '</div>';
	   
		    return 	content;
	    }	
	}
});
