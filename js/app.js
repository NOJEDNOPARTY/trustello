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

		menuTrigger.forEach(trigger => trigger.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector('.header').classList.toggle('open');
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
				field.classList.add('focused');
			});

			field.addEventListener('focusout', e => {
				e.preventDefault();
				if (!field.value)
					field.classList.remove('focused');
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
	socialSelect: () => {
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
			selectedOption.innerHTML = '';
			const clone = option.cloneNode(true);
			selectedOption.appendChild(clone);
			hideOptions();
		}));

		window.addEventListener('click', e =>
			socialSelect != e.target && !socialSelect.contains(e.target) && hideOptions());
	},
	select: () => {
		var x, i, j, l, ll, selElmnt, a, b, c;
		/* Look for any elements with the class 'custom-select': */
		x = document.getElementsByClassName('selectable-element');
		l = x.length;
		for (i = 0; i < l; i++) {
		  selElmnt = x[i].getElementsByTagName('select')[0];
		  ll = selElmnt.length;
		  /* For each element, create a new DIV that will act as the selected item: */
		  a = document.createElement('DIV');
		  a.setAttribute('class', 'select-selected');
		  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		  x[i].appendChild(a);
		  /* For each element, create a new DIV that will contain the option list: */
		  b = document.createElement('DIV');
		  b.setAttribute('class', 'select-items select-hide');
		  for (j = 1; j < ll; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			c = document.createElement('DIV');
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener('click', function(e) {
				/* When an item is clicked, update the original select box,
				and the selected item: */
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

		/* If the user clicks anywhere outside the select box,
		then close all select boxes: */
		document.addEventListener('click', closeAllSelect);
	},
};

(() => common.init())();
