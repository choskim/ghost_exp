$(function(){
	$('.expander').click(function() {
		$(this).toggleClass('expanded');
		$('.main-menu').toggleClass('expanded');
	});

	$('.site').fitVids();
});