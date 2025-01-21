async function getData() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found. Please log in.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 403) throw new Error("Invalid or expired token");

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
getData();

async function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      console.log("Token saved:", data.accessToken);
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
}



document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});