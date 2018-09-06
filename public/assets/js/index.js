
/*$(document).ready(function(){
	$('.focused a').focus();
});*/

function slide(left) {
	var sizeCarousel = parseFloat($('.carrousel').css('width'));
	var sizeItem = parseFloat($('.item').css('width')) + (parseFloat($('.item').css('margin-left'))*2);
	var move = Math.floor(sizeCarousel/sizeItem)* sizeItem;
	var preMargin = parseFloat($('.carrousel .items').css('margin-left'));

	$('.carrousel .items').finish();
	if (left) {
		slideLeft(move, sizeItem, preMargin);
	}
	else{
		slideRight(move);
	}
}
function slideLeft(size, itemSize, preMargin) {
	
	var margin = preMargin - size + "px";
	var itemsSize = itemSize * $('.item').length;

	/*Se pierden decimales por el camino, redondeo hacia abajo*/
	if (Math.floor(Math.abs(preMargin-size)) < Math.floor(itemsSize)) {
		$('.carrousel .items').animate({marginLeft:margin},600);
		$('.total-carrousel #right').show();
	}
	else{
		$('.carrousel .items').animate({marginLeft:'0px'},600);
		$('.total-carrousel #right').hide();
	}
}
function slideRight(size) {
	var preMargin = parseFloat($('.carrousel .items').css('margin-left'));
	var margin = preMargin + size + "px";

	if (preMargin < 0 && preMargin+size<0) {
		$('.carrousel .items').animate({marginLeft:margin},600);
	}
	else{
		$('.carrousel .items').animate({marginLeft:'0px'},600);
	}

	if (Math.abs(preMargin) - size <= 0) {
		$('.total-carrousel #right').hide();
	}
	else{
		$('.total-carrousel #right').show();
	}
}
/*$(document).keydown(function(e){
	var pathname = window.location.pathname;
	console.log("path: " + pathname);

	if (pathname === '/') {
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
			break;
		case 40:
			console.log('down');
			if ($('.menu span').hasClass('focused')) {
				$('.focused').removeClass('focused');
				$('.item').first().addClass('focused');
			}
			
			break;
		case 38:
			console.log('up');
			if ($('.item').hasClass('focused')) {
				$('.focused').removeClass('focused');
				$('#home').addClass('focused');
			}
			break;
		case 27:
				console.log('esc');
				window.location.replace("/");
			break;
		}
		$('.focused a').focus();
	}
});*/