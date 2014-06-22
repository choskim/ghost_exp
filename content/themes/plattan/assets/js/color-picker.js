var colorPicker = (function ($) {

	var colorPicker = {};

	function toggleCSS(colorScheme) {
		var schemeLink = $('link[data-color-scheme]');
		if ( schemeLink.length > 0 ) {
			schemeLink = $(schemeLink[0]);
		} else {
			var link = $('link[rel=stylesheet]');
			schemeLink = $(link[0]).clone().insertAfter( link[0] );
		}
		var styleFile = '/style-'+colorScheme+'.css';
		var styleHref = schemeLink.attr('href').replace(/\/style.*\.css$/g, styleFile);
		schemeLink.attr('href', styleHref).attr('data-color-scheme', colorScheme);
	}

	colorPicker.init = function() {

		$(document).ready( colorPicker.injectHTML );
		$(document).on( 'click', '.colorpicker-toggle', colorPicker.toggleColorPicker );

		var colorScheme = $.cookie('plattan-color-picker');
		if ( colorScheme !== undefined ) {
			$(document).ready( function() {
				toggleCSS(colorScheme);
				$('.cp-color[data-scheme='+colorScheme+']').addClass('active');
			} );
		} else {
			$('.cp-color:first-child').addClass('active');
		}
	};

	colorPicker.injectHTML = function() {
		$('.sidebar-header').prepend('<div class="colorpicker">'+
			'<a class="colorpicker-toggle" href="#"><span>x</span></a>'+
			'<div class="colorpicker-colors">'+
				'<a class="cp-color cp-1" data-scheme="0" href="#"><span>Original</span></a>'+
				'<a class="cp-color cp-2" data-scheme="1" href="#"><span>Nypon</span></a>'+
				'<a class="cp-color cp-3" data-scheme="2" href="#"><span>Vind</span></a>'+
				'<a class="cp-color cp-4" data-scheme="3" href="#"><span>Godis</span></a>'+
				'<a class="cp-color cp-5" data-scheme="4" href="#"><span>Afton</span></a>'+
				'<a class="cp-color cp-6" data-scheme="5" href="#"><span>Druva</span></a>'+
			'</div>'+
		'</div>');
	};

	colorPicker.toggleColorPicker = function(event) {
		event.preventDefault();
		var currentCP = $('.cp-color.active').removeClass('active');
		var nextCP = currentCP.next();
		if ( nextCP.length > 0 ) {
			nextCP.addClass('active');
		} else {
			$('.cp-color:first-child').addClass('active');
		}
		toggleCSS($('.cp-color.active').data('scheme'));
		$.cookie('plattan-color-picker', $('.cp-color.active').data('scheme'), { expires: 7, path: '/' });
	};

	colorPicker.init();
	return colorPicker;
}(jQuery));