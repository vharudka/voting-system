class RegisterClient {
  constructor() {
    this.init();
  }

  init() {
    const btn = document.getElementById("registerBtn");
    btn.addEventListener("click", () => this.register());
  }

  register() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ login, password })
    })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      return data;
    })
    .then(data => {
      alert("Registration successful! You can now log in.");
      window.location.href = "/login.html";
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  }
}

new RegisterClient();