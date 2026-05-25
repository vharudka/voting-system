class CreateVotingClient {
  constructor() {
    this.token = localStorage.getItem("token");

    if (!this.token) {
      alert("You have been logged out.")
      window.location.href = "/login.html";
      return;
    }

    this.init();
  }

  init() {
    this.optionsContainer = document.getElementById("options");
    this.userSelect = document.getElementById("userSelect");

    document.getElementById("addOptionBtn")
      .addEventListener("click", () => this.addOption());

    document.getElementById("removeOptionBtn")
      .addEventListener("click", () => this.removeOption());

    document.getElementById("createVotingBtn")
      .addEventListener("click", () => this.createVoting());

    this.loadUsers();
  }

  async loadUsers() {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: { "Authorization": this.token || "" }
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

    this.optionsContainer.appendChild(input);
    this.optionsContainer.appendChild(document.createElement("br"));
    this.optionsContainer.appendChild(document.createElement("br"));
  }

  removeOption() {
    if (this.optionsContainer.children.length >= 3) {
      this.optionsContainer.removeChild(this.optionsContainer.lastChild);
      this.optionsContainer.removeChild(this.optionsContainer.lastChild);
      this.optionsContainer.removeChild(this.optionsContainer.lastChild);
    }
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

    try {
      const res = await fetch("/api/votings", {
        method: "POST",
        headers: {
          "Authorization": this.token || ""
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