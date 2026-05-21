class UpdateVotingClient {
  constructor() {
    const params = new URLSearchParams(window.location.search);
    this.votingId = params.get("id");

    this.titleInput = document.getElementById("title");
    this.optionsContainer = document.getElementById("options");
    this.userSelect = document.getElementById("userSelect");

    this.init();
    this.loadUsers();
    this.loadVoting();
  }

  init() {
    document.getElementById("addOptionBtn")
      .addEventListener("click", () => this.addOption(""));

    document.getElementById("removeOptionBtn")
      .addEventListener("click", () => this.removeOption());

    document.getElementById("updateVotingBtn")
      .addEventListener("click", () => this.updateVoting());
  }

  async loadVoting() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/votings/${this.votingId}`, {
        headers: { "Authorization": token || "" }
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      this.renderVoting(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  renderVoting(voting) {
    this.titleInput.value = voting.title;

    voting.options.forEach(opt => this.addOption(opt));

    this.preselectUsers(voting.logins);
  }

  addOption(value) {
    const count = this.optionsContainer.querySelectorAll(".optionInput").length;

    if (count >= 10) {
      alert("Maximum of 10 options allowed");
      return;
    }

    const input = document.createElement("input");
    input.className = "optionInput";
    input.value = value;

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

  async loadUsers() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/users", {
        headers: { "Authorization": token || "" }
      });

      const users = await res.json();
      if (!res.ok) {
        throw new Error(users.error);
      }

      users.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.login;
        opt.textContent = u.login;
        this.userSelect.appendChild(opt);
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  preselectUsers(logins) {
    Array.from(this.userSelect.options).forEach(o => {
      if (logins.includes(o.value)) {
        o.selected = true;
      }
    });
  }

  async updateVoting() {
    const token = localStorage.getItem("token");
    const title = this.titleInput.value.trim();
    const optionInputs = document.querySelectorAll(".optionInput");

    const options = [...optionInputs]
      .map(i => i.value.trim())
      .filter(v => v.length > 0);

    const selectedUsers = [...this.userSelect.options]
      .filter(o => o.selected)
      .map(o => o.value);

    console.log(token);

    try {
      const res = await fetch(`/api/votings/${this.votingId}`, {
        method: "PUT",
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

      alert("Voting updated!");
      window.location.href = `/voting.html?id=${this.votingId}`;
    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new UpdateVotingClient();