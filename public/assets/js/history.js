$(document).ready(function(){
	$.getJSON('https://cors-anywhere.herokuapp.com/https://sela-test.herokuapp.com/assets/hkzxv.json', function(generalData){
		$.getJSON('last_videos.php',function(historyData){
			console.log(historyData);
			console.log(generalData);
			if (historyData.items!=null) {
				$('.items em').hide(800);
				completeLastSeenVideos(generalData,historyData.items.length,historyData.items);	
			}
					
		});
	});

	$('.focused a').focus();

	$('select[name=number]').change(function(event) {
		var formData = {
			'number'              : $('select[name=number]').val(),
		};
		$.ajax({
			type        : 'POST',
			url         : 'last_videos.php',
			data        : formData,
			dataType    : 'json',
			encode          : true
		})
	
			.done(function(data) {
				$.getJSON('https://cors-anywhere.herokuapp.com/https://sela-test.herokuapp.com/assets/hkzxv.json', function(generalData){
						console.log(data);
						console.log(generalData);
						if (data.items!=null) {
							$('#last_videos').html('');
							completeLastSeenVideos(generalData,data.number,data.items);
						}
				});
			});
	
		event.preventDefault();
	});
});
function searchVideo(data, idVideo) {
	var i = 0
	var founded = false;
	while (i < data.totalCount && !founded) {
		var videoId = data.entries[i].id;
		var video = data.entries[i].contents[0].url;
		if (videoId == idVideo) {
			founded = true;
		}
		else{
			i++;
		}
	}
	return i;
}
function completeLastSeenVideos(data, number, content){
	var numVideos = number;
	var start = 0;
	if(number > content.length || number == -1){
		numVideos = content.length;
	}
	else{
		start = content.length-numVideos;
	}
	console.log(number);
	for (var i = start; i < content.length; i++) {
		var index = searchVideo(data, content[i].id);
		var preHtml = $('#last_videos').html();
		var item = data.entries[index];
		var videoLink = '../video/video.php?id='+item.id;
		var imageLink = item.images[0].url;
		var title = item.title;
		title = fetchTitle(title);
		var category = item.categories[0].title;
		var type = item.type;
		type = fetchType(type);
		var languaje = item.metadata[0].value;
		languaje = fetchLanguaje(languaje);

		var image = '<div class="thumbnail"><img onerror=this.src="../../imagen.jpg" src="'+imageLink+'"></div>';
		var text = '<h2>'+title+'</h2><h3>'+category+' | '+type+' | '+languaje+'</h3>';
		var link = '<a href="'+videoLink+'"><div>'+ image + text +'</div></a>';
		var htmlItem = '<li class="item focusable">'+link+'</li>';
		$('#last_videos').hide();
		$('#last_videos').html(htmlItem + preHtml);
		$('#last_videos').fadeIn('fast');
	}
}

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