


jQuery( document ).ready(function($) {
    
    $(".check-custom-template").change(function() {
        if(this.checked){
            $(this).closest('.inside').find('.custom-template').addClass('custom-template-active');
            $('#form_settings-form-settings').find('.form-fields').addClass('custom-template-active');
        }
        else{
            $(this).closest('.inside').find('.custom-template').removeClass('custom-template-active');
            $('#form_settings-form-settings').find('.form-fields').removeClass('custom-template-active');
        }
    });
    
    jQuery(".set-default-field").change( function(){
        var value = $(this).val();
        if(this.checked){
            var span = $('#span-default-field').find('span').clone();
            var elem = span.text('%'+ value +'%').attr('id', value);
            $('#email_settings-email-settings').find('.short-tags.default').append(elem);
        }
        else{
            $('#email_settings-email-settings').find('.short-tags.default #'+ value).remove();
        }
    })
    
    var namesFields = $('#form_settings_form_settings_name_attributes').val().split(",");
    $.each(namesFields,function(i, val){
        var span = $('#span-default-field').find('span').clone();
        var elem = span.text('%'+ val.replace(" ", "") +'%').attr('id', val);
        $('#email_settings-email-settings').find('.short-tags.custom').append(elem);
    });
    

    $('#saveNameFields').click( function(event){
        event.preventDefault();
        
        var post_id     = $('#post_id').val();
        var namesFieldsStr  = $('#form_settings_form_settings_name_attributes').val();
        var namesFieldsStr     = namesFieldsStr.replace(" ", "");
        if(namesFieldsStr.slice(-1) == ','){
            namesFieldsStr = namesFieldsStr.substring(0, namesFieldsStr.length - 1);
        };
        namesFields     = namesFieldsStr.split(",");
        
        var result = [];
        var areInArray = '';
        jQuery.each(namesFields, function(i, e) {
            if (jQuery.inArray(e, result) !== -1){
              areInArray += e + ' ';
            }
            result.push(e);
        });

        if(areInArray.length === 0){
            $('#duplicateNameFields').removeClass('errors');
            jQuery.post( ajaxurl, { 'action': 'save_names_fields', 'post_id': post_id, 'form_settings_form_settings_name_attributes' : namesFieldsStr}, function(response){

                $('#email_settings-email-settings').find('.short-tags.custom').html('');
                var namesFields = response.split(",");
                $.each(namesFields,function(i, val){
                    var span = $('#span-default-field').find('span').clone();
                    var elem = span.text('%'+ val.replace(" ", "") +'%').attr('id', val);
                    $('#email_settings-email-settings').find('.short-tags.custom').append(elem);
                });
                
                $('#fieldsSaved').fadeIn('slow').delay(1000).fadeOut();
            });
        }
        else{
            $('#duplicateNameFields').addClass('errors').find('#nameFields').html(areInArray);
       }
        
    });
    
    $(".default-fields-list.custom-template-active").find('input').attr("disabled", true);

});

