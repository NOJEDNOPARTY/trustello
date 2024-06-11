const common = {
	init: () => {
		common.preloader();
		common.main();
		common.splide();
		common.socialSelect();
		common.select();
	},
	preloader: () => window.addEventListener('DOMContentLoaded', () => setTimeout(() => {
		document.querySelector('body').classList.add('preloaded');

		new WOW().init();
	}, 400)),
	main: () => {
		const menuTrigger = document.querySelectorAll('.menu-trigger');
		const openPopupTrigger = document.querySelectorAll('.open-popup');
		const closePopupTrigger = document.querySelectorAll('.close-popup, .popup-layout');
		const formField = document.querySelectorAll('.form-field input, .form-field textarea');
		const socialSelect = document.querySelectorAll('.social-select-wrapper');

		menuTrigger.forEach(trigger => trigger.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector('.header').classList.toggle('open');
			document.querySelector('body').classList.toggle('menu-open');
		}));

		openPopupTrigger.forEach(trigger => trigger.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector('body').classList.add('popup-opened');
		}));

		closePopupTrigger.forEach(trigger => trigger.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector('body').classList.remove('popup-opened');
		}));

		formField.forEach(field => {
			field.addEventListener('focusin', e => {
				e.preventDefault();
				field.classList.add('hide-placeholder');
			});

			field.addEventListener('focusout', e => {
				e.preventDefault();
				if (!field.value)
					field.classList.remove('hide-placeholder');
			});
		});

		socialSelect.forEach(field => {
			const input = field.querySelector('input');
			input.addEventListener('focusin', e => {
				e.preventDefault();
				field.classList.add('focused');
				field.classList.add('hide-placeholder');
			});

			input.addEventListener('focusout', e => {
				e.preventDefault();
				if (!input.value) {
					field.classList.remove('empty');
					field.classList.remove('hide-placeholder');
				}
				else
					field.classList.add('empty');

				field.classList.remove('focused');
			});
		});

		const anchors = document.querySelectorAll('.anchor-trigger');
		let isScrollingByClick = false;
		let scrollTimeout;

		anchors.forEach(anchor => anchor.addEventListener('click', e => {
			e.preventDefault();
			const target = document.querySelector(anchor.hash);

			if (target) {
				const targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;

				document.querySelector('.header').classList.toggle('open');
				anchors.forEach(anchor => anchor.classList.remove('active'));
				anchor.classList.add('active');
				window.scrollTo({ top: targetPosition, behavior: 'smooth' });
				history.pushState(null, null, anchor.hash);

				isScrollingByClick = true;
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => isScrollingByClick = false, 1000);  // adjust timeout as needed
			}
		}));

		document.addEventListener('scroll', () => {
			if (isScrollingByClick) return;

			const sections = document.querySelectorAll('.anchor-section');
			let maxVisibleArea = 0;
			let mostVisibleSection = null;

			const calculateVisibleArea = (rect) => {
				const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
				const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

				if (visibleWidth > 0 && visibleHeight > 0)
					return visibleWidth * visibleHeight;

				return 0;
			};

			sections.forEach(section => {
				const rect = section.getBoundingClientRect();
				const visibleArea = calculateVisibleArea(rect);

				if (visibleArea > maxVisibleArea) {
					maxVisibleArea = visibleArea;
					mostVisibleSection = section;
				}
			});

			if (mostVisibleSection) {
				document.querySelectorAll('.anchor-trigger').forEach(anchor => anchor.classList.remove('active'));

				const activeLink = document.querySelector(`a[href="#${mostVisibleSection.id}"]`);

				if (activeLink) {
					history.pushState(null, null, activeLink.hash);
					activeLink.classList.add('active');
				}
			}
		});
	},
	splide: () => {
		const reviewsItemCount = document.querySelectorAll('.reviews-slider .reviews-item').length;
		const articlesItemCount = document.querySelectorAll('.articles-slider .articles-item').length;
		const articlesSliderPerPageCount = 3;
		const showArticlesSliderNavigation = articlesItemCount > articlesSliderPerPageCount ? true : false;

		articlesItemCount > 1 && new Splide( '.articles-slider', {
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

		reviewsItemCount > 1 && new Splide( '.reviews-slider', {
			arrows: true,
			pagination: true,
			type  : 'fade',
			autoHeight: true,
		}).mount();
	},
	socialSelect: () => {
		const socialSelectInput = document.querySelector('.social-select-wrapper input');
		const socialSelect = document.querySelector('.social-select');
		const selectedOption = socialSelect.querySelector('.social-select-selected');
		const optionsList = socialSelect.querySelector('.social-select-items');

		const hideOptions = () => {
			optionsList.classList.add('social-select-hide');
			selectedOption.classList.remove('social-select-arrow-active');
		};

		selectedOption.addEventListener('click', e => {
			optionsList.classList.toggle('social-select-hide');
			selectedOption.classList.toggle('social-select-arrow-active');
		});

		const options = optionsList.querySelectorAll('div');

		options.forEach(option => option.addEventListener('click', () => {
			options.forEach(option => option.classList.remove('selected-option'));
			option.classList.add('selected-option');
			selectedOption.innerHTML = '';
			const clone = option.cloneNode(true);
			selectedOption.dataset.name = option.dataset.name;
			socialSelectInput.name = option.dataset.name;
			selectedOption.appendChild(clone);
			hideOptions();
		}));

		window.addEventListener('click', e =>
			socialSelect != e.target && !socialSelect.contains(e.target) && hideOptions());
	},
	select: () => {
		var x, i, j, l, ll, selElmnt, a, b, c;
		x = document.getElementsByClassName('selectable-element');
		l = x.length;
		for (i = 0; i < l; i++) {
		  selElmnt = x[i].getElementsByTagName('select')[0];
		  ll = selElmnt.length;
		  a = document.createElement('DIV');
		  a.setAttribute('class', 'select-selected');
		  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		  x[i].appendChild(a);
		  b = document.createElement('DIV');
		  b.setAttribute('class', 'select-items select-hide');
		  for (j = 1; j < ll; j++) {
			c = document.createElement('DIV');
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener('click', function(e) {
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName('select')[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
				  if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName('same-as-selected');
					yl = y.length;
					for (k = 0; k < yl; k++) {
					  y[k].removeAttribute('class');
					}
					this.setAttribute('class', 'same-as-selected');
					break;
				  }
				}
				h.click();
			});
			b.appendChild(c);
		  }
		  x[i].appendChild(b);
		  a.addEventListener('click', function(e) {
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle('select-hide');
			this.classList.toggle('select-arrow-active');
		  });
		}

		function closeAllSelect(elmnt) {
		  var x, y, i, xl, yl, arrNo = [];
		  x = document.getElementsByClassName('select-items');
		  y = document.getElementsByClassName('select-selected');
		  xl = x.length;
		  yl = y.length;
		  for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
			  arrNo.push(i)
			} else {
			  y[i].classList.remove('select-arrow-active');
			}
		  }
		  for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
			  x[i].classList.add('select-hide');
			}
		  }
		}
		document.addEventListener('click', closeAllSelect);
	},
};

(() => common.init())();
