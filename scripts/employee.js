const param_id = new URLSearchParams(window.location.search);
const user_id = param_id.get('id');

const fetchHospitals = async () => {
    try {
      const response = await fetch('http://localhost/health-website-backend/display_hospital.php');
      const hospitals = await response.json();
      const select = document.getElementById('hospital-select');
      hospitals.forEach((hospital) => {
        const option = document.createElement('option');
        option.value = hospital.hospital_id;
        option.text = hospital.hospital_name;
        select.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  };

fetchHospitals();

document.querySelector('#register-action').onclick = () => {
  let ssn = document.getElementById('ssn')
  let date = document.getElementById('date')
  let position = document.getElementById('position')
  let selectedHospitalId = document.getElementById('hospital-select')

  const data = new FormData()
  data.append('user_id', user_id)
  data.append('SSN', ssn.value)
  data.append('date_joined', data.value)
  data.append('position', position.value)
  data.append('hospital_id', selectedHospitalId.value)
  
  if(ssn.value == "" && date.value == "" && position.value == ""){
    alert("All fields are required")
  }else{
    if(selectedHospitalId){
      axios.post("http://localhost/health-website-backend/employee_info.php", data).then((res) => {
        console.log(res);
        if(res.data.status === 200){
          alert("All set up")
        }
      }).catch((err) => {
        console.log(err);
      })
    }else{
      alert('Please provide the hospital where you work at')
    }
  }
}
