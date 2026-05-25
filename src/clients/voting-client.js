import CanvasChart from "../libs/canvas-charts/canvas-chart.js";

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
        const row = document.createElement("div");
        row.className = "optionRow";

        const text = document.createElement("span");
        text.textContent = opt;

        const btn = document.createElement("button");
        btn.textContent = "Cast Vote";
        btn.className = "castVoteBtn";
        btn.addEventListener("click", () => this.castVote(opt));

        row.appendChild(text);
        row.appendChild(btn);

        this.optionsHeader.appendChild(row);
      });

      data.logins.forEach(login => {
        const p = document.createElement("p");
        p.textContent = login;
        this.loginsHeader.appendChild(p);
      });
    } catch (err) {
      alert("Error: " + err.message);
    }

    try {
      const res = await fetch(`/api/votings/${this.votingId}/votes`, {
        method: "GET",
        headers: { "Authorization": token || "" }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      
      this.drawCharts(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async castVote(option) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/votings/${this.votingId}/votes`, {
        method: "POST",
        headers: { "Authorization": token || "" },
        body: JSON.stringify({ option })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert("Your vote has been cast!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  drawCharts(results) {
    const labels = Object.keys(results);
    const data = Object.values(results);

    const bar = new CanvasChart("barChart");
    bar.render("bar", data, labels);

    const line = new CanvasChart("lineChart");
    line.render("line", data, labels);

    const pie = new CanvasChart("pieChart");
    pie.render("pie", data, labels);
  }
}

new VotingClient();