var link = window.location.href;
if (link.includes("https://github.com/")) {
	let search = link.replace("https://github.com/", "");

	if (search.split("/").length == 2) {
		var api;

		const xpath = "//div[@class='mt-2']//a[contains(@class, 'Link--muted') and contains(text(), 'Report repository')]";
		const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		if(result.singleNodeValue) {
			fetch('https://api.github.com/repos/' + search)
				.then(response => response.json())
				.then(data => {
					api = data;

					var date = new Date(api.created_at);

					var icon = '<svg class="octicon octicon-book mr-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>';

					var text = document.createElement("a");
					text.className = "Link Link--muted";

					text.innerHTML = `
						${icon}
						<span class="color-fg-muted">${date.toLocaleString()}</span>
					`

					var element = document.createElement("div");
					element.className = "mt-2";
					element.append(text);

					const reportButton = result.singleNodeValue.parentNode;
					reportButton.parentNode.insertBefore(element, reportButton.previousSibling);
				});
		}
	}
}
