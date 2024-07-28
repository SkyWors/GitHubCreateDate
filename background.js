const link = window.location.href;

(async function () {
	if (!link.startsWith("https://github.com/")) {
		return;
	}

	const lastChild = document.querySelector("#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.react-repos-overview-margin.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(1) > div > div > div:last-child");

	if (!lastChild) {
		return;
	}

	const split = link.split("/");

	const user = split[3];
	const repo = split[4];

	const api = await fetch(`https://api.github.com/repos/${user}/${repo}`)
		.then(response => response.json());

	if (api.message) {
		return;
	}

	const date = new Date(api.created_at);

	const icon = '<svg class="octicon octicon-book mr-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>';

	const text = document.createElement("a");
	text.className = "Link Link--muted";
	text.style = "cursor: default;";

	text.innerHTML = `
						${icon}
						<span class="color-fg-muted">${date.toLocaleString()}</span>
					`;

	const createdAtElement = document.createElement("div");
	createdAtElement.className = "mt-2";
	createdAtElement.append(text);

	const parentNode = lastChild.parentNode;

	parentNode.insertBefore(
		createdAtElement,
		lastChild.textContent.trim() === "Report repository"
			? lastChild.previousSibling
			: lastChild.nextSibling
	);
})();
