(async () => {
	window.onload = () => {
		// create dom mutation observer
		const config = { attributes: false, childList: true, subtree: true };
		const targetElement = document.getElementsByClassName('netflix-sans-font-loaded')[0].firstElementChild.firstElementChild;
		var observer = new MutationObserver((mutationList) => {
			mutationList.forEach(mutation => {
				if(mutation.type === 'childList' && mutation.addedNodes.length > 0) {
					const miniModalList = [...mutation.addedNodes].filter(f => f.className.indexOf('previewModal--wrapper') > -1);
					if(miniModalList && miniModalList.length > 0) {
						const title = miniModalList[0].innerHTML.match(/alt="([^=]+)" /)[1];
						fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}&r=json`)
						.then(response => response.json())
						.then(r => {
							console.log(`${title} rated ${r.imdbRating}`);
						});
					}
				}
			});
		});
		observer.observe(targetElement, config);
	};
})();