$(document).ready(function(){
	$('#deleteHistory').on('click', function(){
        $.ajax({
            type: 'DELETE',
            url: '/history',
            success: function(data){
            	window.location.replace('/history');	
            }
        });
    });
	$('select[name=number]').change(function(event) {
		var formData = {
			'number'              : $('select[name=number]').val(),
		};
		$.ajax({
			type        : 'POST',
			url         : '/history',
			data        : formData,
			encode          : true,
			success: function(data) {
				$('.items').html(data);
			}
		});
	});
	$('.deleteVideo').click(function(event) {
		var formData = {
			'id'              : $(this).find('input[name=videoId]').val(),
		};
		$.ajax({
			type        : 'DELETE',
			url         : '/history/'+formData.id,
			success: function(data) {
				console.log(formData);
				/*location.reload();*/
			}
		});
	});

	$('.focused a').focus();
});

$(document).keydown(function(e){
	$('#numberSelect').hide();
	switch (e.which) {
      case 39:
        console.log('right');
        console.log($('#home').is('span.focused.focusable'));
        if ($('#home').is('span.focused.focusable')) {
        	$('.focused').removeClass('focused');
        	$('#history').addClass('focused');
		}
		else if ($('#history').is('span.focused.focusable')) {
        	$('.focused').removeClass('focused');
        	$('#log').addClass('focused');
        }
        if ($('.item').hasClass('focused')) {

        	if ($('li.item.focused').next().is('li.item.focusable')) {
        		$('.focused').next().addClass('focused');
        		$('.focused').prev().removeClass('focused');
        	}
        	else{
        		$('.focused').removeClass('focused');
        		$('.item').first().addClass('focused');
        	}
		}
		/*if($('#numberSelect').hasClass('focused')){
			$('.focused').removeClass('focused');
        	$('#deleteHistory').addClass('focused');
		}*/
		$('.focused a').focus();
        break;
      case 37:
        console.log('left');
        if ($('#history').is('span.focused.focusable')) {
        	$('.focused').removeClass('focused');
			$('#home').addClass('focused');
			$('.focused a').focus();
		}
		else if ($('#log').is('span.focused.focusable')) {
        	$('.focused').removeClass('focused');
			$('#history').addClass('focused');
			$('.focused a').focus();
        }
        console.log($('.focused').prev().is('li.item.focusable'));
        if ($('.item').hasClass('focused')) {
        	if ($('li.item.focused').prev().is('li.item.focusable')) {
        		$('.focused').prev().addClass('focused');
        		$('.focused').next().removeClass('focused');
        	}
        	else{
        		$('.focused').removeClass('focused');
        		$('.item').last().addClass('focused');
			}
		}
		/*if ($('#deleteHistory').is('span.focused.focusable')) {
        	$('.focused').removeClass('focused');
			$('#numberSelect').addClass('focused');
			$('.focused').focus();
        }*/
        break;
      case 40:
		console.log('down');
        if ($('.menu span').hasClass('focused')) {
			$('.focused').removeClass('focused');
        	$('#deleteHistory').addClass('focused');
		}
		else if ($('.historyHeader span').hasClass('focused') && $('.item').first().is('li.item.focusable')) {
			$('.focused').removeClass('focused');
			$('.item').first().addClass('focused');
		}
		else if ($('.historyHeader span').hasClass('focused') && $('#doLogin').length == 1) {
			$('.focused').removeClass('focused');
			$('#doLogin').addClass('focused');
			$('.focused').focus();
		}
        break;
      case 38:
        console.log('up');
        if ($('.item').hasClass('focused')) {
    		$('.focused').removeClass('focused');
			$('#deleteHistory').addClass('focused');
		}
		else if ($('.historyHeader span').hasClass('focused')) {
    		$('.focused').removeClass('focused');
			$('#home').addClass('focused');
		}
		else if ($('#doLogin').hasClass('focused')) {
    		$('.focused').removeClass('focused');
			$('#deleteHistory').addClass('focused');
        }
		break;
		case 27:
			console.log('esc');
			window.location.replace("/VODAccedo");
        break;
	}
	$('.focused a').focus();
});