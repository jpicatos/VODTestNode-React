$(document).ready(function(){
	$('.focused a').focus();

	$("#video").bind("ended", function() {
		window.history.back();
	 });
});
function fullscreen() {
	var element = document.getElementById('video');
    if(element.requestFullscreen){
        element.requestFullscreen();
    } 
    else if (element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    }
    else if (element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    }
    else if (element.msRequestFullscreen){
        element.msRequestFullscreen();
    }   
}
$(document).keydown(function(e){
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
		$('.focused a').focus();
        break;
      case 37:
        console.log('left');
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
      case 40:
        console.log('down');
        if ($('.menu span').hasClass('focused')) {
			$('.focused').removeClass('focused');
        	$('#video').addClass('focused');
		}
        $('.focused').focus();
        break;
      case 38:
        console.log('up');
        if ($('#video').hasClass('focused')) {
    		$('.focused').removeClass('focused');
    		$('#home').addClass('focused');
		}
		$('.focused a').focus();
		break;
	  case 27:
			console.log('esc');
			window.location.replace("/VODAccedo");
		break;
    }
    
});
