class CreateVotingClient {
  constructor() {
    this.init();
  }

  init() {
    this.optionsContainer = document.getElementById("options");
    this.userSelect = document.getElementById("userSelect");

    document.getElementById("addOptionBtn")
      .addEventListener("click", () => this.addOption());

    document.getElementById("createVotingBtn")
      .addEventListener("click", () => this.createVoting());

    this.loadUsers();
  }

  async loadUsers() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/users", {
        headers: { "Authorization": token || "" }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      data.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.login;
        opt.textContent = u.login;
        this.userSelect.appendChild(opt);
      });

    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  addOption() {
    const count = document.querySelectorAll(".optionInput").length;

    if (count >= 10) {
      alert("Maximum of 10 options allowed");
      return;
    }

    const input = document.createElement("input");
    input.className = "optionInput";
    input.placeholder = `Option ${count + 1}`;

    this.optionsContainer.appendChild(input);
    this.optionsContainer.appendChild(document.createElement("br"));
    this.optionsContainer.appendChild(document.createElement("br"));
  }

  async createVoting() {
    const title = document.getElementById("title").value.trim();
    const optionInputs = document.querySelectorAll(".optionInput");

    const options = [...optionInputs]
      .map(i => i.value.trim())
      .filter(v => v.length > 0);

    const selectedUsers = [...this.userSelect.options]
      .filter(o => o.selected)
      .map(o => o.value);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/votings", {
        method: "POST",
        headers: {
          "Authorization": token || ""
        },
        body: JSON.stringify({
          title,
          options,
          logins: selectedUsers
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert("Voting created!");
      window.location.href = "/votings.html";

    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new CreateVotingClient();