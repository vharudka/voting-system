class LoginClient {
  constructor() {
    this.init();
  }

  init() {
    const btn = document.getElementById("loginBtn");
    btn.addEventListener("click", () => this.login());
  }

  login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    fetch("/api/auth/login", {
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
      localStorage.setItem("token", data.token);
      
      alert("Login successful!");
      window.location.href = "/votings.html";
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  }
}

new LoginClient();