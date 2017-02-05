jQuery(document).ready(function ($) {
	
	$('#content .devType, #menu .room a').each(function() {
    	$(this).html($(this).html().replace(/&nbsp;/g, ''));
    });
    
    $('#content > br').remove();
	
});