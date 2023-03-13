const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

function url_redirect(url) {
  var X = setTimeout(function () {
    window.location.replace(url);
    return true;
  }, 300);

  if ((window.location = url)) {
    clearTimeout(X);
    return true;
  } else {
    if ((window.location.href = url)) {
      clearTimeout(X);
      return true;
    } else {
      clearTimeout(X);
      window.location.replace(url);
      return true;
    }
  }
  return false;
}

const loginController = () => {
  const username = document.getElementById("username")?.value;
  const password = document.getElementById("password")?.value;

  // if (username === "admin" && password === "admin") {
  //   window.location.href = "../renderer/index.html";
  // } else {
  //   alert("Invalid username or password");
  //   username.value = "";
  //   password.value = "";
  // }
  console.log(username, password);
  // switch to index.html if login is successful
  url_redirect("../renderer/index.html");
};
