jQuery( document ).ready(function($) {
    
    jQuery( "form[id^='mag-mailer-']" ).each( function(){
        
        var myForm = $(this);
        var formId = $(myForm).attr('id').split('-')[2];
        jQuery(myForm).after('<style>#' + $(myForm).attr('id') + ' .not-valid { border: 1px solid #d54e21;}' + '</style>');
        
        jQuery(myForm).on( "submit", function( event ) {
            event.preventDefault();
            var params = $(myForm).serialize();
            jQuery.ajax({
                type: 'POST',
                url: mag_mailerajax.ajaxurl,
                data: 'action=mag_mailer_send_mail&mmf-id=' + formId + '&' + params,
                dataType: 'json',
                success: function(data) {
                    var list = '';
                    $.each(data.messages, function(i, val) {
                            list += '<li>' + val + '</li>';
                    });
                    var messages = '<ul>' + list + '</ul>';
                    jQuery(myForm).find('#response').remove();
                    jQuery(myForm).append('<div id="response">' + messages + '</div>');

                    if(data.errors !== ''){ 
                        $.each(data.errors, function(i, val) {
                            jQuery(myForm).find("[name='"+val+"']").addClass('not-valid');
                        });
                        validate();
                    }
                    if(data.state === 0){
                        jQuery(myForm)[0].reset();
                        jQuery(myForm).find('.not-valid').removeClass('.not-valid');
                    }
                }
            });

        });
        
    });

    
});

function validate(){
    jQuery( ".not-valid" ).click( function( event ) {
        jQuery(this).removeClass('not-valid');
    });
}