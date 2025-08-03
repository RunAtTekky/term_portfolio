document.addEventListener("DOMContentLoaded", function() {
	const input = document.getElementById('input')
	const output = document.getElementById('output')


	const helpMessage = `
<b>💻 System Commands:</b><br>
<b>help or h</b>        	- Show available commands<br>
<b>clear or cls</b>       	- Clear the terminal<br>
<b>neofetch or fetch</b>    	- Display system info (Arch Linux style)<br>
<br>
<b>👤 Personal Information:</b><br>
<b>whoami</b>      - Display my identity<br>
<b>skills</b>      - Show my technical skills<br>
<b>projects</b>    - List my featured projects<br>
<br>
<b>🌐 Online Links:</b><br>
<b>linkedin or ln</b>	- Open my LinkedIn profile<br>
<b>github or gh</b>	- Open my GitHub profile<br>
<b>blog</b>		- Open my blog site<br>
<br>
<b>📄 Documents:</b><br>
<b>resume or r</b>      - Download my resume<br>
`;

	const commands = {
		help: helpMessage,
		clear: () => reset_terminal(),
	}

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
		if (cmd === "") {
			return;
		}

		if (cmd === "clear") {
			commands[cmd](); return;
		}

		let response = typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd];

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
