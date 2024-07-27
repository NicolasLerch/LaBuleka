document.addEventListener("DOMContentLoaded", function () {
  console.log("linkeado correctamente processLogin");
  let loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.href = "/users/profile";
        }
      })
      .catch((error) => console.log(error));
  });
});
