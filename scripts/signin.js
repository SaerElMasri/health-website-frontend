document.querySelector('#login-action').onclick = () => {
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    const data = new FormData()
    data.append("email", email.value)
    data.append("password", password.value)
    if(email.value == "" && password.value == ""){
        alert("All fields required")
    }else{
        axios.post("http://localhost/health-website-backend/login.php", data)
          .then((res) => {
            console.log(res.data);
            if (res.data.response == "logged in") {
              alert('Login In Successfully');
            } else {
              alert(res.data.response);
            }
          })
          .catch((err) => {
            console.log(err.response.message);
          });
    }
}

document.querySelector('#register').onclick = () => {
    window.location.href = "http://localhost/health-website-frontend/pages/registration.html";
}