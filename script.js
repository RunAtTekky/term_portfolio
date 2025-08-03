document.addEventListener("DOMContentLoaded", function() {
	const input = document.getElementById('input')

	input.addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			console.log(input.value);
			input.value = "";
		}
	});

	// Here I have to put auto-complete hint
	input.addEventListener("input", function() {
		console.log(input.value);
	})

});
