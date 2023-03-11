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
            console.log(res);
            const id = res.data.user_id;
            const user_type = res.data.usertype_id;
            if (res.data.response == "logged in") {
              user_checker(user_type, id);
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

const user_checker = (id, user_id) => {
  if(id == 1){
    //Client Site
    window.location.href = `http://localhost/health-website-frontend/patient_site/pages/patient_dashboard.html?id=${user_id}`;
  }else if(id == 2){
    //Admin Site
    window.location.href = "http://localhost/health-website-frontend/admin_site/pages/dashboard.html";
  }else if(id == 3){
    //Employee Site
  }else{
    alert("404");
  }
}