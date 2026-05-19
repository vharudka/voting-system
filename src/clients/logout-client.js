class LogoutClient {
  constructor() {
    this.init();
  }

  init() {
    const btn = document.getElementById("logoutBtn");
    btn.addEventListener("click", () => this.logout());
  }

  logout() {
    const token = localStorage.getItem("token");

    fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Authorization": token ? token : ""
      }
    })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      return data;
    })
    .then(data => {
      localStorage.removeItem("token");

      alert("You have been logged out.");
      window.location.href = "/login.html";
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  }
}

new LogoutClient();