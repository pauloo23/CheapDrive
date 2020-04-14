var email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("You must type a valid email!");
  } else {
    email.setCustomValidity("");
  }
});