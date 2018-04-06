// global variable for tracking active item
let activeItem = null;

// vanilla JS equivalent to document.ready
function ready(fn) {
	if (
		document.attachEvent
			? document.readyState === "complete"
			: document.readyState !== "loading"
	) {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function scrollToTopOfElem(el) {
	const rect = el.getBoundingClientRect();
	const y = rect.top + window.scrollY;
	window.scrollTo(0, y);
}

function toggleActiveItem(clickedItem) {
	const prevActiveItem = activeItem;
	activeItem = null;

	// make previously active item inactive
	if (prevActiveItem) {
		prevActiveItem.classList.remove("is-active");
	}

	// if previously active item was clicked
	// then all panels are closed now and we're done
	if (prevActiveItem === clickedItem) return;

	// set new active project
	activeItem = clickedItem;
	activeItem.classList.add("is-active");
}

ready(() => {
	const items = document.querySelectorAll(".accordion li");

	items.forEach(item => {
		item.addEventListener("click", () => toggleActiveItem(item));
		item.addEventListener("transitionend", () => {
			if (!activeItem) return;
			scrollToTopOfElem(activeItem);
		});
	});
});
