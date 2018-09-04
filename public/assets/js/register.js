$(document).ready(function(){
	/*$('#registerForm').submit(function(event) {
		var formData = {
			'user'              : $('input[name=user]').val(),
            'pass1'              : $('input[name=pass1]').val(),
            'pass2'              : $('input[name=pass2]').val()
		};
		$.ajax({
			type        : 'POST',
			url         : '/register',
			data        : formData,
			encode          : true,
			success: function(data) {
				window.location.replace('/login');
            },
            error: function(xhr, status, text) {
                var response = $.parseJSON(xhr.responseText);
        
                if (xhr.status == 401) {
                    $('#error').html('Las contraseñas no coinciden')
                }
                else if((xhr.status == 400)){
                    $('#error').html('Ya existe el nombre de usuario') 
                }
            }
		})
	
		event.preventDefault();
	});*/

	$('.focused a').focus();
});
$(document).keydown(function(e){
    var pathname = window.location.pathname;
	if (pathname === '/register') {
        switch (e.which) {
        case 39:/*Right*/
            if ($('#home').is('span.focused.focusable')) {
                $('.focused').removeClass('focused');
                $('#history').addClass('focused');
            }
            else if ($('#history').is('span.focused.focusable')) {
                $('.focused').removeClass('focused');
                $('#log').addClass('focused');
            }
            $('.focused a').focus();
            break;
        case 37:/**Left */
            if ($('#history').is('span.focused.focusable')) {
                $('.focused').removeClass('focused');
                $('#home').addClass('focused');
            }
            else if ($('#log').is('span.focused.focusable')) {
                $('.focused').removeClass('focused');
                $('#history').addClass('focused');
                $('.focused a').focus();
            }
            $('.focused a').focus();
            break;
        case 40:/**Down */
            if ($('.menu span').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#user').addClass('focused');
            }
            else if ($('#user').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#pass1').addClass('focused');
            }
            else if ($('#pass1').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#pass2').addClass('focused');
            }
            else if ($('#pass2').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('.formButton').addClass('focused');
            }
            else if ($('.formButton').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#login').addClass('focused');
            }
            $('.focused').focus();
            break;
        case 38:/**Up */
            if ($('#login').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('.formButton').addClass('focused');
                $('.focused').focus();
            }
            else if ($('.formButton').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#pass2').addClass('focused');
                $('.focused').focus();
            }
            else if ($('#pass2').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#pass1').addClass('focused');
                $('.focused').focus();
            }
            else if ($('#pass1').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#user').addClass('focused');
                $('.focused').focus();
            }
            else if ($('#user').hasClass('focused')) {
                $('.focused').removeClass('focused');
                $('#home').addClass('focused');
                $('.focused a').focus();
            }
            
            break;
        case 27:/**Esc */
                window.location.replace("/VODAccedo");
            break;
        }
    }
});