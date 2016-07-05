function getFormValues() {
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;
	console.log(first + " " + last);
}

function changeColor() {
	document.getElementById("color-div").classList.add("newColor");
}

function toggleImage() {
	document.getElementById("lightbox").classList.add("isVisible");
}

document.getElementById("lightbox").onclick = function() {
	document.getElementById("lightbox").classList.remove("isVisible");
}

document.getElementById("name-btn").onclick = function() {
	getFormValues();
};

document.getElementById("color-btn").onclick = function() {
	changeColor();
};

document.getElementById("image-btn").onclick = function() {
	toggleImage();
};