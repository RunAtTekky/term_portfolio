document.addEventListener("DOMContentLoaded", function() {
	const input = document.getElementById('input')
	const output = document.getElementById('output')
	const terminal = document.getElementById('terminal')

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

		fetch: () => {
			let currentTime = new Date().toLocaleTimeString();
			return `<pre>
        <span class="blue">      /\\      </span>  User: RunAt
        <span class="blue">     /  \\     </span>  OS: Arch Linux
        <span class="blue">    /    \\    </span>  Hostname: runat.xyz
        <span class="blue">   /  /\\  \\   </span>  Time: ${currentTime}
        <span class="blue">  /  (--)  \\  </span>  Email: <a href="mailto:varunrawat343@gmail.com" class="custom-link">varunrawat343@gmail.com</a>
        <span class="blue"> /  /    \\  \\ </span>  GitHub: <a href="https://GitHub.com/RunAtTekky" target="_blank" class="custom-link">GitHub.com/RunAtTekky</a>
        <span class="blue">/___\\    /___\\</span>  LinkedIn: <a href="https://LinkedIn.com/in/RunAt" target="_blank" class="custom-link">LinkedIn.com/in/RunAt</a>
        </pre>`;
		},

		github: () => {
			window.open("https://github.com/RunAtTekky", "_blank");
			return `Opening <a href="https://github.com/RunAtTekky" target="_blank" class="custom-link">GitHub/RunAtTekky</a>...`;
		},

		linkedin: () => {
			window.open("https://linkedin.com/in/RunAt", "_blank");
			return `Opening <a href="https://linkedin.com/in/RunAt" target="_blank" class="custom-link">LinkedIn/RunAt</a>...`;
		},

		blog: () => {
			window.open("https://blog.runat.xyz", "_blank");
			return `Opening <a href="https://blog.runat.xyz" target="_blank" class="custom-link">RunAt's Blog</a>...`;
		},

		whoami: `<a href="https://runat.xyz" class="custom-link">RunAt</a> | Developer`,

		projects: `My Projects:
- <a href="https://footy.runat.xyz" class="custom-link" target="_blank">FootyRate</a>
- <a href="https://blog.runat.xyz" class="custom-link" target="_blank">RunAt's Blog</a>
`,
		skills: `My Skills:
- <a href="https://codeforces.com/profile/RunAt" class="custom-link" target="_blank">Competitive Programming</a> | 1200+ Rated
- <a href="https://leetcode.com/RunAtMe" class="custom-link" target="_blank">Leetcode</a>
- Languages: go, c++, python, javascript
- Web Development
- TUI applications
`,

		resume: () => {
			const link = document.createElement("a");
			link.href = "/resume.pdf";
			link.download = "RunAtResume.pdf";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return "Downloading resume...";
		},
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

	terminal.addEventListener('click', () => {
		input.focus();
	})

	reset_terminal();

});
