(async () => {
	window.onload = () => {
		// create dom mutation observer
		const config = { attributes: false, childList: true, subtree: false };
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
							if(r.imdbRating) {
								const content = document.createElement('div');
								content.innerHTML = `Rating: <span style="color:#ffffff;text-shadow: 1px 1px 5px #E50914;">`
													+`${r.imdbRating}</span> / 10</div>`;
;
								// miniModalList[0].getElementsByClassName('previewModal--boxart')[0].innerHTML 
								// += `<div style="display:block;font-weight:900">Rating: <span style="color:#ffffff;text-shadow: 1px 1px 5px #E50914;">`
								// +`${r.imdbRating}</span> / 10</div>`;
								const container =  miniModalList[0].getElementsByClassName('previewModal--metadatAndControls-container')[0];
								if(container.nextSibling) {
									container.parentNode.insertBefore(content, container.nextSibling);
								} else {
									container.parentNode.appendChild(content);
								}
							}
						});
					}
				}
			});
		});
		observer.observe(targetElement, config);
	};
})();