class VotingClient {
  constructor() {
    const params = new URLSearchParams(window.location.search);
    this.votingId = params.get("id");

    this.titleHeader = document.getElementById("votingTitle");
    this.optionsHeader = document.getElementById("options");
    this.loginsHeader = document.getElementById("logins");

    this.init();
  }

  async init() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/votings/${this.votingId}`, {
        method: "GET",
        headers: { "Authorization": token || "" }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      this.titleHeader.textContent = data.title;

      data.options.forEach(opt => {
        const p = document.createElement("p");
        p.textContent = opt;
        this.optionsHeader.appendChild(p);
      });

      data.logins.forEach(login => {
        const p = document.createElement("p");
        p.textContent = login;
        this.loginsHeader.appendChild(p);
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new VotingClient();