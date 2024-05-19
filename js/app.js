const common = {
	init: () => {
		common.preloader();
		common.main();
		common.splide();
	},
	preloader: () => window.addEventListener("DOMContentLoaded", () => setTimeout(() => {
		document.querySelector('body').classList.add('preloaded');

		new WOW().init();
	}, 400)),
	main: () => {
		const menuTrigger = document.querySelectorAll('.menu-trigger');
		menuTrigger.forEach(trigger => {
			trigger.addEventListener('click', (event) => {
				event.preventDefault();
				document.querySelector('.header').classList.toggle('open');
			});
		});

		const formField = document.querySelectorAll('.form-field input');
		formField.forEach(input => {
			input.addEventListener('focusin', (event) => {
				event.preventDefault();
				this.classList.add('focused');
			});

			input.addEventListener('focusout', (event) => {
				event.preventDefault();
				if (!this.value) {
					this.classList.remove('focused');
				}
			});
		});
	},
	splide: () => {
		const articlesItemCount = document.querySelectorAll('.articles-slider .articles-item').length;
		const articlesSliderPerPageCount = 3;
		const showArticlesSliderNavigation = articlesItemCount > articlesSliderPerPageCount ? true : false;
		new Splide( '.articles-slider', {
			perPage : articlesSliderPerPageCount,
			focus  : 'center',
			arrows: showArticlesSliderNavigation,
			breakpoints: {
				1200: {
					perPage: 3,
					pagination: articlesItemCount > 2 ? true : false,
					arrows: articlesItemCount > 2 ? true : false,
					type   : 'loop',
					perMove: 1,
				},
		  	},
		}).mount();
	},
};

(() => common.init())();
