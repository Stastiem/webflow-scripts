// init Weglot
Weglot.initialize({
	api_key: 'wg_a24e3bfe3d34e7a4c7820d9f9274d1cd1'
});

// on Weglot init
Weglot.on('initialized', ()=>{
	// get the current active language
  const currentLang = Weglot.getCurrentLang();
  // if the current active language link exists
  if(document.querySelector('.wg-element-wrapper.sw3 [lang='+currentLang+']')){
  	// click the link
  	document.querySelector('.wg-element-wrapper.sw3 [lang='+currentLang+']').click();
  }
});

// for each of the .wg-element-wrapper language links
document.querySelectorAll('.wg-element-wrapper.sw3 [lang]').forEach((link)=>{
	// add a click event listener
	link.addEventListener('click', function(e){
  	// prevent default
		e.preventDefault();
    // switch current active language after a setTimeout
    setTimeout(()=>Weglot.switchTo(this.getAttribute('lang')),700);
	});
});
