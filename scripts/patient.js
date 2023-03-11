const param_id = new URLSearchParams(window.location.search);
const user_id = param_id.get('id');
document.querySelector('#register-action').onclick = () => {
    let blood_type = document.getElementById('blood')
    let ehr = document.getElementById('ehr')
    const data = new FormData()
    data.append('user_id', user_id)
    data.append('blood_type', blood_type.value)
    data.append('EHR', ehr.value)

    if(blood_type.value == "" && ehr.value == ""){
        alert("All fields require")
    }else{
        axios.post("http://localhost/health-website-backend/patient_info.php", data).then((res) => {
            console.log(res.data);
            if(res.data.result == "Success"){
                alert("All set up")
                window.location.href = `http://localhost/health-website-frontend/patient_site/pages/patient_dashboard.html?id=${user_id}`;
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}