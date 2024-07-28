const link = window.location.href;

const iconCreate = '<svg class="octicon octicon-book mr-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>';

const iconUpdate = '<svg class="octicon octicon-book mr-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z"></path></svg>'

function createElement(date, icon, title) {
	const text = document.createElement("a");
	text.className = "Link Link--muted";
	text.style = "cursor: default;";
	text.title = title;

	text.innerHTML = `
						${icon}
						<span class="color-fg-muted">${new Date(date).toLocaleString()}</span>
					`;

	const element = document.createElement("div");
	element.className = "mt-2";
	element.append(text);

	return element;
}

(async function () {
	if (!link.startsWith("https://github.com/")) {
		return;
	}

	let lastChild = document.querySelector("#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.react-repos-overview-margin.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(1) > div > div > div:last-child");

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

	const parentNode = lastChild.parentNode;

	parentNode.insertBefore(createElement(api.created_at, iconCreate, "Creation date"), lastChild.textContent.trim() === "Report repository" ? lastChild.previousSibling : lastChild.nextSibling);
	lastChild = document.querySelector("#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.react-repos-overview-margin.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(1) > div > div > div:last-child");
	parentNode.insertBefore(createElement(api.updated_at, iconUpdate, "Update date"), lastChild.textContent.trim() === "Report repository" ? lastChild.previousSibling : lastChild.nextSibling);
})();
