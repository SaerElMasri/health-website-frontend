const btn = document.querySelector('#login');
btn.onclick = () => {
  window.location.href = "http://localhost/health-website-frontend/pages/login.html";
  btn.classList.add("btn-effect")
}