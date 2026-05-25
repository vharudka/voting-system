class LogoutClient {
  constructor() {
    this.token = localStorage.getItem("token");

    this.init();
  }

  init() {
    const btn = document.getElementById("logoutBtn");
    btn.addEventListener("click", () => this.logout());
  }

  async logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Authorization": this.token || ""
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      localStorage.removeItem("token");

      alert("You have been logged out.");
      window.location.href = "/login.html";

    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new LogoutClient();