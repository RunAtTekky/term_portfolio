document.addEventListener("DOMContentLoaded", function() {
	const input = document.getElementById('input')
	const output = document.getElementById('output')

	function append_command(cmd, response) {
		console.log("I'm appending")
		let cmd_line = document.createElement("div");
		cmd_line.classList.add("cmd-line")
		cmd_line.innerHTML = `\$ ${cmd}`;
		output.appendChild(cmd_line);

		let result_line = document.createElement("div");
		result_line.innerHTML = response;
		result_line.classList.add("cmd-result");
		output.appendChild(result_line);
		input.scrollIntoView({ behavior: "smooth" });
	}

	function reset_terminal() {
		input.value = "";
		output.innerHTML = `<div class="help-message">Type 'help' to see available commands.</div>`;
	}

	function process_command(cmd) {
		cmd = cmd.toLowerCase();
		let response;
		if (cmd === "help") {
			response = 'Type help to get available commands';
		}

		if (cmd === "clear") {
			reset_terminal();
			return;
		}

		append_command(cmd, response);

		console.log(cmd);
	}

	input.addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			process_command(input.value.trim());
			input.value = "";
		}
	});

	// Here I have to put auto-complete hint
	// input.addEventListener("input", function() {
	// 	console.log(input.value);
	// })

	reset_terminal();

});
