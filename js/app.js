const common = {
	init: function() {
		common.preloader();
		common.main();
		common.owl();
	},
	preloader: () => {
        window.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                document.querySelector('body').classList.add('preloaded');
				new WOW().init();
            }, 350);
        });
	},
	main: () => {

		$('.menu-trigger').click((event) => {
			event.preventDefault();
			$('.header').toggleClass('open');
		});

		$('.form-field input').focusin((event) => {
			event.preventDefault();
			$(this).addClass('focused');
		});

		$('.form-field input').focusout((event) => {
			event.preventDefault();
			if(!$(this).val()) {
				$(this).removeClass('focused');
		  	}
		});





		$('.close-nav').click(function(event){
			event.preventDefault();
			$('header').removeClass('open');
		});

		$('.discuss').click(function(event){
			event.preventDefault();
			$('header').removeClass('open');
			$('#discussPopup').addClass('active');
		});

		$('.question-list li').click(function(){
			$(this).toggleClass('active');
		});

		$('.popup-close').click(function(){
			$('.popup-wrapper').removeClass('active');
		});

		$('.anchor').click(function(event){
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1000);
			$('header').removeClass('open');
		});

	},
	owl: () => {
		var bannerSlider = $('.banner-slider').owlCarousel({
			nav:true,
			dots: true,
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeInRight',
			smartSpeed: 1000,
			margin: 30,
			items: 1
		});

		bannerSlider.trigger("to.owl.carousel", [1, 2])

		var reviewsSlider = $('.reviews-slider').owlCarousel({
			nav:true,
			dots: true,
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeInRight',
			smartSpeed: 1000,
			margin: 30,
			items: 1
		});

	}

};

(function() { common.init(); }());
