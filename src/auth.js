document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const userData = {
        username: signupForm.username.value,
        email: signupForm.email.value,
        password: signupForm.password.value,
      };

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Registered Successfully");
          window.location.href = "home.html";
        } else {
          alert(data.error || "Registration failed");
        }
      } catch (err) {
        alert("Server error");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const loginData = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        const data = await res.json();

        if (res.ok) {
          showToast(data.message || "Login successful", "success");
          setTimeout(() => {
            window.location.href = "home.html";
          }, 2000);
        } else {
          showToast(data.error || "Invalid email or password", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Server error", "error");
      }
    });
  }
});

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast ${type}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
