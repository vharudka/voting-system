class VotingsClient {
  constructor() {
    this.init();
  }

  async init() {
    const votingsBody = document.getElementById("votingsBody");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/votings", {
        method: "GET",
        headers: { "Authorization": token || "" }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      data.forEach(v => {
        const tr = document.createElement("tr");

        const titleTd = document.createElement("td");
        titleTd.textContent = v.title;
        tr.appendChild(titleTd);

        const optionsTd = document.createElement("td");
        optionsTd.textContent = v.options.join(", ");
        tr.appendChild(optionsTd);

        const actionsTd = document.createElement("td");

        const openBtn = document.createElement("button");
        openBtn.textContent = "Open";
        openBtn.addEventListener("click", () => {
          window.location.href = `/voting.html?id=${v.id}`;
        });
        actionsTd.appendChild(openBtn);

        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => {
          window.location.href = `/update-voting.html?id=${v.id}`;
        });
        actionsTd.appendChild(updateBtn);

        tr.appendChild(actionsTd);

        votingsBody.appendChild(tr);
      });

    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new VotingsClient();