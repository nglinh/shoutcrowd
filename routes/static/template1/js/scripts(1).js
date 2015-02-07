
// Slide effect on sections
new cbpScroller( document.getElementById( 'cbp-so-scroller' ) );


jQuery(document).ready(function() {


	//Function to prevent Default Events
	function pde(e){
		if(e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
	}


	// Animate the header components
	jQuery(window).load(function () {
		jQuery('#header-photo').delay( 100 ).animate({opacity: '1', 'margin-top' : '0'}, 1000, 'easeInOutCubic', function() {
			jQuery('#header h1').delay( -200 ).animate({opacity: '1'}, 600, 'easeInOutCubic', function() {
				jQuery('#header p').animate({opacity: '1'}, 400, 'easeInOutCubic');
			});
		});
	});


	//Collapse navigation on click (Bootstrap 3 is missing it)
	jQuery('.nav a').on('click', function () {
		jQuery('#my-nav').removeClass('in').addClass('collapse');
	});


	// Minify the Nav Bar
	jQuery(document).scroll(function () {
		var position = jQuery(document).scrollTop();
		var headerHeight = jQuery('#header').outerHeight();

		if (jQuery('#header').length > 0) { 
			var headerTop = jQuery('#header').offset().top;
		}

		if (position >= headerHeight - 100){
				jQuery('.navbar').addClass('minified');
		} else {
				jQuery('.navbar').removeClass('minified');
		}

		if (position > headerTop + 20){
				jQuery('.navbar-transparent').addClass('darken');
		} else {
				jQuery('.navbar-transparent').removeClass('darken');
		}


		// Parallax effect on #Header
		jQuery(".jumbotron .container").css({
			'opacity' : (1 - position/500)
		});


		// Show "Back to Top" button
		if (position >= headerHeight - 100){
			jQuery('.scrolltotop').addClass('show-to-top');
		} else {
			jQuery('.scrolltotop').removeClass('show-to-top');
		}

	});


	// Nice scroll to DIVs
	jQuery('.navbar-nav li a').click(function(evt){
		var place = jQuery(this).attr('href');
		jQuery('html, body').animate({
			scrollTop: jQuery(place).offset().top
			}, 1200, 'easeInOutCubic');
		pde(evt);
	});


	// Scroll down from Header to Contact section
	jQuery('#header p a').click(function(evt) {
		var place = jQuery(this).attr('href');
		jQuery('html, body').animate({scrollTop: jQuery(place).offset().top}, 1200, 'easeInOutCubic');
		pde(evt);
	});


	// Scroll on Top
	jQuery('.scrolltotop, .navbar-brand').click(function(evt) {
		jQuery('html, body').animate({scrollTop: '0'}, 1200, 'easeInOutCubic');
		pde(evt);
	});


	// Close alerts
	setTimeout(function(){ jQuery('.success, .error').fadeOut() }, 6000);

	// Testimonial slider
	jQuery(function() {
		jQuery('#da-slider').cslider({
			bgincrement	: 0
		});
	});


	// Portfolio filterable grid
	jQuery('#portfolio-grid').mixitup({
		targetSelector: '.portfolio-mix',
	});


	// PrettyPhoto
	jQuery('#about .round-outline a').prettyPhoto();
	jQuery('.portfolio-feat-img a').prettyPhoto();

	// bxSlider
	jQuery('.bxslider').bxSlider({
		mode: 'fade',
		controls: false,
		speed: 1000,
		easing: 'ease-in-out',
		auto: true,
		pause: 5000
	});

	// Show Inner Pages Menu on Click
	jQuery('.reveal-single-menu').click(function(){
		if(!jQuery('.primary-menu-container').hasClass('menu-visible')) {
    		jQuery('.primary-menu-container').addClass('menu-visible').animate({opacity: 1});
    		jQuery('.reveal-single-menu').addClass('reveal-active');
    	} else {
    		jQuery('.primary-menu-container').animate({opacity: 0}, function(){
    			jQuery('.primary-menu-container').removeClass('menu-visible');
    			jQuery('.reveal-single-menu').removeClass('reveal-active');
    		});
    	}
	});

	// Dropdown menus on home page
	jQuery(".navbar .navbar-nav li").each( function() {
		if( jQuery(this).find("ul").length > 0 ) {
			var parent_width = jQuery(this).outerWidth();
			var child_width = jQuery(this).find("ul").outerWidth();
			var new_width = parseInt((child_width - parent_width)/2);
			jQuery(this).find("ul").css('left', -new_width+"px");
		}

		if( jQuery(this).find("ul").length > 0 ) {
			jQuery(this).hover(
				function() {
					clearTimeout(jQuery.data(this,'timer'));
					jQuery('ul',this).stop(true,true).fadeIn(200);
				},
				function() {jQuery.data(this,'timer', setTimeout(jQuery.proxy(function() {
					jQuery('ul',this).stop(true,true).fadeOut(200);
				}, this), 100)); }
			);
		}
	});

});