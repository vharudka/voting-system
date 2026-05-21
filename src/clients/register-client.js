class RegisterClient {
  constructor() {
    this.init();
  }

  init() {
    const btn = document.getElementById("registerBtn");
    btn.addEventListener("click", () => this.register());
  }

  async register() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ login, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert("Registration successful! You can now log in.");
      window.location.href = "/login.html";

    } catch (err) {
      alert("Error: " + err.message);
    }
  }
}

new RegisterClient();