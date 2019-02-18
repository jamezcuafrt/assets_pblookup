
/*
	@author: Front Runner Technologies - Javier Amezcua
	@date:   Feb 8th, 2019
	This JS contains functions related with Modal Windows, Change divs animations and stuffs like that
*/
var goSendRFQ = function(){
		jQuery('#pb_lookup_result').hide();
		jQuery('#clientInfoContainer').show();
		jQuery('#searchformFRT').hide();
		
}
var goBackTable = function(){
	jQuery('#pb_lookup_result').show();
	jQuery('#searchformFRT').show();
	jQuery('#clientInfoContainer').hide();
	
}	

jQuery(document).ready(function() {
	// opens the modal window
	jQuery(".floatElemFrt").click(function() {
		jQuery('.modalFRT').show();
	});
	jQuery("#openModalFRT").click(function(event) {
		event.preventDefault();
		jQuery('.modalFRT').show();
	});

	// When the user clicks on <span> (x), close the modal
	jQuery(".closeFRT").click(function() {
		jQuery('.modalFRT').hide();
		jQuery("#pb_lookup_result").empty();
		jQuery('#clientInfoContainer').hide();
		jQuery('#searchformFRT').show();
		jQuery('#tableContainer').css('margin-top', '0px');
		// modal.style.display = "none";
	});

});