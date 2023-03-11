//Register User
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const isValidPassword = (password) => {
    const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return emailRegex.test(password);
}
document.querySelector('#register-action').onclick = () =>{
    let id = document.getElementById('user_type')
    let firstName = document.getElementById('first_name')
    let lastName = document.getElementById('last_name')
    let email = document.getElementById('email')
    let dob = document.getElementById('dob')
    let password = document.getElementById('password')
    let repeatPassword = document.getElementById('confirm_password')
    const data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);
    data.append("first_name", firstName.value);
    data.append("dob", dob.value);
    data.append("usertype_id", id.value);
    data.append("last_name", lastName.value);


    if(id.value == "" && firstName.value == "" && lastName.value == "" && email.value == "" && dob.value == "" && password.value == ""){
        alert("All Fields Required")
    }else{
        if(password.value !== repeatPassword.value){
            alert("Passwords do not match");
        }else{
            if(isValidEmail(email.value)){
                if(isValidPassword(password.value)){
                    axios.post("http://localhost/health-website-backend/register.php", data).then((res) => {
                        const type = res.data.user_type;
                        const id = res.data.user_id;
                        if(type == 1){
                            //Client
                            window.location.href = `http://localhost/health-website-frontend/pages/patient_info.html?id=${id}`;
                        }
                        if(type == 3){    
                            //Employee
                            window.location.href = `http://localhost/health-website-frontend/pages/employee_info.html?id=${id}`;
                        }
                    })
                }else{
                    alert("Password not valid")
                }
            }else{
                alert("Email not valid");
            }
        }
    }
}

document.querySelector('#log-redirect').onclick = () => {
    window.location.href = "http://localhost/health-website-frontend/pages/login.html";
}