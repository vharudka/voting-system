class LoginClient {
  constructor() {
    this.init();
  }

  init() {
    const btn = document.getElementById("loginBtn");
    btn.addEventListener("click", () => this.login());
  }

  async login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ login, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);

      alert("Login successful!");
      window.location.href = "/votings.html";

    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new LoginClient();